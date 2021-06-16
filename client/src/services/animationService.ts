import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type SnippetName =
  | 'infinite'
  | 'left'
  | 'leftBig'
  | 'right'
  | 'rightBig'
  | 'resetX'
  | 'top'
  | 'topBig'
  | 'bottom'
  | 'bottomBig'
  | 'resetY'
  | 'hidden'
  | 'linear'
  | 'showing';

// used to create TweenVars from multiple, reusable, pieces
export function mix(...snippetNames: SnippetName[]): Vars {
  let mixedVars: Vars = {};

  snippetNames.forEach((name) => {
    const vars = snippets[name];
    mixedVars = { ...mixedVars, ...vars };
  });

  return mixedVars;
}

// collection of TweenVars that can be combined like lego pieces
const snippets: Record<SnippetName, Vars> = {
  // time
  infinite: { repeat: -1, yoyo: true },
  // position
  left: { x: '-1em' },
  leftBig: { x: '-2em' },
  right: { x: '1em' },
  rightBig: { x: '2em' },
  top: { y: '-1em' },
  topBig: { y: '-2em' },
  bottom: { y: '1em' },
  bottomBig: { y: '2em' },
  resetX: { x: 0 },
  resetY: { y: 0 },
  // color and opacity
  hidden: { opacity: 0 },
  showing: { opacity: 1 },
  // easing
  linear: { ease: 'linear' }
};

type Vars = gsap.TweenVars;

// global configuration

gsap.defaults({ ease: 'power3.out', duration: 0.3 });
gsap.registerPlugin(ScrollTrigger);

// prevent animation from stopping when tab is in background
gsap.ticker.lagSmoothing(0);

export { gsap } from 'gsap';
