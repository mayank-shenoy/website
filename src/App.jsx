import Lanyard from './component/Lanyard-updated';
import {FaGithub, FaLinkedin, FaOrcid, FaEnvelope, FaArrowRightLong, FaChevronDown, FaGit, FaGitAlt, FaGithubAlt, FaGoogle } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import './App.css';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText, ScrambleTextPlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';


function App() {
  const [releaseLanyard, setReleaseLanyard] = useState(false);
  const heroRef = useRef(null);
  const lanyardRef = useRef(null);
  const sidebarRef = useRef(null);
  const titleRef = useRef(null);
  const headerRef = useRef(null);
  const tocRef = useRef(null);
  const footerRef = useRef(null);
  const mainRef = useRef(null);


  useGSAP(() => {
    // SMOOTH SCROLL
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    const ticker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);


    // INTRO HERO ANIMATION
    const lanyard = lanyardRef.current;
    const first = document.getElementById('first');
    const shiftx = first.getBoundingClientRect().width;
    const shifty = first.getBoundingClientRect().height;

    const tl_hero = gsap.timeline();

    tl_hero.fromTo(titleRef.current, {
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

    tl_hero.to(titleRef.current, {
      x: 0,
      duration: 0.75,
      ease: 'power2.out',
    }, 1);

    const secondSplit = SplitText.create('#second', {
      type: ' words, chars',
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
          delay: 1.75,
        });
      },
    });

    tl_hero.add(() => {
      setReleaseLanyard(true);
    }, 2.25);

    tl_hero.add(() => {
      lanyard.classList.remove('invisible');
    }, 2.5);


    // HERO TO SIDEBAR ANIMATION
    const link1 = document.getElementById('introduction-link');
    const posY = link1.getBoundingClientRect().top + link1.getBoundingClientRect().height;
    let posPercent = posY / window.innerHeight * 100;

    const headerSplit = new SplitText(headerRef.current, {type: 'chars'});
    gsap.set(headerSplit.chars, { yPercent: 25, opacity: 0});
    gsap.set('.toc > *', { opacity: 0, visibility: 'hidden' });

    const tl = gsap.timeline({
      scrollTrigger: {
        start: 0,
        end: () => window.innerHeight,
        scrub: true,
        invalidateOnRefresh: true,
        pin: ".pinned", 
        snap: {
          snapTo: 1,
          directional: false,
          inertia: true,
          delay: 0.05,

          ease: "power2.inOut",
        },
      },   
    });

    tl.to(heroRef.current, {
      width: '25%',
      '--pos': '100%',
      '--ht': '2rem',
      '--t': `${posPercent}%`,
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
      visibility: 'visible',
    }, 0);

    tl2.to("#introduction-link", {
      scrambleText: {
        text: "Who am I?",
        revealDelay: 0.1,
      },
      opacity: 1,
      visibility: 'visible',
      duration: 0.15,
      ease: 'none',
    }, 0.35)
      .to("#research-link", {
      scrambleText: {
        text: "Research",
        revealDelay: 0.1,
      },
      opacity: 1,
      visibility: 'visible',
      duration: 0.15,
      ease: 'none',
    })
      .to("#talks-papers-link", {
      scrambleText: {
        text: "Talks & Papers",
        revealDelay: 0.1,
      },
      opacity: 1,
      visibility: 'visible',
      duration: 0.15,
      ease: 'none',
    })
      .to("#projects-link", {
      scrambleText: {
        text: "Projects",
        revealDelay: 0.1,
      },
      opacity: 1,
      visibility: 'visible',
      duration: 0.15,
      ease: 'none',
    })
      .to("#academic-journey-link", {
      scrambleText: {
        text: "Academic Journey",
        revealDelay: 0.1,
      },
      opacity: 1,
      visibility: 'visible',
      duration: 0.15,
      ease: 'none',
    })
      .to("#certifications-link", {
      scrambleText: {
        text: "Certifications",
        revealDelay: 0.1,
      },
      opacity: 1,
      visibility: 'visible',
      duration: 0.15,
      ease: 'none',
    });

    tl2.from(footerRef.current, {
      yPercent: 25,
      opacity: 0,
      visibility: 'hidden',
      duration: 0.25,
      ease: 'power2.out',
    },0);

    ScrollTrigger.create({
      start: () => window.innerHeight*0.75,
      end: 'max',
      invalidateOnRefresh: true,
      onEnter: () => tl2.timeScale(1).play(),
      onLeaveBack: () => tl2.timeScale(8).reverse(),
    });


    // RESEARCH CAROUSEL ANIMATION
    const carousel1 = document.querySelector('#carousel-1');
    const carouselPos = (frac) => {
      const rect = carousel1.getBoundingClientRect();
      return `${(rect.left + rect.width * frac) / window.innerWidth * 100}%`;
    };

    // CAROUSEL 1
    const track1 = gsap.to('#track-1', {
      xPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '#carousel-1',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    const cards1 = gsap.utils.toArray('#track-1 .card');
    cards1.forEach((card) => {
      gsap.set(card, { scale: 0.85 });

      gsap.to(card, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          containerAnimation: track1,
          horizontal: true,
          start: () => `12.5% ${carouselPos(0.875)}`,
          end: () => `44% ${carouselPos(0.5)}`,
          scrub: true,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });

      gsap.fromTo(card, {
        scale: 1,
      }, {
        scale: 0.85,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: card,
          containerAnimation: track1,
          horizontal: true,
          start: () => `67% ${carouselPos(0.5)}`,
          end: () => `56% ${carouselPos(0.125)}`,
          scrub: true,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });
    });

    // CAROUSEL 2
    const track2 = gsap.from('#track-2', {
      xPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '#carousel-2',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    const cards2 = gsap.utils.toArray('#track-2 .card');
    cards2.forEach((card) => {
      gsap.set(card, { scale: 0.85 });

      gsap.to(card, {
        scale: 1,

        ease: 'none',
        scrollTrigger: {
          trigger: card,
          containerAnimation: track2,
          horizontal: true,
          start: () => `87.5% ${carouselPos(0.125)}`,
          end: () => `56% ${carouselPos(0.5)}`,
          scrub: true,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });

      gsap.fromTo(card, {
        scale: 1,
      }, {
        scale: 0.85,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: card,
          containerAnimation: track2,
          horizontal: true,
          start: () => `33% ${carouselPos(0.5)}`,
          end: () => `44% ${carouselPos(0.875)}`,
          scrub: true,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });
    });


    // STROKE PATH ANIMATION
    const strokePath = document.getElementById('stroke-path');
    const pathLength = strokePath.getTotalLength();
    strokePath.style.strokeDasharray = pathLength;
    strokePath.style.strokeDashoffset = pathLength;

    gsap.to(strokePath, {
      strokeDashoffset: 0,
      ease: 'power1.in',
      scrollTrigger: {
        trigger: '#academic-journey',
        start: 'top 75%',
        end: 'bottom bottom',
        scrub: true,
        markers: true,
      },
    });

  });


  return (
    <>
    {/* LANYARD */}
      <div className="lanyard-container invisible" ref={lanyardRef}>
        <Lanyard id="lanyard" ref={lanyardRef}
          frontImage={"../public/photo.jpg"}
          backImage= {"../public/photo.jpg"}
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

    {/* NOISE TEXTURE */}
    <div className="noise" aria-hidden="true" />

    {/* HERO SECTION */}
      <div className="hero" id="hero" ref={heroRef}>
        <h1 ref={titleRef}>
          <span id="first">Hello! </span>
          <span id="second">
            I am <br /><em>Mayank Shenoy</em>
          </span>
        </h1>
        {/* <a href="#introduction" className="scroll-icon"><FaChevronDown /></a> */}
      </div>

    {/* SIDEBAR */}
      <div className="sidebar" id="sidebar" ref={sidebarRef}>
        <div className="header hidden" ref={headerRef}>
          <h2><a href="#top">Mayank<br/>Shenoy</a></h2>
        </div>
        <nav className="toc" ref={tocRef}>
          <a href="#introduction" id="introduction-link">Who am I?</a>
          <a href="#research" id="research-link">Research </a>
          <a href="#talks-papers" id="talks-papers-link">Talks & Papers </a>
          <a href="#projects" id="projects-link">Projects </a>
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

    {/* MAIN CONTENT */}
      <main ref={mainRef} id="main">
          {/* <div className="blank"></div> */}

        {/* INTRODUCTION */}
          <div className="section pinned" id="introduction">
            <p className="tag">01/06</p>
            <h2>Who am I?</h2>
            <p>
              I am a computational astrophysicist and graduate student at Imperial College London <img className="static-img" src="../public/imperial.svg" alt="Imperial College London" />, where I'm finishing my 
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

        {/* RESEARCH */}
          <div className="section pinned" id="research">
            <p className="tag">02/06</p>
            <h2>Research</h2>
            <div className="project">
              <div className="project-info">
                <h3 className="project-title">
                  <a href="">Radiatively Cooled Magnetic Reconnection in Semi-Relativistic Electron-Ion Plasmas <span aria-hidden="true"> <FaArrowRightLong /></span> </a>
                </h3>
                  {/* <p className="project-desc">
                    Investigating the role of radiative cooling on the energy distribution and resulting spectra from magnetic 
                    reconnection in semi-relativistic electron-ion plasmas with magnetisation relevant to the coronae of 
                    supermassive black holes found at the ecentre of Active Galacitic Nuclei (AGN).
                  </p> */}
                <div className="pill">
                  <span>PIC</span> <span>Tristan-MPv2</span> <span>Fortran</span> <span>Python</span> <span>h5py</span> <span>HPC</span> 
                </div>
              </div>
              <div className="carousel" id="carousel-1">
                <div className="track" id="track-1">
                  <div className="card">1</div>
                  <div className="card">2</div>
                  <div className="card">3</div>
                  <div className="card">1</div>
                  <div className="card">2</div>
                  <div className="card">3</div>
                </div>
              </div>
						</div>

            <div className="project">
              <div className="project-info">
                <h3 className="project-title">
                  <a href="">Reconnection-driven Flux Eruptions in Wind-fed Accretion Flows on Sagittarius A* <span aria-hidden="true"> <FaArrowRightLong /></span> </a>
                </h3>
                {/* <p className="project-desc">
                  Investigating the role of radiative cooling on the energy distribution and resulting spectra from magnetic 
                  reconnection in semi-relativistic electron-ion plasmas with magnetisation relevant to the coronae of 
                  supermassive black holes found at the ecentre of Active Galacitic Nuclei (AGN).
                </p> */}
                <div className="pill">
                  <span>GRMHD</span> <span>Athena++</span> <span>C++</span> <span>Python</span> <span>yt</span> <span>HPC</span> 
                </div>
              </div>
              <div className="carousel" id="carousel-2">
                <div className="track" id="track-2">
                  <div className="card">1</div>
                  <div className="card">2</div>
                  <div className="card">3</div>
                  <div className="card">4</div>
                  <div className="card">1</div>
                  <div className="card">2</div>
                  <div className="card">3</div>
                  <div className="card">4</div>
                </div>
              </div>
						</div>
          </div>

        {/* TALKS & PAPERS */}
          <div className="section pinned alt" id="talks-papers">
            <p className="alt-tag">03/06</p>
            <h2>Talks & Papers</h2>
          </div>

        {/* PROJECTS */}
          <div className="section pinned" id="projects">
            <p className="tag">04/06</p>
            <h2>Projects</h2>
            <div className="project">
              <div className="project-info">
                <h3 className="project-title">
                  <a href=""> Signal Classification with Convolutional Neural Networks <span className="external-link" aria-hidden="true"> <FaGithub/></span> </a>
                </h3>
                <div className="pill">
                  <span>PyTorch</span> <span>scikit-learn</span> <span>NumPy</span> <span>SciPy</span> <span>Python</span>
                </div>
              </div>
              <p className="project-desc">
                I built a 1D convolutional neural network using PyTorch to distinguish between electron and neutron scintillation signals, 
                experimenting with its architecture to better capture waveform differences and achieve a test accuracy of 99.3% and 0.997 ROC AUC.
              </p>
						</div>

            <div className="project">
              <div className="project-info">
                <h3 className="project-title">
                  <a href=""> Boson Decay Classification with Gradient Boosted Decision Trees  <span className="external-link" aria-hidden="true"> <FaGithub/></span> </a>
                </h3>
                <div className="pill">
                  <span>XGBoost</span> <span>scikit-learn</span> <span>Pandas</span> <span>NumPy</span> <span>Python</span>
                </div>
              </div>
              <p className="project-desc">
                I used XGBoost to classify Higgs boson decay events in simulated LHC data with a statistical precision of 5%, further classifying 
                their individual production channels, gluon-gluon and vector boson fusion, with a precision of 9% and 19% respectively.
              </p>
						</div>
          </div>       

          {/* ACADEMIC JOURNEY */}
          <div className="section pinned alt" id="academic-journey">
            <p className="alt-tag">05/06</p>
            <h2>Academic Journey</h2>

            <div className="imperial">

            </div>
            <div className="toronto">

            </div>

            <div className="svg-path">
                <svg width="105" height="400" viewBox="0 0 105 405" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="stroke-path" d="M59.9099 2.5
                    C59.9099 2.5 59.3602 75.7807 54.5 100.054
                    C45 147.5 4.24952 155.423 2.5582 197.446
                    C0.866881 239.469 36.5389 254.488 44.2262 262.225
                    C56.925 275.006 53.2979 304.946 58.3719 304.946
                    C60.3915 304.946 61.5829 277.171 62.0722 243.732
                    C62.8122 193.16 61.9462 129.633 59.9099 129.633
                    C56.5273 129.633 61.5738 153.37 49.6077 157.699
                    C38.4857 161.723 16.3963 170.47 16.3963 199.5
                    C16.3963 226.948 42.1896 242.156 62.0722 243.732
                    C63.2182 243.823 64.3445 243.869 65.4452 243.869
                    C87.7683 240.954 102.5 220.066 102.5 199.5
                    C102.5 177.5 83.2809 167.863 76.8232 157.699
                    C70.3654 147.535 70.2116 115.221 67.4435 115.221
                    C64.357 115.221 69.7399 143.468 70.2116 202.149
                    C70.3023 213.428 69.9605 227.774 69.3491 243.59
                    C68.0645 243.774 66.7619 243.869 69.3491 243.59
                    C66.7795 310.058 59.4487 400 59.4487 400" stroke-width="5" stroke-linecap="round" stroke="#F7F7F2"/>
                </svg>
            </div>
          </div>

          {/* CERTIFICATIONS */}
          <div className="section pinned" id="certifications">
            <p className="tag">06/06</p>
            <h2>Certifications</h2>
            <div className="cert-wrapper">
              <div className="cert">
                <img className="cert-icon" alt="PennyLane Codebook" />
                <h4 className="cert-title">
                  PennyLane Codebook
                </h4>
              </div>
              <div className="cert">
                < img className="cert-icon" alt="Google" />
                <h4 className="cert-title">
                  Google AI Essentials
                </h4>
              </div>
              <div className="cert">
                <img className="cert-icon" alt="IBM" />
                <h4 className="cert-title">
                  Databases and SQL for Data Science with Python
                </h4>
              </div>
            </div>
          </div>
      </main>
    </>
  );
}

export default App;