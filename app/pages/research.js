import React, { Component } from 'react'
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import StepZilla from 'react-stepzilla';

import LayoutMain from '../src/layouts/main';
import Meta from '../src/components/Meta'
import { requestData } from '../src/actions/research';
import ProjectDetails from '../src/components/researchSteps/ProjectDetails';
import SampleSelection from '../src/components/researchSteps/SampleSelection';
import Initialize from '../src/components/researchSteps/Initialize';

export default class extends Component {
  static propTypes = {
    data: PropTypes.shape({})
  };

  state = {
    audience: null,
    form: {
      duration: '3 Months',
      payout: 25,
      researchArea: 'Cancer',
    },
    requesting: false,
  };

  handleRequestClick = () => {
    const { form } = this.state;

    this.setState({ requesting: true });
    requestData(form).then(() => {
      this.setState({ requesting: false })
    });
  };

  handleStepChange = (step) => {
    if (step === 2) {
      this.handleRequestClick();
    }
  };

  handleChange = (form) => {
    this.setState({
      form,
    });
  };

  render() {
    const { form } = this.state;

    const steps = [
      { name: 'Project Details', component: <ProjectDetails data={form} onChange={this.handleChange} /> },
      { name: 'Sample Selection', component: <SampleSelection data={form} onChange={this.handleChange} /> },
      { name: 'Initialize', component: <Initialize data={form} /> },
    ];

    return (
      <LayoutMain>
        <Meta title="Research" />

        <Container>
          <StepZilla
            steps={steps}
            showSteps
            showNavigation
            stepsNavigation={false}
            prevBtnOnLastStep={false}
            preventEnterSubmission
            nextTextOnFinalActionStep="Request data"
            onStepChange={this.handleStepChange}
          />
        </Container>
      </LayoutMain>
    );
  }
}
