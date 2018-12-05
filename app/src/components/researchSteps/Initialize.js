import React from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Container,
  Card
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider, { Range } from 'rc-slider';

import { getListings, requestData } from '../../actions/research';
import { iconCheckCircle } from '../../utils/fontawesome';
import ResearchConfirmation from '../ResearchConfirmation';
import Diamond from '../Diamond';

export default class Initialize extends React.Component {
  state = {
    listings: null,
    loading: false,
    requesting: false,
    done: false,
  };

  componentDidMount() {
    this.loadListings();
  }

  loadListings() {
    this.setState({ loading: true });
    getListings(this.props.data)
      .then(data => {
        this.setState({
          listings: data.data,
          loading: false
        });

      })
      .catch(err => {
        this.setState({
          listings: null,
          error: err.response ? err.response.data : err,
          loading: false
        });
      });
  }

  calculateTotalcost(listings) {
    let totalCost = 0;
    if (listings) {
      totalCost = listings.reduce((cost, user) => {
        const rate = parseFloat(user.rate);
        return cost + (isNaN(rate) ? 0 : rate);
      }, 0);
    }
    return totalCost;
  }

  handleRequestClick = () => {
    const { data } = this.props;

    this.setState({ requesting: true });
    requestData(data).then(() => {
      this.setState({
        requesting: false,
        done: true,
      });
      this.props.jumpToStep(2);
    });
  };

  formatDecimal(num, decimals = 1) {
    return typeof num === 'number' ? num.toFixed(decimals) : '';
  }

  handleRequiredChange = (required) => {
    this.emitChange('required', required);
  };

  handleSplitChange = (range) => {
    this.emitChange('split', [...range]);
  };

  emitChange(name, value) {
    const { onChange, data } = this.props;

    const nextData = {
      ...data,
      [name]: value,
    };

    onChange(nextData);
  }

  renderListing = (listing) => {
    return (
      <tr key={listing.id}>
       
       
        <td>{this.formatDecimal(listing.age, 0)}</td>
        <td>{listing.location}</td>
        <td>{this.formatDecimal(listing.weight, 0)}</td>
        <td>{this.formatDecimal(listing.sleep)}</td>
        <td>{this.formatDecimal(listing.activity)}</td>
        <td>{listing.rate}</td>
      </tr>
    );
  };

  renderListingTable() {
    const { listings, error } = this.state;

    return (
      <table>
        <thead>
        <tr>
          <th>Age</th>
          <th>Location</th>
          <th>Weight</th>
          <th>Sleep Range</th>
          <th>Activity Level</th>
          <th>Rate</th>
        </tr>
        </thead>
        {error ? (
          <tbody><tr><td>Error loading listings!</td></tr></tbody>
        ) : (
          <tbody>{listings && listings.map(this.renderListing)}</tbody>
        )}
      </table>
    );
  }

  renderConfirmation() {
    const { listings } = this.state;
    const { data } = this.props;

    const totalCount = listings.length;
    const totalCost = this.calculateTotalcost(listings);

    const finalData = {
      ...data,
      totalCount,
      totalCost,
    };

    return (
      <div className="research-step-initialize">
        <Row>
          <Col>
            <h4>You're all set.</h4>
          </Col>
        </Row>
        <ResearchConfirmation request={finalData} />
      </div>
    );
  }

  render() {
    const { listings, done } = this.state;
    const { data } = this.props;

    const totalCost = this.calculateTotalcost(listings);

    if (done) {
      return this.renderConfirmation();
    }

    return (
      <Container>
        <Row className="justify-content-center">
          <Col lg="8">
            <Card>
            <div className="research-step-initialize">
              <FormGroup>
                <Row>
                  <Col xs={3}><label>Number of available genomes</label></Col>
                  <Col xs={8}>{listings && listings.length}</Col>
                </Row>
                <Row>
                  <Col xs={3}><label>Number of required genomes</label></Col>
                  <Col xs={6}>
                    <Slider max={1000} onChange={this.handleRequiredChange} />
                  </Col>
                  <Col xs={2}>
                    <input type="text" className="form-control" value={data.required || ''} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={3}><label>G.E.M split</label></Col>
                  <Col xs={5}>
                    <Range
                      max={100}
                      allowCross={false}
                      defaultValue={[10, 70]}
                      value={data.split}
                      onChange={this.handleSplitChange}
                    />
                  </Col>
                  <Col xs={3}><Diamond/></Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <div className="summary-label">Total</div>
                <div className="summary-value">
                <img className="eos-summary-logo" src="/static/eos-pink.svg" height="40" />

                  {totalCost === null ? 'calculating...' : totalCost.toFixed(2)}
                </div>
                <div className="summary-currency">CarbonUSD</div>
              </FormGroup>
              <Row>
                <Col>
                  <Button className="submit-button" onClick={this.handleRequestClick}>
                    Pay and receive data <FontAwesomeIcon icon={iconCheckCircle} />
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
