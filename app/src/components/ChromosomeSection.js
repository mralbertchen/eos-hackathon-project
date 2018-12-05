import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Chromosomes from './Chromosomes';
import Chromosomes2 from './Chromosomes2';

export default () => (
  <section>
    <a name="chromosome" />
    <h1>Your Genome</h1>
    <Card data-aos="fade-up" data-aos-delay="300">
        <Chromosomes />
        <Chromosomes2 />
    </Card>
  </section>
);
