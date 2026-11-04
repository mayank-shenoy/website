import headshot from './assets/photo.jpg';
import Lanyard from './component/Lanyard-updated';
import {FaGithub, FaLinkedin, FaOrcid, FaEnvelope, FaArrowRightLong, FaChevronDown } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText, ScrambleTextPlugin } from 'gsap/all';
import { max } from 'three/tsl';
gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);


function App() {
  const [releaseLanyard, setReleaseLanyard] = useState(false);
  const heroRef = useRef(null);
  const lanyardRef = useRef(null);
  const sidebarRef = useRef(null);
  const titleRef = useRef(null);
  const headerRef = useRef(null);
  const tocRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(() => {
    const lanyard = lanyardRef.current;
    const first = document.getElementById('first');
    const shiftx = first.getBoundingClientRect().width;
    const shifty = first.getBoundingClientRect().height;

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
    }, 1);

    const secondSplit = SplitText.create('#second', {
      type: 'chars',
      autoSplit: true,
      onSplit(self) {
        const n = self.chars.length;
        const gap = 0.5 / (n - 2);

        return gsap.from(self.chars, {
          yPercent: 25,
          opacity: 0,
          duration: 3*gap,
          ease: 'power2.out',
          stagger: gap,
          delay: 2,
        });
      },
    });

    tl.add(() => {
      setReleaseLanyard(true);
    }, 2.4);

    tl.add(() => {
      lanyard.classList.remove('invisible');
    }, 2.5);

    return () => {
      secondSplit.revert();
      tl.kill();
    };
  }, []);

  useGSAP(() => {
    const headerSplit = new SplitText(headerRef.current, {type: 'chars'});
    gsap.set(headerSplit.chars, { yPercent: 25, opacity: 0 });
    gsap.set('.toc > *', { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        start: 0,
        end: () => window.innerHeight,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          console.log(self.progress);
          titleRef.current.classList.toggle('invisible', self.progress >= 0.56);
        },
      },   
    });

    tl.to(heroRef.current, {
      width: '25%',
      '--pos': '100%',
      duration: 1,
      ease: 'power2.inOut',
    });

    tl.to(lanyardRef.current, {
      top: '-100%',
      duration: 0.5,
      ease: 'expo.in',
    }, 0.25);

    const tl2 = gsap.timeline({ paused: true });
    tl2.to(headerSplit.chars, {
      yPercent: 0,
      opacity: 1,
      duration: 3*0.25/13,
      ease: 'power2.out',
      stagger: 0.25/13,
    }, 0);

    tl2.to("#introduction-link", {
      scrambleText: {
        text: "Who am I?",
        revealDelay: 0.15,
      },
      opacity: 1,
      duration: 0.25,
      ease: 'none',
    })
      .to("#research-link", {
      scrambleText: {
        text: "Research",
        revealDelay: 0.15,
      },
      opacity: 1,
      duration: 0.25,
      ease: 'none',
    })
      .to("#talks-papers-link", {
      scrambleText: {
        text: "Talks & Papers",
        revealDelay: 0.15,
      },
      opacity: 1,
      duration: 0.25,
      ease: 'none',
    })
      .to("#academic-journey-link", {
      scrambleText: {
        text: "Academic Journey",
        revealDelay: 0.15,
      },
      opacity: 1,
      duration: 0.25,
      ease: 'none',
    })
      .to("#certifications-link", {
      scrambleText: {
        text: "Certifications",
        revealDelay: 0.15,
      },
      opacity: 1,
      duration: 0.25,
      ease: 'none',
    });

    tl2.from(footerRef.current, {
      yPercent: 25,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out',
    },0);

    ScrollTrigger.create({
      start: () => window.innerHeight*0.75,
      end: 'max',
      invalidateOnRefresh: true,
      onEnter: () => tl2.timeScale(1).play(),
      onLeaveBack: () => tl2.timeScale(3).reverse(),
    });
    
    return () => {
      headerSplit.revert();
      tl.kill();
    };
  }, []);
  

  return (
    <>
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
      <div className="hero" id="hero" ref={heroRef}>
        <h1 ref={titleRef}>
          <span id="first">Hello! </span>
          <span id="second">
            I am <br /><em>Mayank Shenoy</em>
          </span>
        </h1>
        {/* <a href="#introduction" className="scroll-icon"><FaChevronDown /></a> */}
      </div>

      <div className="sidebar" id="sidebar" ref={sidebarRef}>
        <div className="header" ref={headerRef}>
          <h2><a href="#top" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });}}>Mayank<br/>Shenoy</a></h2>
        </div>
        <nav className="toc" ref={tocRef}>
          <a href="#introduction" id="introduction-link">Who am I?</a>
          <a href="#research" id="research-link">Research </a>
          <a href="#talks-papers" id="talks-papers-link">Talks & Papers </a>
          <a href="#academic-journey" id="academic-journey-link">Academic Journey </a>
          <a href="#certifications" id="certifications-link">Certifications </a>
        </nav>
        <div className="footer" ref={footerRef}>
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