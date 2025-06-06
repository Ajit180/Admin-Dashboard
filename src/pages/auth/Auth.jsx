import React from 'react'

const Auth = ({children}) => {
  return (
    <div 
            className="h-[100vh] flex items-center justify-center bg-cyan-100"
        >
            <div className="md:h-auto md:w-[420px]">
                {children}
            </div>

        </div>
  )
}

export default Auth
