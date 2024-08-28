import React from 'react'

function Container({children}) {
  return (
    <div className=' w-full max-w-7xl mx-auto md:px-4 px-2'>{children}</div>
  )
}

export default Container