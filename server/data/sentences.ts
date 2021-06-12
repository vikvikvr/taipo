import { Sentence } from '../types/types';

// could have used a JSON file instead
// but wanted to keep typescript's checks

const sentences: Sentence[] = [
  {
    correct:
      'sometimes it is better to just walk away from things and go back to them later when you are in a better frame of mind',
    withMistakes:
      'simetimes ut os berter go jyst walm aqay fron tyings amd fo bacl ti tjem latet whem hou afe on a getter frake if mund'
  },
  {
    correct:
      'he wondered why at 18 he was old enough to go to war but not old enough to buy cigarettes',
    withMistakes:
      'he windered wyy ar 18 ge waz ole enouvh to bo to sar nut bot ols ebough to bug cigaretres'
  },
  {
    correct:
      'someone i know recently combined maple syrup and buttered popcorn thinking it would taste like caramel popcorn',
    withMistakes:
      'someine i knoq redently comgined mapke syrul and butterer popvorn thunking it sould tazte lije caranel popcorm'
  },
  {
    correct:
      'he figured a few sticks of dynamite were easier than a fishing pole to catch fish',
    withMistakes:
      'he fogured a feq stjcks of dymamite sere eaxier tham a foshing poke to carch fizh'
  }
];

export { sentences };
