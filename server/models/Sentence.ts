import mongoose from './database';
import { Sentence as ISentence } from '../types/types';
import { sentences } from '../data/sentences';

const sentenceSchema = new mongoose.Schema<ISentence>({
  correct: String,
  withMistakes: String
});

const Sentence = mongoose.model<ISentence>('Sentence', sentenceSchema);

// populates database with sentences if needed
// useful when testing locally on a different machine
async function saveSentencesIfEmpty() {
  try {
    const { length } = await Sentence.find();
    if (!length) {
      await Sentence.create(sentences);
      console.log('database populated with sentences');
    }
  } catch (error) {
    console.log('failed to populate database');
  }
}

saveSentencesIfEmpty();

export { Sentence };
