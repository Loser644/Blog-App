import { useEffect, useState } from 'react'
import './style.css'
import LoadingCat from '../../../Component/BiLoti-loading';
import realTimeDb from '../../../lib/fireBase'
import { toast } from 'react-toastify';
import { likeblog } from '../../../lib/tabManeger';
import { crntUserBlogs } from '../../../lib/userData';
import crntuserData from '../../../lib/userData';
export default function HomeEl() {
 const {fetchUserBlogs} = crntUserBlogs();
 const [userInf] = useState(JSON.parse(sessionStorage.getItem('whoami')))
 const [isLoading,setLoading] = useState(true);
 const [blogs,setblogs] = useState([]);
 const [filterVal,setfilterVal] = useState([]);
 const [filterkey,setFkey] = useState('All')
 const [crntUserlikeArr,setLikeArr] = useState([])
//  const {userInfo, fetchUserInfo} = crntuserData();
 const [userInfo,setUserinfo] = useState({})
    useEffect(()=>{
        if (!userInf) return;
        realTimeDb.child(`loginData/${userInf.key}`).on('value',(snap)=>{
            setUserinfo(snap.val()||{});
        })
    },[])
    useEffect(()=>{
        if (!userInf) return;
             fetchUserBlogs(userInf?.key)
            
            let tempArr=[]
            Object.keys(userInfo.likedPost||{}).forEach(baseKey=>{
                tempArr.push(userInfo.likedPost[baseKey].key);
            })
            setLikeArr(tempArr);
    },[userInfo])
    useEffect(()=>{
        realTimeDb.child('Blogs').on('value',(snap)=>{
            if (snap.exists()) {
                let myData = []
                let object = snap.val();
                Object.keys(object).forEach(Outerkey=>{
                    let innerObj = object[Outerkey]
                    Object.keys(innerObj).forEach(innerKey=>{
                        myData.push({...innerObj[innerKey],'BlogKey':innerKey,'ownerKey':Outerkey})
                    })
                })
                setblogs(myData)
                setfilterVal(myData);
                setLoading(false)
            }
        });

    },[])
    let filterThings = (value) =>{
               setFkey(value)
        let filterArray = value === 'All' ? blogs : blogs.filter(obj=> obj.cat === value);
        setfilterVal(filterArray);
    }
   async function LikeBlog(blogKey,ownerKey) {
        
        if (!userInf) return toast.info('You are not a user');
         likeblog(blogKey,userInf.key,ownerKey)
        toast.success('Done Boss')
        // fetchUserInfo(userInf?.key)
       // fetchLike();
    }
    return(
        <div className="underTaker">
            <div className="homeEl">
               {isLoading ? (<LoadingCat/>) : (
                <>
                 <div className="cet-menu">
                    <ul>
                        <li className={filterkey === 'All' ? 'activeUlli':''} onClick={()=>filterThings('All')}>All</li>
                        <li className={filterkey === 'Tech' ? 'activeUlli':''} onClick={()=>filterThings('Tech')}>Tech</li>
                        <li className={filterkey === 'Joke' ? 'activeUlli':''} onClick={()=>filterThings(`Joke`)}>Joke's</li>
                        <li className={filterkey === 'Personel' ? 'activeUlli':''} onClick={()=>filterThings('Personel')}>Personel</li>
                    </ul>
                </div>
                <div className="blogs">
                   {
                    filterVal.reverse().map((obj,index)=>{
                    //    let crntObj = blogs[OuterKey];
                    //     return Object.keys(crntObj).map(innerKey=>{
                    //      let data = crntObj[innerKey];
                        // let catgry = filterVal === obj.cat;
                        //return catgry? '' : ()
                         return (
                           <div className="blog-container" key={index}>
                        <img src={obj.url || "dfjkas"} alt="Blog" className="blog-image" />
                        <div className={`likebtn ${crntUserlikeArr.includes(obj.BlogKey) ? 'likeDone':''}`}>
                            {crntUserlikeArr.includes(obj.BlogKey) ? <i className='bx bxs-heart'></i> : <i  onClick={()=>LikeBlog(obj.BlogKey,obj.ownerKey)} className='bx bx-heart'></i>}
                            <span>{Object.keys(obj.likes || {}).length}</span>
                        </div>
                        <div className="blog-content">
                          <h2 className="blog-title">{obj.Title}</h2>
                          <p className="blog-description">{obj.Tarea}</p>
                          <div className="blog-meta">
                            <span className="blog-category">{obj.cat}</span>
                            <span>{ '📅'+new Date(obj.Date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:'numeric'})}</span>
                          </div>
                        </div>
                      </div>
                         )
            
                    })
                   }
                    
                </div>
                </>
               )}
            </div>
        </div>
    )
}