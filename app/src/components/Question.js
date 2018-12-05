import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

export default class Question extends Component {
  render() {
    const { title, answers } = this.props.data;

    return (
      <div>
        <Card data-aos="fade-up" data-aos-delay="300">
          <CardTitle>{title}</CardTitle>
          <CardBody>

          </CardBody>
        </Card>
      </div>
    );
  }
}
