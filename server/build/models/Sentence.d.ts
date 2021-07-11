import mongoose from './database';
import { Sentence as ISentence } from '../types/types';
declare const Sentence: mongoose.Model<ISentence, {}, {}>;
export { Sentence };
