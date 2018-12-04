import React, { Component } from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import LayoutMain from '../src/layouts/main';
import Meta from '../src/components/Meta';
import { getMyItems } from '../src/actions/my';
import { DataUpload } from '../src/components/DataUpload';

/**
 * Internal page for managing user data / data upload
 */
export default class extends Component {
  render() {
    return (
      <LayoutMain>
        <Meta title="GeneOS data upload" />

        <Container className="my-geneos-page">
          <h1>Genome data upload</h1>
          <DataUpload/>
        </Container>
      </LayoutMain>
    );
  }
}
