import React, { Component } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { Button, Label, Input, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';

const subscribeUrl = 'https://geneos.us19.list-manage.com/subscribe/post?u=ac93d9bf288611cc53df60c49&id=2e1d8768cd';
const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

export default class SubscribeForm extends Component {
  state = {
    data: {},
    showForm: false,
  };

  handleStartClick = () => {
    this.setState({ showForm: true });
  };

  handleCloseClick = () => {
    this.setState({ showForm: false });
  };

  handleChange(key, val) {
    this.setState(state => {
      return {
        data: {
          ...state.data,
          [key]: val,
        },
      };
    });
  }

  handleSubmit(e, subscribe) {
    const { data } = this.state;

    if (this.isSubmitDisabled()) return;

    subscribe(data);

    e.preventDefault();
  };

  isSubmitDisabled = () => {
    const { data } = this.state;

    return !data.FNAME || !EMAIL_REGEX.test(data.EMAIL);
  };

  renderForm() {
    const { data, showForm } = this.state;

    return (
      <Modal isOpen={showForm}>
        <ModalHeader toggle={this.handleCloseClick}>Sign Up</ModalHeader>
        <ModalBody>
          <MailchimpSubscribe
            url={subscribeUrl}
            render={({ subscribe, status, message }) => (
              <div>
                <form onSubmit={e => this.handleSubmit(e, subscribe)}>
                  <Row>
                    <Col>
                      <Label>First Name</Label>
                      <Input
                        value={data.FNAME}
                        onChange={e => this.handleChange('FNAME', e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>Email</Label>
                      <Input
                        value={data.EMAIL}
                        type="email"
                        onChange={e => this.handleChange('EMAIL', e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button primary disabled={this.isSubmitDisabled()} style={{ float: 'right' }}>
                        Subscribe
                      </Button>
                    </Col>
                  </Row>
                </form>
                {status === 'sending' && <div style={{ color: 'blue' }}>sending...</div>}
                {status === 'error' && <div style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: message }}/>}
                {status === 'success' && <div style={{ color: 'green' }}>Subscribed !</div>}
              </div>
            )}
          />
        </ModalBody>
      </Modal>
    );
  }

  render() {
    const { showForm } = this.state;

    return (
      <div>
        {showForm && this.renderForm()}
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: '#FF3366',
            fontFamily: 'Gilroy',
            textTransform: 'uppercase',
            letterSpacing: 2,
            display: 'inline-block',
            color: '#fff',
            boxShadow: '0 0 20px #FF3366',
            cursor: 'pointer',
          }}
          onClick={this.handleStartClick}
        >
          Start earning credits
        </div>
      </div>
    );
  }
}
