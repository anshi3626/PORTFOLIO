import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import HireMe from './components/HireMe';
import Footer from './components/Footer';
import { prefersReducedMotion } from './lib/motion';

export default function App() {
  const [loaded, setLoaded] = useState(prefersReducedMotion());

  // A short curtain while the page settles, then it lifts. Removed for reduced motion.
  useEffect(() => {
    if (loaded) return;
    const t = window.setTimeout(() => setLoaded(true), 650);
    return () => window.clearTimeout(t);
  }, [loaded]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className={`curtain ${loaded ? 'is-done' : ''}`} aria-hidden="true">
        <span className="mono">ANSHIKA YADAV</span>
      </div>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <HireMe />
      </main>
      <Footer />
    </>
  );
}
