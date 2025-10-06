import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Button from 'react-bootstrap/Button';
import NasaModal from './NasaModal';
import "./ScrollExample.scss";

const chapters = [
  {
    title: '/chapter1/chapter1.png',
    slides: [
      { text: "", img: "/chapter1/chapter1.png", audio: "", nasa: null },
      { text: "I am the sun.", img: "/chapter1/sol.jpg", audio: "/chapter1/audio1.m4a", nasa: { src: 'https://science.nasa.gov/wp-content/uploads/2024/08/sep-activeregion-closeup.mp4', alt: 'Solar eruptions', caption: 'This image was captured thanks to space technology. Scientists use it to study my behavior: when I release solar flares, how they affect Earth, and how to protect people. It’s real science—and also… a little bit of magic.' } },
      { text: "But I have also been Inti...", img: "/chapter1/INCAS.jpg", audio: "/chapter1/audio2.m4a", nasa: null },
      { text: "For some, I have been Ra...", img: "/chapter1/EGIPTO.jpg", audio: "/chapter1/audio3.m4a", nasa: null },
      { text: "Others have known me as Amaterasu...", img: "/chapter1/JAPAN.jpg", audio: "/chapter1/audio4.m4a", nasa: null },
      { text: "And many others named me Helios.", img: "/chapter1/GRECIA.jpg", audio: "/chapter1/audio5.m4a", nasa: null },
      { text: "I've been called so many things: Surya, Tonatiuh, Sol Invictus.", img: "/chapter1/gif6.gif", audio: "/chapter1/audio6.m4a", nasa: { src: 'https://science.nasa.gov/wp-content/uploads/2024/09/c2-304-activecombo-sm.mp4', alt: 'Coronal Mass Ejections', caption: 'This is how I look from space, with my rays dancing in the darkness. Scientists observe me from satellites to understand when I am calm… and when I start releasing energy that can travel all the way to your planet. I may seem still, but inside, I’m always in motion!' } },
      { text: "In the eyes of history, I've been a god, a star, a guide, and a mystery. But I'm just a star with a fire that burns tirelessly. I'm not eternal, but I'm millions of years old. Today, I come without any disguise to tell a part of my story.", img: "/chapter1/imagen7.jpg", audio: "/chapter1/audio7.m4a", nasa: { src: 'https://science.nasa.gov/wp-content/uploads/2024/05/x1pt7-flare-may-14-2024-crop-banner.mp4', alt: 'Solar Flares', caption: 'Oops! They caught me in one of my most intense moments. What you see are solar flares… as if I were sneezing light and magnetism. Don’t worry—it’s not dangerous if you study it from afar! Scientists observe me like this to understand my mood swings. And wow, do I have many!' } }
    ]
  },
  {
    title: '/chapter2/chapter2.png',
    slides: [
      { text: "", img: "/chapter2/chapter2.png", audio: "", nasa: null },
      { 
        text: "I’ve always been curious about the world around me. That’s how I started looking at the sky, and the Sun caught my attention.", 
        img: "/chapter2/galileo1.gif", 
        audio: "/chapter2/chapter2-audio1.m4a", 
        nasa: null 
      },
      { 
        text: "I saw it clearly. The Sun, our majestic giant, was the center of everything.", 
        img: "/chapter2/galileo2.png", 
        audio: "/chapter2/chapter2-audio2.m4a", 
        nasa: { 
          src: 'https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004892/SolarMax_AIA1700A_stand.HD1080i_p30.mp4', 
          alt: 'Faculae and Sunspots at Solar Maximum and Solar Minimum', 
          caption: 'Ah, Galileo! One of the first humans who truly looked at me closely. He believed I was perfect… until he discovered these spots. I’m not a pristine sphere, but those spots say a lot about me. They’re like traces of my emotions: sometimes active, sometimes calm. Galileo didn’t just observe me… he understood me.' 
        } 
      },
      { 
        text: "", 
        img: "/chapter2/galileo3.png", 
        audio: "/chapter2/chapter2-audio3.mp3", 
        nasa: null 
      },
      { 
        text: "This was a revolutionary moment. Before, they believed everything revolved around Earth… but Copernicus and Galileo looked beyond!", 
        img: "/chapter2/galileo4.gif", 
        audio: "/chapter2/chapter2-audio4.m4a", 
        nasa: null 
      },
      { 
        text: "The planets danced around it, just as they do to this day.", 
        img: "/chapter2/galileo5.png", 
        audio: "/chapter2/chapter2-audio5.m4a", 
        nasa: { 
          src: 'https://science.nasa.gov/wp-content/uploads/2023/10/edu-solar-system-large.png', 
          alt: 'Solar System', 
          caption: 'There was a time when they believed everything revolved around Earth. But then… surprise! They discovered that I am the one at the center. Copernicus imagined it. Galileo proved it. And since then, we’ve danced this beautiful dance of orbits and time. Welcome to the solar system—my bright neighborhood!' 
        } 
      }
    ]
  },
  {
    title: '/chapter3/chapter3.png',
    slides: [
      { text: "", img: "/chapter3/chapter3.png", audio: "", nasa: null },
      { 
        text: "Sometimes, something inside me stirs. I become a burst of energy: a coronal mass ejection.", 
        img: "/chapter3/sol1.png", 
        audio: "/chapter3/chapter3-audio1.m4a", 
        nasa: null
      },
      { 
        text: "When that happens, a part of me travels toward you.", 
        img: "/chapter3/aurora2.gif", 
        audio: "/chapter3/chapter3-audio2.m4a", 
        nasa: null
      },
      { 
        text: "That morning, colors danced in the sky. The northern lights reached our city.", 
        img: "/chapter3/aria1.png", 
        audio: "/chapter3/chapter3-audio3.m4a", 
        nasa: null
      },
      { 
        text: "Mom told me it was a solar storm. I wanted to know more.", 
        img: "/chapter3/aria2.png", 
        audio: "/chapter3/chapter3-audio4.m4a", 
        nasa: null
      }
    ]
  },
  {
    title: '/chapter4/chapter4.png',
    slides: [
      { text: "", img: "/chapter4/chapter4.png", audio: "", nasa: null },
      { 
        text: "I learned that space weather isn’t like the weather we know.", 
        img: "/chapter4/slide1.png", 
        audio: "/chapter4/chapter4-audio1.m4a", 
        nasa: null 
      },
      { 
        text: "It’s not about rain or heat, but about particles, magnetic fields, and energy traveling from the Sun.", 
        img: "/chapter4/slide2.png", 
        audio: "/chapter4/chapter4-audio2.m4a", 
        nasa: null
      },
      { 
        text: "I read about how astronauts prepare for storms.", 
        img: "/chapter4/slide3.png", 
        audio: "/chapter4/chapter4-audio3.m4a", 
        nasa: { 
          src: 'https://svs.gsfc.nasa.gov/vis/a010000/a012500/a012593/12593_Anthropogenic_Space_WeatherV1.mp4', 
          alt: 'Human Activity Impacted Space Weather', 
          caption: 'Sometimes I get a little excited… and I launch a big flare. Boom! A CME, or coronal mass ejection, travels through space.' 
        } 
      },
      { 
        text: "About the satellites that observe the Sun and teach us about its movement.", 
        img: "/chapter4/slide4.png", 
        audio: "/chapter4/chapter4-audio4.m4a", 
        nasa: { 
          src: '/STEREOnCME_HD1080.webmhd.mp4', 
          alt: 'From the Sun to the Earth: STEREO tracks a CME', 
          caption: 'But don’t worry, Earth has a protective layer: the magnetosphere. And thanks to science, like that of NASA and NOAA, you can prepare. You can even see it in real time! Amazing, isn’t it?' 
        } 
      },
      { 
        text: "That way they can warn us if a solar storm is approaching and prevent problems with airplane routes!", 
        img: "/chapter4/slide5.png", 
        audio: "/chapter4/chapter4-audio5.m4a", 
        nasa: { 
          src: 'https://science.nasa.gov/wp-content/uploads/2024/09/space-weather-effects-esa.jpg', 
          alt: 'Solar storms can have a variety of effects on Earth and our technology', 
          caption: 'Did you know that when I’m having a bad day, I can make GPS signals get lost, airplanes experience more radiation, and even cause lights to go out on Earth? I don’t do it on purpose… it’s just that I’m powerful! Luckily, there are people who have studied me for years to understand me better. Thanks to them, my energy can be as useful… as it is dangerous.' 
        } 
      },
      { 
        text: "By understanding space weather, we can predict all of this.", 
        img: "/chapter4/slide6.png", 
        audio: "/chapter4/chapter4-audio6.m4a", 
        nasa: null
      }
    ]
  },
  {
    title: '/chapter5/chapter5.png',
    slides: [
      { text: "", img: "/chapter5/chapter5.png", audio: "", nasa: null },
      { 
        text: "Today I know that we can live in harmony with the Sun if we learn to listen to it.", 
        img: "/chapter5/slide1.png", 
        audio: "/chapter5/chapter5-audio1.m4a", 
        nasa: null
      },
      { 
        text: "There are people who dedicate their lives to understanding it: scientists, engineers, artists. I want to be one of them.", 
        img: "/chapter5/slide2.png", 
        audio: "/chapter5/chapter5-audio2.m4a", 
        nasa: null
      },
      { 
        text: "Because when we understand the sky, we also understand how to take care of ourselves on Earth. And that is something we must all learn.", 
        img: "/chapter5/slide3.gif", 
        audio: "/chapter5/chapter5-audio3.m4a", 
        nasa: { 
          src: 'https://images-assets.nasa.gov/image/PIA26681/PIA26681~medium.jpg', 
          alt: 'Image of Sun From NASA\'s Solar Dynamics Observatory', 
          caption: 'I have seen civilizations rise, telescopes point to the sky, and children ask questions. From here, I watch over you without being fully seen. I am one star among many, but for you… I am the Sun.' 
        } 
      },
      { 
        text: "", 
        img: "/chapter5/final-title.png", 
        audio: "/chapter5/chapter5-audio4.m4a", 
        nasa: null 
      }
    ]
  }
];

