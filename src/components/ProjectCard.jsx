import React from 'react'
import Card from 'react-bootstrap/Card';
import videoplayerimage from '../Assets/Videoplayer.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';

function ProjectCard({ project }) {
  console.log(project);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card className='btn shadow' onClick={handleShow}>
        <Card.Img height={'250px'} variant="top" src={project?`${BASE_URL}/uploads/${project.projectImage}`:videoplayerimage} />
        <Card.Body>
          <Card.Title className='text-center'>{project.title}</Card.Title>

        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'orange' }}>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ height: '250px' }}>
            <Col md={6}>
              <img src={project?`${BASE_URL}/uploads/${project.projectImage}`:videoplayerimage} width={'100%'} alt="no image" />
            </Col>
            <Col>
              <p>{project.title}</p>
              <p>{project.overview}</p>
              <p><span className='fw-bolder'>Technologies</span>{project.language}</p>
            </Col>
          </Row>

          <div className='d-flex'>
            <a style={{ color: 'black' }} href={project.github} target='_blank'><i class="fa-brands fa-github fa-2x ms-5"></i></a>
            <a style={{ color: 'blue' }} href={project.website} target='_blank'><i class="fa-solid fa-link fa-2x ms-5"></i></a>

          </div>
        </Modal.Body>

      </Modal>

    </>
  )
}

export default ProjectCard
