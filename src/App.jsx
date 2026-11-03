import headshot from './assets/photo.jpg';
import Lanyard from './component/Lanyard-updated';
import {FaGithub, FaLinkedin, FaOrcid, FaEnvelope, FaArrowRightLong } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [releaseLanyard, setReleaseLanyard] = useState(false);
  const heroRef = useRef(null);
  const lanyardRef = useRef(null);
  const sidebarRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const lanyard = lanyardRef.current;
    const sidebar = sidebarRef.current;
    const title = titleRef.current;

    function changeWidth() {
      // const scroll = window.scrollY;
      const scroll = Math.min(window.scrollY / window.innerHeight, 1)
      // const height = Math.min(Math.max(25-scroll/2, -100), 0);
      const height = Math.min(0, 25 - 125*scroll)
      const width = 100 - 75 * scroll;
      // const width = Math.max(25, 100 - scroll/4);

      hero.style.width = `${width}%`;
      lanyard.style.top = `${height}%`;

      if (width <= 40) {
        sidebar.classList.add('visible');
      } else {
        sidebar.classList.remove('visible');
      }

      if (width <= 50) {
        title.classList.add('invisible');
      } else {
        title.classList.remove('invisible');
      }
    }

    window.addEventListener('scroll', changeWidth);
    changeWidth();

    return () => {
      window.removeEventListener('scroll', changeWidth);
    };
  }, []);

  useGSAP(() => {
    const lanyard = lanyardRef.current;
    const first = document.getElementById('first');
    const shiftx = first.getBoundingClientRect().width;
    const shifty = first.getBoundingClientRect().height;
    const secondSplit = new SplitText(document.getElementById('second'), { type: 'chars', deepSlice: true });

    const tl = gsap.timeline();

    tl.fromTo(titleRef.current, {
      x: -0.5 * shiftx,
      y:  shifty,
      opacity: 0,
    }, {
      x: -0.5 * shiftx,
      y: 0,
      opacity: 1,
      duration: 0.75,
      ease: 'back.out',
    })

    tl.to(titleRef.current, {
      x: 0,
      duration: 0.75,
      ease: 'power2.out',
    }, 1.25);

    tl.from(secondSplit.chars, {
      yPercent: 50,
      opacity: 0,
      duration: 0.25,
      stagger: 0.02,
    }, 2.25);

    tl.add(() => {
      setReleaseLanyard(true);
      lanyard.classList.remove('invisible');
    }, 2.75);

    return () => secondSplit.revert();
  }, []);
  

  return (
    <>
      <div className="hero" id="hero" ref={heroRef}>
        <div className="lanyard-container invisible" ref={lanyardRef}>
          <Lanyard id="lanyard" ref={lanyardRef}
            frontImage={headshot}
            imageFit="contain"
            cardColor="#f3f1eb"
            orientation="portrait"
            finish="glossy"
            cornerRadius={0.25}
            size={0.65}
            strapLength={0.2}
            strapColor="#000000"
            strapWidth={0.75}
            metal="silver"
            gravity={1}
            damping={0.6}
            elasticity={0.4}
            breeze={1}
            interactive
            intro
            paused={!releaseLanyard}
          />
        </div>
        <h1 ref={titleRef}>
          <span id="first">Hello! </span>
          <span id="second">
            I am 
            <br />
            <em>Mayank Shenoy</em>
          </span>
        </h1>
      </div>

      <div className="sidebar" id="sidebar" ref={sidebarRef}>
        <div className="header">
          <h2>Mayank<br/>Shenoy</h2>
        </div>
        <nav className="toc">
          <a href="#introduction">Who am I?</a>
          <a href="#research">Research </a>
          <a href="#talks-papers">Talks & Papers </a>
          <a href="#academic-journey">Academic Journey </a>
          <a href="#certifications">Certifications </a>
        </nav>
        <div className="footer">
          <div className="icon-links">
            <a href="https://github.com/mayank-shenoy" target="_blank" rel="noopener noreferrer">
              <FaGithub className="social-icon" />
            </a>
            <a href="https://orcid.org/0000-0002-1234-5678" target="_blank" rel="noopener noreferrer">
              <FaOrcid className="social-icon"/>
            </a>
            <a href="https://linkedin.com/in/mayankshenoy" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
            </a>
            <a href="mailto:mayankshenoy@example.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="social-icon"/>
            </a>
          </div>
          &copy; Mayank Shenoy <br />
          Last updated November 2026.
        </div>
      </div>

      <main>
          <div className="blank"></div>
          <div className="section" id="introduction">
            <p className="tag">01/05</p>
            <h2>Who am I?</h2>
            <p>
              I am a computational astrophysicist and graduate student at Imperial College London, where I'm finishing my 
							MSc in Physics. I earned my Honours BSc in Astronomy and Physics from the University of Toronto in 2024. I am interested
							in exploring the physics of some of the most extreme environments in the universe by using large-scale simulations of 
							observational targets like Sagittarius A* or localised box simulations based on what we observe from them, here on Earth.
            </p>
            <p>
              In my free time, you will find me listening to metal or reggaeton, supporting Barcelona, and just occasionally glazing 
							Messi.
            </p>
            <a className="button">Read my CV<span><FaArrowRightLong /></span></a>
          </div>

          <div className="section" id="research">
            <h2>Research</h2>
          </div>

          <div className="section" id="talks-papers">
            <h2>Talks & Papers</h2>
          </div>

          <div className="section" id="academic-journey">
            <h2>Academic Journey</h2>
          </div>

          <div className="section" id="certifications">
            <h2>Certifications</h2>
          </div>
      </main>
    </>
  );
}

export default App;