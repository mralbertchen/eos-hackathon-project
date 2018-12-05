import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Chromosomes from './Chromosomes';

export default () => (
  <section>
    <a name="chromosome" />
    <h1>Genome</h1>
    <Card data-aos="fade-up" data-aos-delay="300">
      <CardBody>
        <Chromosomes />
      </CardBody>
    </Card>
  </section>
);
