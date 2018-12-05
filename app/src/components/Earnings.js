import React from 'react';
import CountUp from 'react-countup';

import TransactionsStore from '../store/transactions';

export default class Earnings extends React.Component {
  state = {
    lastEarnings: 0,
    earnings: 0,
  };

  componentDidMount() {
    this.updateEarnings();
    this.mounted = true;
    TransactionsStore.on('change', this.updateEarnings);
  }

  componentWillUnmount() {
    this.mounted = false;
    TransactionsStore.removeListener('change', this.updateEarnings);
  }

  updateEarnings = () => {
    if (!this.mounted) return;

    this.setState({
      lastEarnings: this.state.earnings || 0,
      earnings: TransactionsStore.earnings,
    });
  };

  render() {
    const { lastEarnings } = this.state;

    return (
      <div className="d-flex align-items-center earnings">
        <img
          src="/static/carbon-logo.svg"
          style={{ width: 25, marginRight: 10 }}
        />
        <div>
          <div>
            <CountUp
              component="span"
              start={lastEarnings}
              end={TransactionsStore.earnings}
              className="text-white"
              duration={2}
              formattingFn={val => val.toLocaleString()}
            />
            <span className="currency">cUSD</span>
          </div>
          <div className="card-heading white-text">available</div>
        </div>
      </div>
    );
  }
}
