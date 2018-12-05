import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import Question from './Question';
import questions from '../server/api/data/questions';

export default class QuestionPanel extends Component {
  state = {
    show: false,
    question: null,
    history: [],
  };

  componentWillMount() {
    this.selectQuestion();
  }

  /**
   * pick a random question
   */
  selectQuestion = () => {
    let max = 20;

    let index;
    do {
      index = Math.min(questions.length - 1, Math.floor(Math.random() * questions.length));
      max--;
    } while (this.state.history.includes(index) && max > 0);

    // didn't find a new question
    if (max <= 0) return;

    this.setState(state => ({
      show: true,
      question: questions[index],
      history: [...state.history, index],
    }));
  };

  handleAnswer = () => {
    this.setState({ show: false });
  };

  handleSkip = () => {
    this.setState({ show: false });
  };

  render() {
    const { show, question } = this.state;

    return (
      <div className="question-panel">
        <h1>Research</h1>
        <CSSTransition
          key={question}
          in={show}
          timeout={300}
          classNames="react-fade"
          unmountOnExit
          onExited={this.selectQuestion}
        >
          <Question
            className="react-fade"
            data={question}
            onChange={this.handleAnswer}
            onSkip={this.handleSkip}
          />
        </CSSTransition>
      </div>
    );
  }
}
