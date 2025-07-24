import { toast } from 'react-toastify';
import '../../assets/Style/loginSgin.css'
import tabState, { handleLogin } from '../../lib/tabManeger';
import SginEl from "./signUPCom";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import crntuserData from '../../lib/userData';
export default function LoginSign() {
 const {fetchUserInfo} = crntuserData();
 const {crntMenu,setTab} = tabState()
 const [showPass,setShow] = useState(false);
 const [isLoding,setLoading] = useState(false)
 const {userData} = handleLogin();
 const passEl = useRef();
 const navi = useNavigate();
 function showPassF() {
  
    setShow(prev=>!prev); // reflect the actual current type
  
}

 const handleBlur = (inp) => {
    if (inp) {
        let labL = inp.nextElementSibling;
        if (inp.value) {
            labL.style.display = 'none'
        }else{
            labL.style.display = 'block'
        }
    }else{
        let inpDiv = document.querySelectorAll('.inputDiv')
        inpDiv.forEach(div=>{
            let labL = div.querySelector('label')
            if (labL) {
                labL.style.display = 'block'
            }
        })
    }
 }

 const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    console.log('in fun')
    let formData = new FormData(e.target);
    let {UserEmail,Password} = Object.fromEntries(formData);
    if (!UserEmail || !Password) {
        toast.warning('Fields are required')
        return
    };
    const Auth = Object.keys(userData).filter(baseKey => {
            console.log('in filter');
            let crntObj = userData[baseKey];
            let isMatch = (crntObj.Username  === UserEmail || crntObj.Email === UserEmail);
            let isPasswordCorrect = crntObj.Password === Password;

            return isMatch && isPasswordCorrect;
        });
        if (Auth.length>0) {
            let key = Auth[0]
            if (userData[key].status===false) {
                return alert('Your are supended for'+userData[key].suspend)
            }
            let newObj = userData[key]
            toast.success('Welcome'+' '+userData[key].Name)
            sessionStorage.setItem('whoami',JSON.stringify({...newObj,key}))
            await fetchUserInfo(key);
            setTimeout(()=>{
                navi('/')
            },2500)
        }else{
            toast.error('Invalid Credentials')
        }
        setLoading(false)
 }
    return(
        <div className="loginSign">
            <div className="underTaker">
                <div className="logComp">
                    <div className="textAndLog">
                        <img src="/Image/Logo.png" alt="logo" />
                        <h2>A Boy who is sitting in a dark corner of a dark room waiting for the morning that will never going to be happen</h2>
                    </div>
                        {crntMenu.login && 
                            <>
                            <div className="loginDiv">
                         <div className="formDiv">
                            <form action="" onSubmit={handleSubmit}>
                                <h1>Login</h1>
                                <div className="inputDiv">
                                    <input onBlur={(e)=>handleBlur(e.target)} name='UserEmail' autoComplete='Email' type="text" id="userName" />
                                    <label htmlFor="userName"><i className="bx bx-user">Username Or Email</i></label>
                                </div>
                                <div className="inputDiv">
                                    <input name='Password' ref={passEl} onBlur={(e)=>handleBlur(e.target)} type={showPass ? 'text' : 'password'} id="Password" />
                                    <label htmlFor="Password"><i className="bx bx-key">Password</i></label>
                                    <div className="showPassDiv">
                                    {showPass ? (<i onClick={showPassF} className='bx bxs-hide'></i>):(<i onClick={showPassF} className='bx bx-show'></i>)}
                                    </div>
                                </div>
                                <div className="inputDiv">
                                    <p>Forgot Password?</p>
                                </div>
                                <div className="inputDiv">
                                   <button type='submit' className="btn login-btn">{isLoding ? 'Login...':'Login'}</button>
                                </div>
                            </form>
                            <button className="c-acout" onClick={()=>setTab('sginup')}>Create An Account</button>
                        </div>
                        </div>
                        </>
                        }

                 {crntMenu.sginup && <SginEl/>}
                </div>
            </div>
        </div>
    )
}