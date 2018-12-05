import React, { Component } from 'react';

import Question from './Question';
import questions from '../server/api/data/questions';

export default class QuestionPanel extends Component {
  state = {
    history: [],
  };

  componentWillMount() {
    this.selectQuestion();
  }

  /**
   * pick a random question
   */
  selectQuestion() {
    let max = 20;

    let index;
    do {
      index = Math.min(questions.length - 1, Math.floor(Math.random() * questions.length));
      max--;
    } while (this.state.history.includes(index) && max > 0);

    // didn't find a new question
    if (max <= 0) return;

    this.setState(state => ({
      question: questions[index],
      history: [...state.history, index],
    }));
  }

  handleAnswer = () => {
    this.selectQuestion();
  };

  render() {
    const { question } = this.state;

    return (
      <div className="question-panel">
        <h1>About you</h1>
        <Question data={question} onChange={this.handleAnswer} />
      </div>
    );
  }
}
