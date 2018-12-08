import React, { Component } from 'react';
import { Button, Container, Jumbotron, Row, Col } from 'reactstrap';
import styled from 'styled-components';

import LayoutMain from '../src/layouts/main';
import Meta from '../src/components/Meta';
import {
  EarnCredits,
  SequenceYourGenome,
  ReceiveInsight,
  FullVsPartial
} from '../src/components/HomepageGraphics';
import SubscribeForm from '../src/components/SubscribeForm'

const YourGenomeImg = styled.img``;

const Footer = styled.div`
  color: #d1d1d1;
`;

const MarketingSection = styled.div`
  overflow: hidden;
  padding: 100px 20px;
`;

const MarketingH1 = styled.h1`
  color: #d1d1d1;
  font-family: 'Gilroy';
  text-transform: uppercase;
  font-size: 48px;
  letter-spacing: 3px;
  line-height: 1.2;
  margin-bottom: 20px;
`;

const MarketingH3 = styled.div`
  font-family: 'Gilroy';
  text-transform: uppercase;
  font-size: 36px;
  letter-spacing: 1px;
  color: #d1d1d1;
  margin-bottom: 40px;
`;

const ThreePointHeading = styled.div`
  color: #d1d1d1;
  font-family: 'Gilroy';
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
`;

const ThreePointImg = styled.div`
  height: 150px;
  margin-bottom: 30px;
`;

const ThreePointText = styled.div`
  font-family: 'Gilroy';
  font-size: 18px;
  line-height: 1.4;
  color: #d1d1d1;
`;

const BodyText = styled.div`
  font-family: 'Gilroy';
  font-size: 18px;
  line-height: 1.4;
  color: #d1d1d1;
`;

/**
 * Landing page
 */
export default () => {
  return <div>
      <LayoutMain isAnonymous className="layout-main">
        <Meta title="GeneOS" />

        <Container>
          <div style={{ padding: '100px 0 0 0' }}>
            <Row className="d-flex align-items-center">
              <Col className="mb-5 mb-lg-0">
                <MarketingH1>
                  <b>Your DNA,</b>
                  <br />
                  Your health
                </MarketingH1>
                <p
                  style={{
                    color: '#d1d1d1',
                    fontSize: 20,
                    lineHeight: '1.4',
                    fontFamily: 'Gilroy',
                    maxWidth: '42ch',
                    marginBottom: 30
                  }}
                >
                  Earn credits by answering questions about you medical history. Sequence your full genome and get life-changing insight.
                </p>
                <SubscribeForm />
              </Col>
              <Col md="5">
                <img src="/static/hero.svg" className="img-fluid" />
              </Col>
            </Row>
          </div>
        </Container>
        <Container fluid>
          <MarketingSection className="text-center">
            <MarketingH3>
              <b>How it works</b>
            </MarketingH3>
            <Row>
              <Col className="mb-5" md="4">
                <ThreePointImg>
                  <EarnCredits className="mx-auto" />
                </ThreePointImg>
                <ThreePointHeading>Earn credits</ThreePointHeading>
                <ThreePointText>
                  Answer questions about your health to earn valuable credits.
                </ThreePointText>
              </Col>
              <Col className="mb-5" md="4">
                <ThreePointImg>
                  <SequenceYourGenome />
                </ThreePointImg>
                <ThreePointHeading>Sequence your genome</ThreePointHeading>
                <ThreePointText>
                  Sequence your full genome at low-cost.
                </ThreePointText>
              </Col>
              <Col className="mb-5" md="4">
                <ThreePointImg>
                  <ReceiveInsight />
                </ThreePointImg>
                <ThreePointHeading>
                  Change your life
                </ThreePointHeading>
                <ThreePointText>
                  Receive powerful insights to improve your health, diet, physical performance and much more.
                </ThreePointText>
              </Col>
            </Row>
          </MarketingSection>
        </Container>
        <Container fluid className="py-5" style={{backgroundColor: 'rgba(255, 255, 255, 0.05'}}>
          <Row style={{ fontFamily: 'Gilroy', color: '#d1d1d1' }} className="d-flex align-items-center">
            <Col className="pl-0">
              <img src="/static/Full.png" className="img-fluid" />
            </Col>
            <Col className="text-right">
              <div
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  letterSpacing: 1
                }}
              >
                Partial sequencing
              </div>
              <div>
                Services like 23&Me and Ancestry only read a <b>tiny</b> part of your DNA
              </div>
            </Col>
            <Col className="text-center" sm="1">
              <img src="/static/vs.svg" style={{ height: 300 }} />
            </Col>
            <Col className="pr-0">
              <div
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  letterSpacing: 1
                }}
              >
                Full genome sequencing
              </div>
              <div>
                GeneOS reads <b>all your DNA</b> – that's what you need for truly revolutionary insight
              </div>
            </Col>
            <Col>
              <img src="/static/Partial.png" className="img-fluid" />
            </Col>
          </Row>
        </Container>
        <Container fluid className="pr-0 my-5">
          <Row className="d-flex align-items-center">
            <Col sm="6" className="mb-5 mb-sm-0">
              <MarketingH3 className="mb-2">
                <b>
                  Join the genomic revolution
                </b>
              </MarketingH3>
              <SubscribeForm />
            </Col>
            <Col sm="6" className="pr-0">
              <YourGenomeImg src="../static/your_genome.png" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </LayoutMain>
      <Footer className="p-3 text-center" style={{fontFamily: 'Gilroy'}}>
        <img src="/static/geneos-logo.svg" style={{ width: 75 }} className="mb-3" />
        <br />© GeneOS 2018
      </Footer>
    </div>;
};
