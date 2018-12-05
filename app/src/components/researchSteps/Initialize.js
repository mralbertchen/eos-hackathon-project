import React from 'react';
import {
  Row,
  Col,
  FormGroup,
  Button,
  Container,
  Card
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider, { createSliderWithTooltip } from 'rc-slider';

import { getListings, requestData } from '../../actions/research';
import { iconCheckCircle } from '../../utils/fontawesome';
import ResearchConfirmation from '../ResearchConfirmation';
import Diamond from '../Diamond';

const SEQUENCE_COST = 1000;
const ACCESS_COST = 100;

const TooltipSlider = createSliderWithTooltip(Slider);

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

  /**
   * +$100 per existing genome
   * +$1000 per sequence * stake * new genomes
   * +$100 * (1 - stake) * new genomes
   * @param listings
   * @returns {{
      existingCost: number,
      newCost: number,
      newAccessCost: number,
      totalCost: number,
    }}
   */
  calculateTotalCost(listings) {
    const { data } = this.props;
    const { required, split } = data;

    const result = {
      existingCost: 0,
      newCost: 0,
      newAccessCost: 0,
      totalCost: 0,
    };

    if (listings && required) {
      const existingGenomes = Math.min(listings.length, required);
      const newGenomes = required - existingGenomes;

      result.existingCost = existingGenomes * ACCESS_COST;
      result.newCost = SEQUENCE_COST * split * newGenomes;
      result.newAccessCost = ACCESS_COST * (1 - split) * newGenomes;

      result.totalCost = result.existingCost + result.newCost + result.newAccessCost;
    }
    return result;
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

  handleSplitChange = (split) => {
    this.emitChange('split', split / 100);
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
    const { totalCost } = this.calculateTotalCost(listings);

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

  renderCost(label, value) {
    return (
      <FormGroup>
        <Row>
          <Col xs={3}>
            <label>{label}</label>
          </Col>
          <Col xs={6}>
            {this.renderSummaryValue(value)}
          </Col>
          <Col xs={3} className="summary-currency">CarbonUSD</Col>
        </Row>
      </FormGroup>
    );
  }

  renderTotal(label, value) {
    return (
      <FormGroup>
        <Row>
          <Col xs={3} className="summary-label">{label}</Col>
          <Col xs={6}>
            {this.renderSummaryValue(value, true)}
          </Col>
          <Col xs={3} className="summary-currency">CarbonUSD</Col>
        </Row>
      </FormGroup>
    );
  }

  renderSummaryValue(value, isTotal) {
    return (
      <div className={isTotal ? 'summary-value-total' : 'summary-value'}>
        <img className="eos-summary-logo" src="/static/carbon-pink.svg" height="40" />
        {typeof value !== 'number' ? 'calculating...' : value.toLocaleString()}
      </div>
    );
  }

  render() {
    const { listings, done } = this.state;
    const { data = {} } = this.props;

    const {
      existingCost,
      newCost,
      newAccessCost,
      totalCost,
    } = this.calculateTotalCost(listings);
    const { required, split } = data;

    if (done) {
      return this.renderConfirmation();
    }

    return <Container>
        <Row className="justify-content-center">
          <Col lg="8">
            <Card>
              <div className="research-step-initialize">
                <FormGroup>
                  <Row>
                    <Col xs={3}>
                      <label>Matching available genomes</label>
                    </Col>
                    <Col xs={8} style={{fontSize: 34}}>{listings && listings.length}</Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row className="d-flex align-items-center">
                    <Col xs={3}>
                      <label>Number of required genomes</label>
                    </Col>
                    <Col xs={6}>
<<<<<<< HEAD
                      <Slider defaultValue={1000} max={5000} onChange={this.handleRequiredChange} trackStyle={{ backgroundColor: '#ff007e' }} railStyle={{ backgroundColor: '#ccc' }} handleStyle={{ backgroundColor: '#ff007e', borderColor: '#ff007e' }} />
=======
                      <Slider
                        value={required}
                        min={1}
                        max={1000}
                        onChange={this.handleRequiredChange}
                        trackStyle={{ backgroundColor: '#ff007e' }}
                        railStyle={{ backgroundColor: '#ccc' }}
                        handleStyle={{ backgroundColor: '#ff007e', borderColor: '#ff007e' }}
                      />
>>>>>>> adb499755d56c605c5b71fe71a1efaf2fc511d43
                    </Col>
                    <Col xs={2}>
                      <input
                        type="text"
                        className="form-control"
                        value={data.required || ''}
                        onChange={event => this.handleRequiredChange(parseInt(event.target.value, 10))}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row className="d-flex align-items-center">
                    <Col xs={3}>
                      <label>Desired license % per GEM</label>
                    </Col>
<<<<<<< HEAD
                    <Col xs={6}>
                      <Slider max={100} defaultValue={25} trackStyle={{ backgroundColor: '#ff007e' }} railStyle={{ backgroundColor: '#ccc' }} handleStyle={{ backgroundColor: '#ff007e', borderColor: '#ff007e' }} />
=======
                    <Col xs={5}>
                      <TooltipSlider
                        value={split * 100}
                        min={0}
                        max={90}
                        onChange={this.handleSplitChange}
                        trackStyle={{ backgroundColor: '#ff007e' }}
                        railStyle={{ backgroundColor: '#ccc' }}
                        handleStyle={{ backgroundColor: '#ff007e', borderColor: '#ff007e' }}
                        marks={{
                          25: '25%',
                          50: '50%',
                          75: '75%',
                        }}
                        tipFormatter={val => `${val}%`}
                      />
>>>>>>> adb499755d56c605c5b71fe71a1efaf2fc511d43
                    </Col>
                    <Col xs={2}>
                      <Diamond />
                    </Col>
                  </Row>
                </FormGroup>
                {this.renderCost('Usage of existing genomes', existingCost)}
                {this.renderCost('Sequencing cost', newCost)}
                {this.renderCost('Usage of new genomes', newAccessCost)}
                {this.renderTotal('Total', totalCost)}
                <Row>
                  <Col>
                    <Button className="submit-button" onClick={this.handleRequestClick}>
                      Pay and start project <FontAwesomeIcon icon={iconCheckCircle} />
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>;
  }
}
