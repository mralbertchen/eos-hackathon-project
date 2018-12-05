import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardFooter } from 'reactstrap';
import { noop } from 'lodash';
import cx from 'classnames';

export default class Question extends Component {
  static defaultProps = {
    onChange: noop,
  };

  handleAnswer(answer) {
    const { onChange, question } = this.props;
    onChange(question, answer);
  }

  handleSkip = () => {
    const { onSkip } = this.props;
    onSkip();
  };

  renderAnswer = (answer) => {
    const key = `${answer}_${(Math.random() * 1000).toFixed(0)}`;

    return (
      <div key={key}>
          <div className="answer-radio">
            <input
              type="radio"
              name="answer"
              className="form-control"
              id={`answer_${answer}`}
              onClick={() => this.handleAnswer(answer)}
            />
          </div>
          <div className="answer-label">
            <label htmlFor={`answer_${answer}`}>{answer}</label>
          </div>
      </div>
    );
  };

  render() {
    const { className, data } = this.props;
    const { title, answers } = data;

    const classes = cx('question', className);

    return (
      <div className={classes}>
        <Card data-aos="fade-up" data-aos-delay="300" className="card-dark">
          <CardBody>
            <h5 style={{fontWeight: 300, lineHeight: 1.4}}>{title}</h5>
            {answers.map(this.renderAnswer)}
          </CardBody>
          <CardFooter className="text-right">
            <a className="btn btn-default" onClick={this.handleSkip}>Skip</a>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
