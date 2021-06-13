import Document, { Html, Head, Main, NextScript } from "next/document";

class AugmentDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body style={{ background: "var(--tc-background)" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AugmentDocument;
