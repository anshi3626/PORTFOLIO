import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register once for the whole app. Calling this more than once is harmless.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
