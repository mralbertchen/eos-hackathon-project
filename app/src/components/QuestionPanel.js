import React, { Component } from 'react';

import Question from './Question';
import questions from '../server/api/data/questions';

export default class QuestionPanel extends Component {
  render() {
    // pick a random question
    const index = Math.max(questions.length - 1, Math.floor(Math.random() * questions.length));
    const question = questions[index];

    return (
      <div className="question-panel">
        <h1>Research</h1>
        <Question data={question} />
      </div>
    );
  }
}
