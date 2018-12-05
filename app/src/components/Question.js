import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardFooter } from 'reactstrap';
import { noop } from 'lodash';

export default class Question extends Component {
  static defaultProps = {
    onChange: noop,
  };

  handleAnswer(answer) {
    const { onChange, question } = this.props;
    onChange(question, answer);
  }

  renderAnswer = (answer) => {
    return (
      <Row>
        <Col>
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
            <label for={`answer_${answer}`}>{answer}</label>
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    const { title, answers } = this.props.data;

    return (
      <div className="question">
        <Card data-aos="fade-up" data-aos-delay="300" className="card-dark">
          <CardTitle>{title}</CardTitle>
          <CardBody>
            {answers.map(this.renderAnswer)}
          </CardBody>
          <CardFooter>
            <a>skip question</a>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
