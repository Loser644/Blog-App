import { useEffect, useState } from 'react';
import {useLocation, useNavigate,Link} from 'react-router-dom'
export default function UserMenu(params) {
    const navi = useNavigate();
    const Location = useLocation();
 const [crntTab,setTab] = useState('Home');
  useEffect(()=>{
    const path = Location.pathname;
    if (path === '/') {
        setTab('Home');
    }else if (path.startsWith('/Report')) {
        setTab('Report')
    }else if (path.startsWith('/Save')) {
        setTab('Save')
    }else if (path.startsWith('Profile')) {
        setTab('Profile')
    }else if (path.startsWith('/Explore')) {
        setTab('Explore')
    }else if(path === '/Promulgate'){
        setTab('Promulgate')
    }
    else {
        setTab('None')
    }
  },[Location])
    return(
        <div className="userMenu">
            <ul>
                <li className={crntTab === 'Home' ? 'activeLi' : ''}><Link to={'/'}><i className="bx bx-home"></i><span>Home</span></Link></li>
                <li className={crntTab === 'Explore' ? 'activeLi' : ''}><Link to={'/Explore'}><i className="bx bx-compass"></i><span>Explore</span></Link></li>
                <li className={crntTab === 'Report' ? 'activeLi' : ''}><i className="bx bxs-report"></i><span>Report</span></li>
                <li className={crntTab === 'Promulgate' ? 'activeLi' : ''}><Link to={'/Promulgate'}><i className="bx bx-plus"></i></Link></li>
                <li className={crntTab === 'Save' ? 'activeLi' : ''}><i className="bx bx-save"></i><span>Save</span></li>
                <li className={crntTab === 'Profile' ? 'activeLi' : ''}><i className="bx bx-user-circle"></i><span>Profile</span></li>
            </ul>
        </div>
    )
}