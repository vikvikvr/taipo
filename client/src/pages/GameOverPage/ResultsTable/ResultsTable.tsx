import './ResultsTable.scss';
import React from 'react';
import { GameResult } from '../../../../../server/types/types';
import { ResultRow } from './ResultRow/ResultRow';
import { useAnimation } from './ResultsTable.gsap';

interface Props {
  result: GameResult;
}

export function ResultsTable({ result }: Props) {
  useAnimation();

  const { loserResult, winnerResult } = result;

  return (
    <div className="results-table">
      <p className="sentence header">Sentence</p>
      <p className="taipos header">Taipos</p>
      <ResultRow playerResult={winnerResult} isWinner />
      {loserResult && <ResultRow playerResult={loserResult} />}
    </div>
  );
}
