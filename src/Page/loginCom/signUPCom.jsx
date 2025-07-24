import { useEffect, useRef, useState } from "react";
import tabState, { handleLogin } from "../../lib/tabManeger"
import { toast } from "react-toastify";
import realTimeDb from '../../lib/fireBase'
export default function SginEl() {
    const {setTab} = tabState();
    const {userNames,Emails} = handleLogin();
    const [isDublic,setDublic] = useState(false)
     const [showPass,setShow] = useState(false);
 const passEl = useRef();
 function showPassF() {
    setShow(prev=>!prev);
  
}
    const [inpVal,setInval] = useState({
        username:'',
        emailval:''
    })
    const [debounceVal,setDeBaunceVal] = useState({});
    const myRef = useRef({
        user:null,
        email:null,
    })
    useEffect(()=>{
        let handler = setTimeout(()=>{
            setDeBaunceVal(inpVal)
        },600);

        return ()=> clearTimeout(handler);
    },[inpVal]);

    useEffect(()=>{
        if (debounceVal.username || debounceVal.emailval) {
            shakeInp()
        }
    },[debounceVal])
    function shakeInp() {
        console.log(debounceVal);
        myRef.current.user.classList.remove('userInputErr')
        myRef.current.email.classList.remove('userInputErr')
        if (userNames.includes(debounceVal.username)) {
            myRef.current.user.classList.add('userInputErr')
            toast.warning('Username Already Taker')
            setDublic(true)
        }
        if (Emails.includes(debounceVal.emailval)) {
            setDublic(true)
            myRef.current.email.classList.add('userInputErr')
            toast.warning('Email Already linked')
            toast.info('You can also go for forgot password if:you')
        }
        if (!Emails.includes(debounceVal.emailval) && !userNames.includes(debounceVal.username)) {
            setDublic(false)
        }
    }
    const handleBlur = (inp) =>{
        if (inp) {
            let labl = inp.nextElementSibling;
            if (inp.value) {
                labl.style.display = 'none'
            }else{
                labl.style.display = 'block'
            }
        }else{
            let inpDiv = document.querySelectorAll('.inputDiv')
            inpDiv.forEach(div => {
                let labl = div.querySelector('label')
                if (labl) {
                    labl.style.display = 'block'
                }
            })
        }
    }

   const handleSubmit = (e)=>{
    e.preventDefault();
    if (isDublic) 
        {toast.error('Check Your Username or Email') 
            return;
    }
    let formData = new FormData(e.target);
    let {Username,Email,Password,Name} = Object.fromEntries(formData);
    if (!Username || !Email || !Password || !Name) {
        toast.warning('Fill all the fields')
        return;
    }
    let newObj = {Username,Email,Password,Name,"Roll":'User','status':true,'suspend':''}
    try {
        realTimeDb.child('loginData').push(newObj)
    } catch (error) {
        console.log(error)
    }
    e.target.reset();
    toast.success('ac created')
    handleBlur();
    setInval({
        username:'',
        emailval:''
    })
   }

    return(
        <div className="sginUPdiv">
            <div className="formDiv">
                <form action="" onSubmit={handleSubmit} >
                    <h1>Join-US</h1>
                    <div ref={el => myRef.current.user = el} className="inputDiv">
                        <input onBlur={(e)=>handleBlur(e.target)} onChange={(e)=>setInval(prev=>({
                            ...prev,
                            username: e.target.value,
                        }))}  autoComplete="Username" name="Username" type="text" id="UserName" />
                        <label htmlFor="UserName"><i className="bx bx-user-circle">Username</i></label>
                    </div>
                    <div className="inputDiv">
                        <input onBlur={(e)=>handleBlur(e.target)} autoComplete="Name" type="text" name="Name" id="F-Name" />
                        <label htmlFor="F-Name"><i className="bx bx-id-card">Full-Name</i></label>
                    </div>
                    <div className="inputDiv" ref={el => myRef.current.email = el}>
                        <input onBlur={(e)=>handleBlur(e.target)} onChange={(e)=>setInval(prev=>({
                            ...prev,
                            
                            emailval:e.target.value
                        }))}  autoComplete="Email" name="Email" type="Email" id="Email" />
                        <label htmlFor="Email"><i className="bx bx-user-pin">Email</i></label>
                    </div>
                    <div className="inputDiv">
                        <input ref={passEl} onBlur={(e)=>handleBlur(e.target)} name="Password" type={showPass ? 'text' : 'password'} id="Password" />
                        <label htmlFor="Password"><i className="bx bx-key">Password</i></label>
                        <div className="showPassDiv">
                                    {showPass ? (<i onClick={showPassF} className='bx bxs-hide'></i>):(<i onClick={showPassF} className='bx bx-show'></i>)}
                                    </div>
                    </div>
                    <div className="inputDiv">
                        <button type="submit" className="btn sgin-btn">Sgin-UP</button>
                    </div>
                </form>
                <button onClick={()=>setTab('login')} className="l-acout">Login</button>
            </div>
        </div>
    )
}