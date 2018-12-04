import React, { Component } from 'react'
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import StepZilla from 'react-stepzilla';

import LayoutMain from '../src/layouts/main';
import Meta from '../src/components/Meta'
import ResearchProject from '../src/components/researchSteps/ResearchProject';
import Initialize from '../src/components/researchSteps/Initialize';

export default class extends Component {
  static propTypes = {
    data: PropTypes.shape({})
  };

  state = {
    audience: null,
    form: {
      researchName: 'NYU School of Medicine',
      researchArea: 'Alzheimer\'s Disease ',
      duration: '3 Months',
      ageRange: [30, 110],
      weightRange: [1, 300],
      sleepRange: [0, 10],
      activityRange: [0, 10],
    },
  };

  handleChange = (form) => {
    this.setState({
      form,
    });
  };

  render() {
    const { form } = this.state;

    const steps = [
      {
        name: <div className="step-head">Step 1<div className="step-sub">Project Details</div></div>,
        component: <ResearchProject data={form} onChange={this.handleChange} />,
      },
      {
        name: <div className="step-head">Step 2<div className="step-sub">Initialize</div></div>,
        component: <Initialize data={form} />
      },
    ];

    return (
      <LayoutMain>
        <Meta title="Research" />

        <Container className="research-page research-wizard">
          <StepZilla
            steps={steps}
            showSteps
            showNavigation={false}
            stepsNavigation={false}
            prevBtnOnLastStep={false}
            preventEnterSubmission
            backButtonText="<- BACK"
            nextButtonText="NEXT ->"
            nextTextOnFinalActionStep="pay and receive data"
          />
        </Container>
      </LayoutMain>
    );
  }
}
