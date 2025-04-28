import React from 'react'

const Auth = ({children}) => {
  return (
    <div 
            className="h-[100vh] flex items-center justify-center border-gray-500"
        >
            <div className="md:h-auto md:w-[420px]">
                {children}
            </div>

        </div>
  )
}

export default Auth
