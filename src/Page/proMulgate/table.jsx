import { useEffect, useState } from "react"
import { crntUserBlogs } from "../../lib/userData"
import realTimeDb from '../../lib/fireBase'
import { toast } from "react-toastify";
export default  function TableEl(props) {
 const [userInfo] = useState(JSON.parse(sessionStorage.getItem('whoami')));
 const {myBlogs,isLoading} = crntUserBlogs();
 function editME(key) {
    console.log(key)
    props.func(key)
 }
const handleRemove = (key) => {
    realTimeDb.child(`Blogs/${userInfo.key}/${key}`).remove();
    toast.success('item removed ')
}
    return(
        <div className="tableDiv">
             <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <td>S. No.</td>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Likes</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               isLoading ? (<tr></tr>) : (
                                    Object.keys(myBlogs || {}).reverse().map((baseKey,index)=>{
                                    let crnObj = myBlogs[baseKey];
                                    return(
                                        <tr key={baseKey}>
                                            <td>{index+1+'.'}</td>
                                            <td>{crnObj.Title}</td>
                                            <td>{new Date(crnObj.Date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:'numeric'})}</td>
                                            <td>{Object.keys(crnObj.likes || {}).length}</td>
                                            <td><button onClick={()=>handleRemove(baseKey)} className="delete-btn">Delete</button> <button onClick={()=>editME(baseKey)}>Edit</button></td>
                                        </tr>
                                    )
                                })                                           
                                ) 
                            }
                        </tbody>
                    </table>
                </div>
        </div>
    )
}