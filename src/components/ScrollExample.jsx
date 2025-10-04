import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Button from 'react-bootstrap/Button';
import NasaModal from './NasaModal';

const ScrollamaDemo = () => {
    const [hasInteracted, setHasInteracted] = useState(false); 
    const [currentStepIndex, setCurrentStepIndex] = useState(null);
    const [modalData, setModalData] = useState({ isOpen: false, content: {} });
    const audioRef = useRef(null);

    const handleOpenModal = useCallback((content) => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setModalData({ isOpen: true, content });
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalData({ isOpen: false, content: {} });
    }, []);

    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };

    const textos = [
        "They call me Inti in the Andes,",
        "Ra in ancient Egypt,",
        "Helios to the Greeks,",
        "Amaterasu in the land of the rising sun"
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const audios = [
        '/audio1.mp3',
        '/audio2.mp3',
        '/audio3.mp3',
        '/audio4.mp3',
    ];

    const imagenes = [
        '/INCAS.png',
        '/EGIPTO.png',
        '/GRECIA.png',
        '/JAPAN.png',
    ];

    const nasaData = [
        { src: 'https://science.nasa.gov/wp-content/uploads/2024/08/sep-activeregion-closeup.mp4', alt: 'video 1', caption: 'caption 1' },
        { src: 'https://science.nasa.gov/wp-content/uploads/2024/07/animated-gif-x28-oct2003.gif', alt: 'video 2', caption: 'caption 2' },
        { src: 'https://science.nasa.gov/wp-content/uploads/2024/05/x1pt7-flare-may-14-2024-crop-banner.mp4', alt: 'video 3', caption: 'caption 3' },
        { src: 'https://science.nasa.gov/wp-content/uploads/2024/09/solar-max-min.mp4', alt: 'video 4', caption: 'caption 4' },
    ];

    useEffect(() => {
        if (hasInteracted && currentStepIndex !== null && audioRef.current && audios[currentStepIndex]) {
            const audioEl = audioRef.current;
            const newSrc = audios[currentStepIndex];

            if (audioEl.src !== newSrc) {
                audioEl.src = newSrc;
            }

            audioEl.pause();
            audioEl.currentTime = 0;

            setTimeout(() => {
                if (!modalData.isOpen) {
                    audioEl.play().catch(error => {
                      console.log("La reproducción automática falló. Interacción requerida.");
                      console.log(error)
                    });
                }
            }, 100);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };

    }, [currentStepIndex, audios, modalData.isOpen, hasInteracted]);

    const renderNasaButton = () => {
        if (currentStepIndex !== null && nasaData[currentStepIndex]) {
            return (
                <Button
                    variant="secondary"
                    onClick={() => handleOpenModal(nasaData[currentStepIndex])}
                    style={{
                        position: 'absolute',
                        top: '50px',
                        left: '50px',
                        zIndex: 20,
                        fontSize: '1rem',
                        padding: '10px 20px',
                        transition: 'opacity 0.3s ease',
                        opacity: 1,
                    }}
                >
                    Ver Data de la NASA 🚀
                </Button>
            );
        }
        return null;
    };

    if (!hasInteracted) {
        return (
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100, // Asegura que esté encima de todo
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <h2>Bienvenido a la Historia de Inti</h2>
                <p>Haz clic en "Comenzar" para habilitar la reproducción de audio sincronizada con el scroll.</p>
                <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => setHasInteracted(true)}
                    style={{ marginTop: '20px' }}
                >
                    Comenzar Experiencia ☀️
                </Button>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative' }}>

            <audio ref={audioRef} />

            {/* Modal con imágenes reales de la NASA */}
            <NasaModal
                show={modalData.isOpen}
                handleClose={handleCloseModal}
                content={modalData.content}
            />
            {/* Ilustraciones */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    width: '100vw',
                    zIndex: 1,
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
                                objectFit: 'contain', 
                                transition: 'opacity 0.8s ease-in-out',
                                opacity: currentStepIndex === index ? 1 : 0,
                            }}
                        />
                    ))}

                    {renderNasaButton()}

                </div>
            </div>
            {/* Scroll con textos */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    width: '40vw',
                    marginLeft: '50vw',
                }}
            >
                <Scrollama offset={0.5} onStepEnter={onStepEnter}>
                    {textos.map((txt, index) => (
                        <Step data={index} key={index}>
                            <div
                                style={{
                                    minHeight: '150vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '20px',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '1.5rem',
                                        textAlign: 'center',
                                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                                        padding: '20px 40px',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        maxWidth: '80%',
                                        fontFamily: 'Arial, sans-serif'
                                    }}
                                >
                                    {txt}
                                </div>
                            </div>
                        </Step>
                    ))}
                </Scrollama>
            </div>
        </div>
    );
};

export default ScrollamaDemo;