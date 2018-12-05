import React from 'react'
import App, { Container } from 'next/app'
import { SESSION_COOKIE_NAME } from '../src/constants/session';
import userStore from '../src/store/user';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    const { req } = ctx;

    let sessionCookie;
    if (req) {
      sessionCookie = req.cookies && req.cookies[SESSION_COOKIE_NAME];
      pageProps.path = req.pathname;
    }

    let user;
    if (sessionCookie) {
      try {
        user = JSON.parse(sessionCookie);
      } catch (err) {
        console.error(err);
      }
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      pageProps,
      user,
    };
  }

  componentWillMount() {
    const { user } = this.props;

    if (user) {
      userStore.setUser(user);
    }
  }

  render () {
    const { Component, pageProps } = this.props;

    return (
      <Container fluid={true}>
        <Component {...pageProps} />
      </Container>
    )
  }
}
