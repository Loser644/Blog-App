import { useState } from "react"
import { Link } from "react-router-dom";
export default function UserHeader() {
 const [currentUser] = useState(JSON.parse(sessionStorage.getItem('whoami')))
 const [togle,setTogle] = useState(false);
 function logMeOut() {
    sessionStorage.clear()
    location.reload()
 }
    return(
        <div className="userHader">
                <div className="tLine-LogoDiv">
                    <i className="bx bx-menu"></i>
                    <img src="/Image/Logo.png" alt="Logo" />
                </div>
                <div className="serachDiv">
                    <input placeholder="Search in site.." type="text" />
                    <button><i className="bx bx-search-alt"></i></button>
                </div>
                <div className="creater">
                    <Link to={'/Promulgate'}><i className="bx bx-plus"></i><span>Promulgate</span></Link>
                </div>
                {
                    currentUser ? (<div className="userProfile">
                    <img src={currentUser?.Avatar || "https://i.postimg.cc/gcwDcPpS/user.png"} alt="user" />
                    <span onClick={()=>setTogle(prev=>!prev)}><i className="bx bx-user-circle"></i>{currentUser?.Username || 'Username'}<i className="bx bx-chevron-right"></i></span>
                    <div className={`dropDown ${togle ? 'activeDrop' : ''}`}>
                    <ul>
                        <li>Profile <i className="bx bx-chevron-right"></i></li>
                        <li>Setting <i className="bx bx-chevron-right"></i></li>
                        <li onClick={logMeOut}>Log-out <i className="bx bx-log-in"></i></li>
                    </ul>
                </div>
                </div>) : (<Link to={'/Login'}><i className="bx bx-log-in-circle"></i> Login</Link>)
                }
        </div>
    )
}