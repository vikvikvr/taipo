import { Howl } from 'howler';

// will not refactor this as I wish to
// keep customization capabilities
// for each separate sound

// paths actually refer to /public/audio

export const swipeRight = new Howl({
  src: '/audio/60027__qubodup__slow-swosh-40.flac'
});

export const correctKey = new Howl({
  src: '/audio/360602__cabled-mess__typewriter-snippet-02.wav'
});

export const wrongKey = new Howl({
  src: '/audio/319590__hybrid-v__shield-bash-impact.wav'
});

export const loading = new Howl({
  src: '/audio/506055__shadydave__hallow-lights-piano-loop.mp3',
  loop: true,
  volume: 0.4
});

export const mouseClick = new Howl({
  src: '/audio/546079__stavsounds__button-selected.wav'
});

export const gameOver = new Howl({
  src: '/audio/270404__littlerobotsoundfactory__jingle-achievement-00.wav'
});

export const countdown = new Howl({
  src: '/audio/426699__fmceretta__i-am-dreaming-or-final-fantasy-menu-kinda-thing.mp3'
});

export const star = new Howl({
  src: '/audio/171671__leszek-szary__success-1.wav'
});

export const valid = new Howl({
  src: '/audio/322930__rhodesmas__success-03.wav'
});

export const background = new Howl({
  src: '/audio/399868__eflexmusic__action-ambiance-orchestral-loop-mixed.wav',
  loop: true
});
