import React, { Component } from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import LayoutMain from '../src/layouts/main';
import Meta from '../src/components/Meta';
import { getMyItems } from '../src/actions/my';
import DataPanelList from '../src/components/DataPanelList';

/**
 * Landing page
 */
export default () => {
  return (
    <LayoutMain isAnonymous>
      <Meta title="GeneOS" />

      <Container className="landing-page">
        <h1>GEM</h1>
      </Container>
    </LayoutMain>
  );
};
