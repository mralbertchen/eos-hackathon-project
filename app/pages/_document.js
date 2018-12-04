import Document, { Head, Main, NextScript } from 'next/document'

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

    return {
      ...Document.getInitialProps(ctx),
      routeName: pathname.replace(/\//g, ''),
    };
  }

  render() {
    const { routeName } = this.props;

    return (
      <html>
        <Head>
        </Head>

        <body className={`page-${routeName}`}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
