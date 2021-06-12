import {
  GameState,
  LetterOutcome,
  Player,
  PlayerInfo,
  Sentence
} from '../types/types';
import { find } from 'lodash';

export class Game implements GameState {
  id: string;
  players: Player[] = [];
  sentence: string;
  startedAt: number = 0;
  started: boolean = false;
  typos: number[] = [];
  readonly mistakeBlockDuration = 500;
  constructor(id: string, sentences: Sentence[]) {
    this.id = id;
    // pick random sentence
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const wrongSentence = sentences[randomIndex].withMistakes;
    const rightSentence = sentences[randomIndex].correct;
    this.sentence = wrongSentence;
    // populate typos indexes
    this.sentence.split('').forEach((wrongChar, i) => {
      if (wrongChar !== rightSentence[i]) {
        this.typos.push(i);
      }
    });
  }

  start(): void {
    this.started = true;
  }

  removePlayer(socketId: string): void {
    this.players = this.players.filter((p) => p.socketId !== socketId);
  }

  addPlayer(socketId: string, playerInfo: PlayerInfo): void {
    console.log(`${this.id} > add player | ${playerInfo.email || socketId}`);
    this.players.push({
      letterIndex: 0,
      lastMistakeAt: -Infinity,
      socketId,
      mistakesCount: 0,
      ...playerInfo
    });
  }

  // called every time a player types a letter

  processLetter(letter: string, socketId: string): LetterOutcome {
    letter = letter.toLowerCase();
    const player = find(this.players, { socketId });

    if (!player) {
      // TODO: handle error better
      throw new Error('could not find player in this game');
    }

    const timeDiff = Date.now() - player.lastMistakeAt;

    if (timeDiff < this.mistakeBlockDuration) {
      return 'still-waiting';
    }

    const isValid = letter === this.sentence[player.letterIndex];

    if (!isValid) {
      player.mistakesCount++;
      player.lastMistakeAt = Date.now();
      return 'wrong';
    }

    const moreLetters = player.letterIndex < this.sentence.length - 1;

    if (moreLetters) {
      player.letterIndex++;
      return 'correct';
    }

    return 'game-over';
  }
}
