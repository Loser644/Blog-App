import { useState } from "react";
import { tabManager2O } from "../../lib/tabManeger";
import realTimeDb from '../../lib/fireBase';
export default function EditorEl(props) {
 const {setTab} = tabManager2O();
 const [userInfo] = useState(JSON.parse(sessionStorage.getItem('whoami')))
 const [crntBlog,setBlog] = useState(props.blog);
 const [cat,setCat] = useState('')
     const handleBlur = (inp)=>{
          if (inp) {
              let labl = inp.nextElementSibling;
              if (inp.value) {
                  labl.style.display = 'none'
              }else{
                  labl.style.display = 'block'
              }
          }else{
              let inpDiv = document.querySelectorAll('.inputDiv')
              inpDiv.forEach(div=>{
                  let labl = div.querySelector('label')
                  if (labl) {
                      labl.style.display = 'block'
                  }
              })
          }
     }
    const handleSubmit = (e)=>{
        e.preventDefault()
        setTab('create')
       let formData = new FormData(e.target);
       let {Title,Tarea} = Object.fromEntries(formData);
       if (!Title,!Tarea) return alert('Feel in the blanks 😂');
       try{
         realTimeDb.child(`Blogs/${userInfo.key}/${crntBlog.key}`).update(crntBlog)
       }catch(err){
            console.log(err)
       }
    }
    return(
        <div className="editDiv">
            <div className="formDiv">
                <form action="" onSubmit={handleSubmit}>
                    <h1>Edit-Blog</h1>
                    <div className="inputDiv">
                        <input onChange={(e)=>setBlog(prev=>({
                            ...prev,
                            Title:e.target.value
                        }))} value={crntBlog.Title} onBlur={(e)=>handleBlur(e.target)} name="Title" id="title" type="text" />
                        <label htmlFor="title"><i>Title</i></label>
                    </div>
                    <div className="inputDiv">
                        <select onChange={(e)=>setCat(e.target.value)} name="Cat" id="">
                            <option value="">Catogry..</option>
                            <option value="Tech">Tech</option>
                            <option value="Joke">Joke</option>
                            <option value="Personel">Personel</option>
                        </select>
                    </div>
                    <div className="inputDiv">
                        <textarea onChange={(e)=>setBlog(prev=>({
                            ...prev,
                            Tarea:e.target.value
                        }))} value={crntBlog.Tarea} name="Tarea" placeholder="Discription..." id=""></textarea>
                    </div>
                    <div className="inputDiv">
                        <button type="submit" className="btn sgin-btn">Publice</button>
                    </div>
                </form>
            </div>
        </div>
    )
}