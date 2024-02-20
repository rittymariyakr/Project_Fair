import React, { createContext, useState } from 'react'

//create contextapi
export const addProjectResponseContext = createContext()
export const AuthTokenContext = createContext()
export const editProjectResponseContext = createContext()


//children is the predefined prop used to share data between all component
function ContextShare({ children }) {

  //add to share
  const [addProjectResponse, setAddProjectResponse] = useState({})
  const [isAuthorized, setIsAuthorized] = useState(true)
  const [editProjectResponse, setEditProjectResponse] = useState({})

  return (
    <>
      {/* only provider can provide data. and value attribute is used to specify the data to share */}
      <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
        <editProjectResponseContext.Provider value={{ editProjectResponse, setEditProjectResponse }}>
          <AuthTokenContext.Provider value={{ isAuthorized, setIsAuthorized }}>
            {children}
          </AuthTokenContext.Provider>
        </editProjectResponseContext.Provider>

      </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare
