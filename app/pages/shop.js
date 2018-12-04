import React, { Component } from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import LayoutMain from '../src/layouts/main';
import Meta from '../src/components/Meta';
import { getMyItems } from '../src/actions/my';
import { DataUpload } from '../src/components/DataUpload';

/**
 * User marketplace
 */
export default class extends Component {
  render() {
    return (
      <LayoutMain>
        <Meta title="Marketplace" />

        <Container className="shop-page">
          <h1>Marketplace</h1>
        </Container>
      </LayoutMain>
    );
  }
}
