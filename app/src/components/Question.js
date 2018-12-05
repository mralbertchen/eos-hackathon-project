import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

export default class Question extends Component {
  renderAnswer(answer) {
    return (
      <Row>
        <Col>
          <input type="radio" className="form-control" id={`answer_${answer}`} />
        </Col>
        <Col>
          <label for={`answer_${answer}`}>{answer}</label>
        </Col>
      </Row>
    );
  }

  render() {
    const { title, answers } = this.props.data;

    return (
      <div className="question">
        <Card data-aos="fade-up" data-aos-delay="300" className="card-dark">
          <CardTitle>{title}</CardTitle>
          <CardBody>

          </CardBody>
        </Card>
      </div>
    );
  }
}
