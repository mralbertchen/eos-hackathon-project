import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import '../src/utils/fontawesome';

export default class MyDocument extends Document {
  static getInitialProps(ctx) {
    const { req } = ctx;

    let pathname;
    if (req) {
      pathname = req.path;
    } else {
      pathname = document.location.pathname;
    }

    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
    });

    const initialProps = Document.getInitialProps(ctx);

    return {
      ...initialProps,
      routeName: pathname.replace(/\//g, ''),
      styles: [
        ...initialProps.styles,
        ...sheet.getStyleElement(),
      ],
    };
  }

  render() {
    const { routeName, styles } = this.props;

    return (
      <html>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"/>
          <link href="/static/fonts/gilroy.css" rel="stylesheet"/>
          {styles}
        </Head>

        <body className={`page-${routeName}`}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