const chapterStartIndices = [0, 8, 14, 19, 26];

const ScrollamaDemo = () => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const [modalData, setModalData] = useState({ isOpen: false, content: {} });
  const audioRef = useRef(null);

  const handleOpenModal = useCallback((content) => {
    if (!content?.src) return;
    if (audioRef.current) audioRef.current.pause();
    setModalData({ isOpen: true, content });
  }, []);

  const handleCloseModal = useCallback(() => setModalData({ isOpen: false, content: {} }), []);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  // construir array plano de slides (27 slides)
  const allSlides = chapters.flatMap(chap => chap.slides);

  // obtener slide actual (o null)
  const getCurrentSlide = (index) => {
    if (index === null) return null;
    return allSlides[index] ?? null;
  };

  // determinar capítulo actual según índice
  const getCurrentChapter = (index) => {
    if (index === null) return null;
    let acc = 0;
    for (let chap of chapters) {
      if (index < acc + chap.slides.length) return chap;
      acc += chap.slides.length;
    }
    return null;
  };

  // audio playback (solo si slide tiene audio)
  useEffect(() => {
    const slide = getCurrentSlide(currentStepIndex);
    if (!slide || !slide.audio) {
      // pause si no hay audio
      if (audioRef.current) audioRef.current.pause();
      return;
    }

    if (audioRef.current) {
      const audioEl = audioRef.current;
      if (audioEl.src !== slide.audio) audioEl.src = slide.audio;
      audioEl.pause();
      audioEl.currentTime = 0;
      setTimeout(() => {
        if (!modalData.isOpen) audioEl.play().catch(() => console.log('Interacción requerida para audio.'));
      }, 100);
    }
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, [currentStepIndex, modalData.isOpen]);

  // render botón NASA si aplica
  const renderNasaButton = () => {
    const slide = getCurrentSlide(currentStepIndex);
    if (!slide || !slide.nasa) return null;
    return (
        <Button variant="link" className="btnNasa" onClick={() => handleOpenModal(slide.nasa)}>
            <img src="./ARIA-BOTON4.gif" alt="Aria" className="gif-aria" />
        </Button>
    );
  };

  // sticky: aparece solo si currentStepIndex no es inicio de capítulo
  const shouldShowSticky = () => {
    if (currentStepIndex === null) return false;
    if (chapterStartIndices.includes(currentStepIndex)) return false;
    if (currentStepIndex === allSlides.length - 1) return false;
    return true;
  };

  const currentChapter = getCurrentChapter(currentStepIndex);
  // const currentSlide = getCurrentSlide(currentStepIndex);

  if (!hasInteracted) {
    return (
      <div className='vistaPrincipal'>
        <div className=' vistaPrincipal__container d-flex flex-column align-items-center justify-content-center gap-5'>
          <img src="./logo-a-solar-tale.png" alt="logo" />
          <p className='m-0 p-0 text-white text-center'>
            A digital storytelling experience inspired by the NASA Space Apps 
            Challenge 2025 — "Stellar Stories: Space Weather Through the Eyes of Earthlings".
          </p>
          <div className='d-flex flex-column flex-md-row gap-5 align-items-center'>
            <a className='btnGithub' target='_blank' rel="noreferrer" href="https://github.com/AliceRamirez17/a-solar-tale">
              <img src='./logo-github.png' alt='github repository'/>
            </a>
            <Button className='btn btnStart' size="lg" onClick={() => setHasInteracted(true)}>
              Watch the experience ☀️
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='vistaCuento'>
      <audio ref={audioRef} />
      <NasaModal show={modalData.isOpen} handleClose={handleCloseModal} content={modalData.content} />

      {/* Sticky chapter title -> solo si no estamos en el primer slide del chapter */}
      {shouldShowSticky() && currentChapter && (
        <div className="chapter-title-sticky" aria-hidden={!shouldShowSticky()}>
          <img src={currentChapter.title} alt="Chapter title" className="chapter-title-sticky__img" />
        </div>
      )}

      {/* Imagen actual (fondo fijo) */}
      <div className='vistaCuento__container'>
        <div className='vistaCuento__container--img'>
          {allSlides.map((slide, idx) => (
            <img
              key={idx}
              src={slide.img}
              alt="Slide visual"
              className={`
                slide-image 
                ${idx === currentStepIndex ? "active" : ""} 
                ${chapterStartIndices.includes(idx) ? "chapter-title-slide" : ""} 
                ${idx === allSlides.length - 1 ? "last-slide" : ""}
              `}
            />
          ))}
          {renderNasaButton()}
        </div>
      </div>

      {/* Scroll con Step (textos) */}
      <div className='vistaCuento__scroll'>
        <Scrollama offset={0.5} onStepEnter={onStepEnter}>
          {allSlides.map((slide, idx) => (
            <Step key={idx} data={idx}>
                <div className='vistaCuento__scroll__steps'>
                    {slide.text && slide.text.trim() !== "" ? (
                    <div className='vistaCuento__scroll__steps--text'>
                        {slide.text}
                    </div>
                    ) : null}
                </div>
            </Step>
          ))}
        </Scrollama>
      </div>
    </div>
  );
};

export default ScrollamaDemo;
