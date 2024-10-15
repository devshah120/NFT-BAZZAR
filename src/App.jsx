import { useEffect } from 'react';
import {Header , Footer} from './components'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import {NFTBazzarProvider} from '../Context/NFTBazzarContext';
import { Register } from './pages';
import UserData from './dataGathering/userData';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin,logout,setToken } from './store/authSlice'

// function App() {
//   return (
//     <div className=' bg-black dark:bg-white'>
//     <NFTBazzarProvider>
//       <Header/>
//         <Outlet/> 
//       <Footer/>
//       </NFTBazzarProvider>
//     </div>
//   )
// }

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
    console.log(location)
  
    useEffect(() => {
      UserData.getUserDetails()
        .then((res) => {
          if(res.status === 200){
            const { user, RefreshToken } = res.data;
            const userData = user[0]
            
            
            dispatch(setToken(RefreshToken))
            dispatch(authLogin({userData}));
          } else if (res.status === 201 || res.status === 204) {
            dispatch(logout())
          }
        })
      // if user is logged in, redirect to dashboard
      
    },[])
    


    return (
    
      location.pathname === "/register" ? (
        <div className='bg-black dark:bg-white'>
          <Register />
        </div>
      ) : (
        <div className='bg-black dark:bg-white'>
          <NFTBazzarProvider>
              <Header/>
              <ScrollToTop />
              <Outlet/> 
              <Footer/>
          </NFTBazzarProvider>
        </div>
      )
      
  )
}

export default App


// ef1d8c72942d434cadf74980e53ced77