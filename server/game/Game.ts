import { GameState, LetterOutcome, Player, Sentence } from '../types/types';

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

  addPlayer(
    username: string,
    socketId: string,
    imageUrl: string,
    id: string
  ): void {
    console.log(`${this.id} > add player | ${username}`);
    this.players.push({
      username,
      letterIndex: 0,
      lastMistakeAt: -Infinity,
      socketId,
      mistakesCount: 0,
      imageUrl,
      id
    });
  }

  // called every time a player types a letter

  processLetter(username: string, letter: string): LetterOutcome {
    letter = letter.toLowerCase();
    const player = this.players.find((p) => p.username === username)!;

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
