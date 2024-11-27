import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
function AuthLayout({children}) {
  const navigate = useNavigate()
    const user = useSelector((state) => state.auth.status)
    console.log(user)
    useEffect(() => {
      
      const timer = setTimeout(() => {
        if (!user) {
          navigate('/');
        }
      }, 2000); // Delay of 300 milliseconds
        if (!user) {
        
        alert("You need to connect wallet first!");
        }
      // Cleanup function to clear the timer if the component unmounts or dependencies change
      return () => clearTimeout(timer);
    },[user])
  return (
    <>
        {user && children}
    </>
  )
}

export default AuthLayout