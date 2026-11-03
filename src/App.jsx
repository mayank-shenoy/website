import headshot from './assets/photo.jpg';
import Lanyard from './component/Lanyard';
import { useEffect, useRef } from 'react';
import './App.css';

function App() {
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
  

  return (
    <>
      <div className="hero" id="hero" ref={heroRef}>
        <div className="lanyard-container" ref={lanyardRef}>
          <Lanyard id="lanyard"
            frontImage={headshot}
            imageFit="contain"
            cardColor="#f3f1eb"
            orientation="portrait"
            finish="holographic"
            cornerRadius={0.25}
            size={0.65}
            // anchor="left"
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
          />
        </div>
        <h1 ref={titleRef}>Hello! I am <br/> Mayank Shenoy</h1>
      </div>

      <div className="sidebar" id="sidebar" ref={sidebarRef}>
        <div className="header">
          {/* <img src={headshot} alt="Mayank Shenoy" /> */}
          <h2>Mayank Shenoy</h2>
        </div>
        <nav className="toc">
          <a href="#introduction">Introduction </a>
          <a href="#research">Research </a>
          <a href="#talks-papers">Talks & Papers </a>
          <a href="#academic-journey">Academic Journey </a>
          <a href="#certifications">Certifications </a>
        </nav>
        <div className="footer">
          <div className="icon-links">
            <a href="github.com/mayankshenoy" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="orcid.org/0000-0002-1234-5678" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-orcid"></i>
            </a>
            <a href="linkedin.com/in/mayankshenoy" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:mayankshenoy@example.com" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
          &copy; Mayank Shenoy <br />
          Last updated November 2026.
        </div>
      </div>

      <main>
          <div className="blank"></div>
          <div className="section" id="introduction">
            <h2>Who am I?</h2>
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