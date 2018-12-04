import React, { Component } from 'react';
import {
  Col,
  Container,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import cx from 'classnames';

import LayoutMain from '../src/layouts/main';
import Meta from '../src/components/Meta';
import shopItems, { shopGroups } from '../src/store/shop';

/**
 * User marketplace
 */
export default class extends Component {
  state = {
    tag: '',
  };

  handleSelectGroup(group) {
    this.setState({
      tag: group.tag,
    });
  }

  renderItem = (item) => {
    return (
      <Col key={item.name} xs={12} md={4}>
        <Card className="v-gutter">
          <CardImg top width="100%" src={item.image} alt={item.name}/>
          <CardBody>
            <CardText>{item.description}</CardText>
            <CardTitle>{item.name}</CardTitle>
            <CardText className="card-vendor">by {item.vendor}</CardText>
            <CardSubtitle>{item.price}</CardSubtitle>
          </CardBody>
        </Card>
      </Col>
    );
  };

  renderGroup = (group) => {
    const { name } = group;
    const { tag } = this.state;

    const groupClasses = cx({
      selected: group.tag === tag,
    });

    return (
      <NavItem key={name} className={groupClasses}>
        <NavLink onClick={() => this.handleSelectGroup(group)}>{name}</NavLink>
      </NavItem>
    );
  };

  render() {
    const { path } = this.props;
    const { tag } = this.state;

    return (
      <LayoutMain path={path}>
        <Meta title="Marketplace"/>

        <Container className="shop-page">
          <h1>Marketplace</h1>
          <Row>
            <Col>
              <Nav>
                {shopGroups.map(this.renderGroup)}
              </Nav>
            </Col>
          </Row>
          <Row>
            {shopItems.filter(item => !tag || !item.tags || item.tags.includes(tag)).map(this.renderItem)}
          </Row>
        </Container>
      </LayoutMain>
    );
  }
}
