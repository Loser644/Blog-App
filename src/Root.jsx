import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyApp from './Component/myApp'
import {ToastContainer} from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>     
          <MyApp/>
      </BrowserRouter>    
           <ToastContainer
                      position="bottom-center"
                      autoClose={2000}
                      hideProgressBar={false}
                      newestOnTop
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="dark"
                      toastClassName="custom-toast"
                    />
    </StrictMode>
)
