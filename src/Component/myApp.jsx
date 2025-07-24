import { Route, Routes, useLocation} from 'react-router-dom'
import '../assets/Style/baseStyle.css'
import LoginSign from '../Page/loginCom/loginComp'
import { handleLogin } from '../lib/tabManeger'
import LoadingCat from './BiLoti-loading';
import PageTransition from '../assets/Animation/pageTransform';
import { UserHeaderMenu } from './HeaderComponent';
import { ExploreEl, PromulGateEl, UserHomeEl } from './userComponnet';
import { useEffect } from 'react';
export default function MyApp() {
    const {loading} = handleLogin();
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/Admin')
    const isLogin = location.pathname==='/Login'
    console.log(isLogin,isAdmin)
    useEffect(() => {
          const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
          };
          setVH();
          window.addEventListener('resize', setVH);
          return () => window.removeEventListener('resize', setVH);
        }, []);
        
    // return(
    //     <BrowserRouter>
    //     {loading && <LoadingCat/>}
    //         <Routes>
    //             <Route path='/' element={<LoginSign/>} />
    //         </Routes>
    //     </BrowserRouter>
    // )

    return loading ? <LoadingCat/> : (
        <PageTransition location={location} key={location.pathname}>
            {!isLogin && (
                <>
                {!isAdmin ? <UserHeaderMenu/> : ''}
                </>
            )
            }
            <Routes>
                <Route path='/Login' element={<LoginSign/>} />
                <Route path='/' element={<div className='resultDiv'>{<UserHomeEl/>}</div>} />
                <Route path='/Promulgate' element={<div className='resultDiv'>{<PromulGateEl/>}</div>} />
                <Route path='/Explore' element={<div className='resultDiv'>{<ExploreEl/>}</div>} />
            </Routes>
            </PageTransition>
    )
}