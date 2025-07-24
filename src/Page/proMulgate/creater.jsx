import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import realTimeDb from '../../lib/fireBase';
import { crntUserBlogs } from "../../lib/userData";
export default function CreaterEl() {
 const {fetchUserBlogs} = crntUserBlogs();
  const [userInfo] = useState(JSON.parse(sessionStorage.getItem('whoami')))
 const [cat,setCat] = useState('')
 const [isLoading,setLoading] = useState(false)
 const [imge,setimge] = useState({
    file:null,
    url:""
 })
 const couldData = {
    unsName:'Bagad_biLLa',
    cloudName:'dcq0dge7f'
 }
 const handleImg = e=>{
    let file = e.target.files[0];
    if(!file) return;
    let extName = file.type.split("/")
    if (extName[0] !== "image") return alert('only image');
    let allowImg = ['heic','jpeg','png','jpg','PNG','webp']
    if (allowImg.includes(extName[1])){
        setimge({
            file,
            url: URL.createObjectURL(file)
        })
    }else{
        alert("Low qlty img")
    }
 }
 async function Publicer(e) {
    e.preventDefault();
    setLoading(true)
    let formData = new FormData(e.target);
    let {Title,Tarea} = Object.fromEntries(formData);
    if (!Title ||!cat || !Tarea || !imge.file) {
        toast.warning('Fill all the fields');
         setLoading(false);
         return
    } 
        let myForm = new FormData();
        myForm.append("file",imge.file)
        myForm.append("upload_preset",couldData.unsName);
    try {
        const responce =await fetch(`https://api.cloudinary.com/v1_1/${couldData.cloudName}/image/upload`,{
        method:"POST",
        body:myForm
      })
        const result = await responce.json();
       await realTimeDb.child(`Blogs/${userInfo.key}`).push({Title,cat,Tarea,"likes":{},'Date':Date.now(),'url':result.secure_url});
        toast.success('Done BOsss')
       fetchUserBlogs(userInfo.key)
    } catch (error) {
        console.log(error)
        setLoading(false)
        alert('error')
        toast.error('Something went wrong')
    }
    e.target.reset();
    handleBlur();
    setLoading(false)
  }
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
    return(
        <div className="createDiv">
            <div className="formDiv">
                <form action="" onSubmit={Publicer}>
                    <h1>Create-Blog</h1>
                    <div className="inputDiv">
                        <input onBlur={(e)=>handleBlur(e.target)} name="Title" id="title" type="text" />
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
                        <textarea name="Tarea" placeholder="Discription..." id=""></textarea>
                    </div>
                    <div className="inputDiv imgInput">
                        <img src={imge.url || "https://i.postimg.cc/RhTqyycd/Nullveil-removebg-preview.png"} alt="img" />
                        <input onChange={handleImg} type="file" style={{display:'none'}} accept="image/*" id="files" />
                        <label htmlFor="files"><i className="bx bx-image"></i>Choose File</label>
                    </div>
                    <div className="inputDiv">
                        <button type="submit" className="btn sgin-btn">{isLoading ? 'Publicing...':'Publice'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}