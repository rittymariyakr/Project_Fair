import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext } from '../contexts/ContextShare';

function AddProject() {
    //to hold value of image url
    const [preview, setPreview] = useState("")

    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)

    //state to hold token
    const [token, setToken] = useState("")

    const [show, setShow] = useState(false);

    const handleClose = () => {
        handleClose1();
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const [projectDetails, setProjectDetails] = useState({
        title: "",
        language: "",
        github: "",
        website: "",
        overview: "",
        projectImage: ""
    })
    console.log(projectDetails);

    //clear input box
    const handleClose1 = () => {
        setProjectDetails({
            title: "",
            language: "",
            github: "",
            website: "",
            overview: "",
            projectImage: ""
        })
        setPreview("")
    }
    //auto display of project image
    useEffect(() => {
        if (projectDetails.projectImage) {
            (setPreview(URL.createObjectURL(projectDetails.projectImage)))
        }
        else {
            setPreview("")
        }
    }, [projectDetails.projectImage])

    //taking token //need token only when first time of page loading
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        else {
            setToken("")
        }
    }, [])
    //add project
    const handleAdd = async (e) => {
        e.preventDefault()
        const { title, language, github, website, overview, projectImage } = projectDetails

        if (!title || !language || !github || !website || !overview || !projectImage) {
            toast.info('please fill the form completly!')
        }
        else {
            //reqBody
            //1)create object for form data - since we have uploaded content (from our computer, ie, not avail in internet)
            const reqBody = new FormData()
            //2)add data to FormData - using append()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            reqBody.append("projectImage", projectImage)

            if (token) {
                //passing reqheader to allAPI 
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }

                const result = await addProjectAPI(reqBody, reqHeader)
                console.log(result);
                if (result.status === 200) {
                    toast.success("project added Succesfully");
                    console.log(result.data);
                    //closing the modal and clearing the field
                    handleClose()
                    setAddProjectResponse(result.data)
                }
                else {
                    console.log(result.response.data);

                }
            }
        }
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Add project
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <label htmlFor="image" className='text-center'>
                                {/* if inputut type is file then take value from e.target.files[0] */}
                                <input id='image' onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                                <img width={'100%'} src={preview ? preview : "https://m.media-amazon.com/images/I/71sKzRQtXtL.png"} alt="no image" />
                            </label>
                        </Col>

                        <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
                            <div className='mb-3 w-100'>
                                <input onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} value={projectDetails.title} type="text" className='form-control' placeholder='Project Title' />
                            </div>
                            <div className='mb-3 w-100'>
                                <input onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} value={projectDetails.language} type="text" className='form-control' placeholder='Project Language' />
                            </div>
                            <div className='mb-3 w-100'>
                                <input onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} value={projectDetails.github} type="text" className='form-control' placeholder='Project Github Link' />
                            </div>
                            <div className='mb-3 w-100'>
                                <input onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} value={projectDetails.website} type="text" className='form-control' placeholder='Project Website Link' />
                            </div>
                            <div className='mb-3 w-100'>
                                <input onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} value={projectDetails.overview} type="text" className='form-control' placeholder='Project Overview' />
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose1}>
                        Clear
                    </Button>
                    <Button variant="success" onClick={handleAdd}>Add</Button>

                </Modal.Footer>
                <ToastContainer position='top-center' theme='colored' autoClose={2000} />
            </Modal>

        </>
    )
}

export default AddProject
