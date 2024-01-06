import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'


function Footer() {
  return (
    <>
    <div style={{ width: '100%', height: '350px',backgroundColor:'#28C1B8',color:'black', boxShadow:'initial' }} className='d-flex mt-5 align-items-center flex-column '>
        <div className="footer  w-100">
        
        <div class="row mt-5 ms-5" >
                <div className="col-md-3">
                    <h5 className="justify-content mt-2 fs-6"><i class="fa-solid fa-users"></i>  PROJECT FAIR</h5>
                    <div className="justify-content mt-4 ">
                    <p>Here You can use rows and colums to organizee your footer content. lorem ait amet consecyre adiplising elt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum ab nobis iure debitis. Non, iusto facilis, fugiat quos incidunt et quisquam dignissimos illum id dicta fuga labore cumque doloremque earum.</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <h5 className="justify-content mt-2 ms-5 fs-6">LINKS</h5>
                    <div className="justify-center ms-5 mt-4">
                    <p className='footer-link'><Link to={'/'}  style={{textDecoration:"none",color:'black'}}><i class="fa-solid fa-house"></i> Home</Link></p>
                    <p className='footer-link'><Link to={'./login'} style={{textDecoration:"none",color:'black'}}><i class="fa-solid fa-right-to-bracket"></i> Login</Link></p>
                    <p className='footer-link'><Link to={'./dashboard'} style={{textDecoration:"none",color:'black'}}><i class="fa-solid fa-gauge"></i> Dashboard</Link></p>
                    <p className='footer-link'><Link to={'./project'} style={{textDecoration:"none",color:'black'}}><i class="fa-solid fa-book"></i> Projects</Link></p>
                    <p className='footer-link'><Link to={'./register'} style={{textDecoration:"none",color:'black'}}><i class="fa-solid fa-registered"></i> Register</Link></p>

                    
                    </div>
                </div>
                <div className="col-md-3">
                    <h5 className="justify-content mt-2 fs-6">GUIDES</h5>
                    <div className="justify-content  mt-4">
                    <p className='footer-link'><Link   style={{textDecoration:"none",color:'black'}}>React</Link></p>
                    <p className='footer-link'><Link  style={{textDecoration:"none",color:'black'}}>Bootswatch</Link></p>
                    <p className='footer-link'><Link  style={{textDecoration:"none",color:'black'}}>Bootstrap</Link></p>
                    <p className='footer-link'><Link  style={{textDecoration:"none",color:'black'}}>Material UI</Link></p>
                    
                    


                </div>
                </div>
                <div className="col-md-3">
                    <h5 className="justify-content mt-2 fs-6">Follow us</h5>
                    <div className="justify-content mt-4">
                    <p className='footer-link'><Link  style={{textDecoration:"none",color:'black'}}><i class="fa-brands fa-facebook"></i>  Facebook</Link></p>
                    <p className='footer-link'><Link  style={{textDecoration:"none",color:'black'}}><i class="fa-brands fa-instagram"></i>  Instagram</Link></p>
                    <p className='footer-link'><Link  style={{textDecoration:"none",color:'black'}}><i class="fa-brands fa-square-twitter"></i>  Twitter</Link></p>
                    
                </div>
                </div>
                
                </div>
        
        </div>
    </div>
    <hr/>
    </>
  )
}

export default Footer
