import React, { Component } from 'react';
import { Button,Container, Jumbotron, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import LayoutMain from '../src/layouts/main';
import Meta from '../src/components/Meta';
import { getMyItems } from '../src/actions/my';
import DataPanelList from '../src/components/DataPanelList';
import {EarnCredits, SequenceYourGenome, ReceiveInsight, FullVsPartial} from '../src/components/HomepageGraphics';

const YourGenomeImg = styled.img`
  width: 75%;
  position: absolute;
  right: -25%;
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
  margin-bottom: 30px;
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
  return <LayoutMain isAnonymous>
      <Meta title="GeneOS" />

      <Container>
        <div style={{ padding: '150px 0 100px 0' }}>
          <Row className="d-flex align-items-center">
            <Col>
              <MarketingH1>
                The future of health
                <br />
                <b>is in your DNA</b>
              </MarketingH1>
              <p style={{ color: '#d1d1d1', fontSize: 20, lineHeight: '1.4', fontFamily: 'Gilroy', width: '42ch', marginBottom: 30 }}>
                Get rewarded by contributing to medical breakthroughs. Understand your genes. Own your health data.
              </p>
              <div
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#FF3366',
                  fontFamily: 'Gilroy',
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  display: 'inline-block',
                  color: '#fff',
                  boxShadow: '0 0 20px #FF3366'
                }}
              >
                Start earning credits
              </div>
            </Col>
            <Col lg="5">
              <img src="/static/hero.svg" className="img-fluid" />
            </Col>
          </Row>
        </div>
      </Container>
      <Container fluid>
        <MarketingSection className="text-center">
          <MarketingH3>How it works</MarketingH3>
          <Row>
            <Col>
              <ThreePointImg>
                <EarnCredits />
              </ThreePointImg>
              <ThreePointHeading>Earn credits</ThreePointHeading>
              <ThreePointText>
                Answer survey questions, get credits, and redeem them for
                valuable rewards.
              </ThreePointText>
            </Col>
            <Col>
              <ThreePointImg>
                <SequenceYourGenome />
              </ThreePointImg>
              <ThreePointHeading>Sequence your genome</ThreePointHeading>
              <ThreePointText>
                Understand your genome, explore your ancestry, and learn about
                your inherited traits for just $99.
              </ThreePointText>
            </Col>
            <Col>
              <ThreePointImg>
                <ReceiveInsight />
              </ThreePointImg>
              <ThreePointHeading>
                Receive life-changing insight
              </ThreePointHeading>
              <ThreePointText>
                Receive insights, analytics, and rewards for you
                contributions.
              </ThreePointText>
            </Col>
          </Row>
        </MarketingSection>
      </Container>
      <div style={{ backgroundColor: '#fff', padding: '60px 0' }}>
        <FullVsPartial />
      </div>
      <Container>
        <div style={{ width: '50%', float: 'left' }}>
          <MarketingH3>
            Become one of the first to <b>
              profit from your own genomic data
            </b>
          </MarketingH3>
          <BodyText class>
            Get sequenced. Discover your DNA and ancestry.
          </BodyText>
          <div
            style={{
              padding: '10px 20px',
              backgroundColor: '#FF3366',
              fontFamily: 'Gilroy',
              textTransform: 'uppercase',
              letterSpacing: 2,
              display: 'inline-block',
              color: '#fff',
              boxShadow: '0 0 20px #FF3366'
            }}
          >
            Start earning credits
          </div>
        </div>
        <YourGenomeImg src="../static/your_genome.png" />
      </Container>
    </LayoutMain>;
};
