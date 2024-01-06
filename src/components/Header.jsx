import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate} from 'react-router-dom'
import { isAuthTokenContext } from '../contexts/ContextShare';

function Header({dashboard}) {
  const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)

  const navigate = useNavigate()

  //logout
  const handleLogout = ()=>{

    //removing token and exix=sting user whe click on logout button
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("existingUser")
      setIsAuthToken(false)
      //navigate to home page
      navigate('/')
  }

  return (
    <>
    <Navbar  style={{backgroundColor:'#28C1B8'}}>
        <Container>
          <Navbar.Brand href="#home">
            <Link to={'/'} style={{textDecoration:'none', color:'black'}}>
          <i class="fa-brands fa-stack-overflow fa-3x"></i> {' '}
           
           Project Fair

            </Link>
          </Navbar.Brand>
          {
            dashboard &&
            <button onClick={handleLogout} className='btn btn-warning'>Logout <i class="fa-solid fa-power-off"></i></button>
          }
        </Container>
      </Navbar></>
  )
}

export default Header
