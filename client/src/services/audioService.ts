import { Howl } from 'howler';
import * as sounds from 'assets/audio/sounds';

type SoundName =
  | 'swipeRight'
  | 'correctKey'
  | 'wrongKey'
  | 'loading'
  | 'mouseClick'
  | 'gameOver'
  | 'countdown'
  | 'star'
  | 'valid'
  | 'readyFemale'
  | 'setFemale'
  | 'goFemale'
  | 'background';

const fadeDuration = 500;
const debug = true;

export function playSound(name: SoundName, delaySeconds = 0) {
  const howl = soundsMap[name];
  setTimeout(() => {
    debug && console.log('🔊🔊🔊', name);
    howl.play();
  }, delaySeconds * 1_000);
}

export function fadeInSound(name: SoundName, delaySeconds = 0, play = true) {
  const howl = soundsMap[name];
  const currentVolume = howl.volume();
  setTimeout(() => {
    debug && console.log('🔈🔉🔊', name);
    howl.volume(0);
    if (play) {
      howl.play();
    }
    howl.fade(0, currentVolume, fadeDuration);
  }, delaySeconds * 1_000);
}

export function fadeOutSound(name: SoundName, delaySeconds = 0, stop = true) {
  const howl = soundsMap[name];
  const currentVolume = howl.volume();
  setTimeout(() => {
    debug && console.log('🔊🔉🔈', name);
    howl.fade(currentVolume, 0, fadeDuration);
    howl.on('fade', () => {
      // restore original volume, for next time it's played
      howl.volume(currentVolume);
      howl.off();
      if (stop) {
        howl.stop();
      }
    });
  }, delaySeconds * 1_000);
}

const soundsMap: Record<SoundName, Howl> = {
  swipeRight: sounds.swipeRight,
  correctKey: sounds.correctKey,
  wrongKey: sounds.wrongKey,
  loading: sounds.loading,
  mouseClick: sounds.mouseClick,
  gameOver: sounds.gameOver,
  countdown: sounds.countdown,
  star: sounds.star,
  valid: sounds.valid,
  background: sounds.background,
  readyFemale: sounds.readyFemale,
  setFemale: sounds.setFemale,
  goFemale: sounds.goFemale
};

// to avoid weird behaviours on reload
function stopAllSounds() {
  Object.values(soundsMap).forEach((howl) => {
    howl.stop();
  });
}

stopAllSounds();
