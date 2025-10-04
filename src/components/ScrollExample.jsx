import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Button from 'react-bootstrap/Button';
import NasaModal from './NasaModal';
import "./ScrollExample.scss"

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
        "I am the sun. But I have also been Inti...",
        "For some, I have been Ra...",
        "Others have known me as Amaterasu...",
        "And many others named me Helios.",
        "I've been called so many things: Surya, Tonatiuh, Sol Invictus. In the eyes of history, I've been a god, a star, a guide, and a mystery. But I'm just a star with a fire that burns tirelessly. I'm not eternal, but I'm millions of years old. Today, I come without any disguise to tell a part of my story."
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const audios = [
        '/audio1.m4a',
        '/audio2.m4a',
        '/audio3.m4a',
        '/audio4.m4a',
        '/audio5.m4a'
    ];

    const imagenes = [
        '/INCAS.png',
        '/EGIPTO.png',
        '/JAPAN.png',
        '/GRECIA.png',
        '/solyplanetas.gif'
    ];

    const nasaData = [
        { src: 'https://science.nasa.gov/wp-content/uploads/2024/08/sep-activeregion-closeup.mp4', alt: 'video 1', caption: 'caption 1' },
        { src: 'https://science.nasa.gov/wp-content/uploads/2024/07/animated-gif-x28-oct2003.gif', alt: 'video 2', caption: 'caption 2' },
        { src: 'https://science.nasa.gov/wp-content/uploads/2024/05/x1pt7-flare-may-14-2024-crop-banner.mp4', alt: 'video 3', caption: 'caption 3' },
        { src: 'https://science.nasa.gov/wp-content/uploads/2024/09/solar-max-min.mp4', alt: 'video 4', caption: 'caption 4' },
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
                <Button className='btnNasa' onClick={() => handleOpenModal(nasaData[currentStepIndex])}>
                    Ver Data de la NASA 🚀
                </Button>
            );
        }
        return null;
    };

    if (!hasInteracted) {
        return (
            <div className='vistaPrincipal'>
                <div></div>
                <div className=' vistaPrincipal__container'>
                  <div className='w-75 info d-flex flex-column align-items-start justify-content-start gap-4'>
                    <img src="./logo-a-solar-tale.png" />
                    <p className='m-0 p-0 text-start text-dark'>A digital storytelling experience inspired by the NASA Space Apps 
                      Challenge 2025 — "Stellar Stories: Space Weather Through the Eyes of Earthlings".
                    </p>
                    <Button className='btn btnStart' size="lg" onClick={() => setHasInteracted(true)}>
                      Watch the experience ☀️
                    </Button>
                  </div>
                  <div className='github d-flex align-items-start justify-content-end'>
                    <a className='btnGithub' target='_blank' href="https://github.com/AliceRamirez17/the-sun-whispers">
                      <img src='./logo-github.png' alt='github repository'/>
                    </a>
                  </div>
                </div>
            </div>
        );
    }

    return (
        <div className='vistaCuento' >

            <audio ref={audioRef} />

            {/* Modal con imágenes reales de la NASA */}
            <NasaModal
                show={modalData.isOpen}
                handleClose={handleCloseModal}
                content={modalData.content}
            />
            {/* Ilustraciones */}
            <div className='vistaCuento__container'>
                <div className='vistaCuento__container--img'>
                    {imagenes.map((src, index) => (
                        <img key={index} src={src} alt={`Imagen ${index}`} style={{ opacity: currentStepIndex === index ? 1 : 0 }}/>
                    ))}

                    {renderNasaButton()}

                </div>
            </div>
            {/* Scroll con textos */}
            <div className='vistaCuento__scroll'>
                <Scrollama offset={0.5} onStepEnter={onStepEnter}>
                    {textos.map((txt, index) => (
                        <Step data={index} key={index}>
                            <div className='vistaCuento__scroll__steps'>
                                <div className='vistaCuento__scroll__steps--text'>
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