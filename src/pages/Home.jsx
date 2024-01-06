import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import titleImage from '../Assets/Projects.png'
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import { homeProjectAPI } from '../services/allAPI';
function Home() {
  const [isLogin, setIsLogin] = useState(false)
  const [homeProjects, sethomeProjects] = useState([])

  const getHomeProject = async()=>{
    const result = await homeProjectAPI()
    console.log(result.data);
    sethomeProjects(result.data)
  }
  console.log(homeProjects);

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }
  },[])

useEffect(()=>{
  getHomeProject()
},[])

  return (
    <>
      <div style={{ width: '100%', height: '100vh', backgroundColor: '#28C1B8' }}>
        <div className='container-fluid rounded'>
          <Row className='align-items-center p-5'>
            <Col sm={12} md={6} className='mt-5'>
              <h1 style={{ fontSize: '60px', color: 'white' }}>Project Fair</h1>
              <p className='text-black'>One stop destination for all software develpment projects</p>

              {isLogin?
                <Link to={'./dashboard'} className='btn  rounded' style={{backgroundColor:'purple', color:'white'}}>Manage Project<i class="fa-solid fa-arrow-right ms-3"></i></Link>
                :
              <Link to={'./login'} className='btn  rounded' style={{backgroundColor:'purple', color:'white'}}>Get Started <i class="fa-solid fa-arrow-right ms-3"></i></Link>
              }
            </Col>
            <Col sm={12} md={6}>
              <img src={titleImage} alt="" className='w-75' style={{ marginTop: '100px' }} />
            </Col>
          </Row>
        </div>

      </div>

      <div className='all-project mt-5'>
        <h1 className='text-center mt-5'>All Projects</h1>

        <marquee scrollAmount={25} className=" mt-5">
          <div className='d-flex'>
            {homeProjects?.length > 0 ?
              homeProjects.map((item) => (
              <div className='ms-5' style={{ width: '500px' }}>
                <ProjectCard project={item} />
              </div>))
              : null
            }
          </div>
        </marquee>

        <div className='text-center mt-5'>
          <Link className='text-dark' to={'/project'}>See More Projects</Link>

        </div>


      </div>
    </>
  )
}

export default Home;
