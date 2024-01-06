import React, { createContext, useState } from 'react'

//create contextapi
export const addProjectResponseContext = createContext()

export const editProjectResponseContext = createContext()

export const isAuthTokenContext = createContext()

//children is the predefined prop used to share data between all component
function ContextShare({ children }) {
  
  //add to share
  const [addProjectResponse, setAddProjectResponse] = useState({})

  const [editProjectResponse, setEditProjectResponse] = useState({})

  const [isAuthToken, setIsAuthToken] = useState(false)

  return (
    <>
      {/* only provider can provide data. and value attribute is used to specify the data to share */}
      <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
        <editProjectResponseContext.Provider value={{ editProjectResponse, setEditProjectResponse }}>
          <isAuthTokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
            {children}
          </isAuthTokenContext.Provider>
        </editProjectResponseContext.Provider>

      </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare
