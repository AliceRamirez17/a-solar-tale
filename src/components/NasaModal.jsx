import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NasaModal = ({ show, handleClose, content }) => {
  const isVideo = content.src && content.src.toLowerCase().endsWith('.mp4');

  const MediaContent = () => {
    if (isVideo) {
      return (
        <video 
          src={content.src} 
          alt={content.alt}
          autoPlay
          loop
          controls
          muted
          style={{ 
            maxWidth: '100%', 
            maxHeight: '60vh', 
            objectFit: 'contain' 
          }} 
        />
      );
    } else {
      return (
        <img 
          src={content.src} 
          alt={content.alt} 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '60vh', 
            objectFit: 'contain' 
          }} 
        />
      );
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Datos del Sol de la NASA 🚀</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} className="text-center">
              <MediaContent />
            </Col>
            <Col xs={12} className="mt-3 text-center">
              <p>{content.caption}</p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar y Continuar Historia
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NasaModal;