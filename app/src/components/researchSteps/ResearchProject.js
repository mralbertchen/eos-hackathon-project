import React from 'react';
import { Form, Row, Col, Button, Input, Label } from 'reactstrap';
import { noop } from 'lodash';

import NavRow from './NavRow';
import { Card, Container } from 'reactstrap';

const ETHNICITIES = [
  '',
  'East Asian',
  'European',
  'South Asian',
  'West African',
  'Sub-Saharan African',
  'Native American'
];

const LOCATIONS = [
  '',
  'Blandaberg',
  'East Ashtonborough',
  'Kossview',
  'Los Angeles',
  'New Collin',
  'New York',
  'South Lamontmouth',
];

export default class ResearchProject extends React.Component {
  static defaultProps = {
    onChange: noop,
    data: {},
  };

  isValidated() {
    const { data } = this.props;

    return data.researchName;
  }

  emitChange(name, value) {
    const { onChange, data } = this.props;

    const nextData = {
      ...data,
      [name]: value,
    };

    onChange(nextData);
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.emitChange(name, value);
  };

  renderInput(label, name) {
    const { data } = this.props;

    return (
      <Row className="row-margin">
        <Col xs={3}>
          <Label>{label}</Label>
        </Col>
        <Col xs={8}>
          <Input
            name={name}
            onChange={this.handleChange}
            value={data[name] || ''}
          />
        </Col>
      </Row>
    );
  }

  renderRange(label, name) {
    const { data } = this.props;

    const [from, to] = data[name] || ['', ''];

    return (
      <Row className="row-margin">
        <Col xs={3}>
          <Label>{label}</Label>
        </Col>
        <Col xs={4}>
          <Input
            name={name}
            onChange={e => this.emitChange(name, [e.target.value, to])}
            value={from}
            className="min-val"
          />
        </Col>
        -
        <Col xs={4}>
          <Input
            name={name}
            onChange={e => this.emitChange(name, [from, e.target.value])}
            value={to}
            className="max-val"
          />
        </Col>
      </Row>
    );
  }

  renderSelect(label, name, options) {
    const { data } = this.props;

    return (
      <Row className="row-margin">
        <Col xs={3}>
          <Label>{label}</Label>
        </Col>
        <Col lg={8}>
          <Input
            name={name}
            type="select"
            onChange={this.handleChange}
            value={data[name] || ''}
          >
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Input>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col lg="8">
            <Card>
              <Form>
                {this.renderInput('Project Name', 'researchName')}
                {this.renderSelect('Genetics', 'ethnicity', ETHNICITIES)}
                {this.renderRange('Age', 'ageRange')}
                {this.renderSelect('Location', 'location', LOCATIONS)}
                {this.renderRange('Weight Range', 'weightRange')}
                {this.renderRange('Sleep Range', 'sleepRange')}
                {this.renderRange('Activity Level', 'activityRange')}
              </Form>
              <NavRow step={0} jumpToStep={step => this.isValidated() && this.props.jumpToStep(step)} />
            </Card>
          </Col>
        </Row>
      </Container>

    );
  }
}
