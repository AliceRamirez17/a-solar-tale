import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';

const ScrollamaDemo = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  const textos = [
    "Texto 1",
    "Texto 2",
    "Texto 3",
    "Texto 4"
  ];

  const imagenes = [
    '/src/assets/INCAS.png',
    '/src/assets/EGIPTO.png',
    '/src/assets/JAPAN.png',
    '/src/assets/GRECIA.png'
  ];

  return (
    <div style={{ display: 'flex' }}>
      
      {/* ✅ COLUMNA FIJA CON IMÁGENES */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100vw',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          {imagenes.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Imagen ${index}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 0.5s ease',
                opacity: currentStepIndex === index ? 1 : 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* ✅ COLUMNA SCROLL CON TEXTO */}
      <div
        style={{
          width: '100vw',
          marginLeft: 'auto',
        }}
      >
        <Scrollama offset={0.5} onStepEnter={onStepEnter}>
          {textos.map((txt, index) => (
            <Step data={index} key={index}>
              <div
                style={{
                  margin: '50vh 0',
                  fontSize: '1.5rem',
                  padding: '20px',
                }}
              >
                {txt}
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
    </div>
  );
};

export default ScrollamaDemo;
