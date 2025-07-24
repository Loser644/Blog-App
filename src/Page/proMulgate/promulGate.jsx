import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import CreaterEl from "./creater";
import EditorEl from "./editor";
import './style.css'
import '../../assets/Style/loginSgin.css'
import TableEl from "./table";
import realTimeDb from '../../lib/fireBase'
import { tabManager2O } from "../../lib/tabManeger";
export default function PromulGatePage() {
 const [userData] = useState(JSON.parse(sessionStorage.getItem('whoami')))
 const navi = useNavigate(); 
 const {crntStatus,setTab} = tabManager2O();
 const [crntBlog,secrntBlog] = useState({});
 useEffect(()=>{
    if (!userData) {
        toast.error('Please Login')
        setTimeout(()=>{
            navi('/Login')
        },1000)
    }
    },[userData])
    
    const getCrntBlog = (key)=> {
        console.log(key)
            realTimeDb.child(`Blogs/${userData.key}/${key}`).once('value',(snap)=>{
            let data = snap.val();
            secrntBlog({...data,key})
            console.log(crntBlog)
        })
        setTab('edit')
    }
    return(
        <div className="underTaker">
            <div className="promulDiv">
                {crntStatus.create && <CreaterEl />}
                <TableEl func={getCrntBlog}/>
                {crntStatus.edit && <EditorEl blog={crntBlog} />}
            </div>
        </div>
    )
}