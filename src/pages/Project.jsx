import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard';
import { allProjectAPI } from '../services/allAPI';
import { Link } from 'react-router-dom'


function Project() {
  const [allProject, setAllProject] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [isToken, setisToken] = useState(false)
  const getAllProject = async (e) => {
    // e.preventDefault()

    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        //no upload contents. only getting the contents. so give application/json as content type
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

      const result = await allProjectAPI(searchKey, reqHeader)
      console.log(result.data);

      if (result.status === 200) {
        setAllProject(result.data)

      }
    }

  }
  console.log(searchKey);

  useEffect(() => {
    getAllProject()
  }, [searchKey])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setisToken(true)

    }
  }, [])

  return (
    <>
      <Header />
      <div >
        <div className='text-center mt-5'>
          <h1>All Projects</h1>
        </div>
        <div>
          <form >
            <div className="row mt-5">
              <div className="col-4"></div>
              <div className="col-4 d-flex">
                <input onChange={e => { setSearchKey(e.target.value) }} className='w-100 align-items-center rounded form-control' type="text" placeholder='Search the project using technologies' /><i style={{ marginLeft: '-40px', color: 'grey' }} class="fa-solid fa-magnifying-glass fa-rotate-90  "></i>

              </div>
              <div className="col-4"></div>
            </div>
          </form>
        </div>
      </div>
      <Row className='mt-5 container-fluid'>
        {allProject?.length > 0 ?
          allProject?.map((item) => (<Col sm={12} md={6} lg={4}>
            <ProjectCard project={item} />
          </Col>))
          :
          <div>
            {isToken ? <p className='fw-bolder text-danger text-center'>Sorry no such Project available</p> :
              <div className='d-flex justify-contentcenter align-items-center flex-column'>
                <img height={'300px'} width={'300px'} src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" />
                <p className='text-danger fw-2 fs-2'>please <Link className='text-info' style={{ textDecoration: "none" }} to={'/login'} >Login</Link> to view more projects </p>
              </div>
            }
          </div>
        }
      </Row>

    </>
  )
}

export default Project;
