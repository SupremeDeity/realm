import Document, { Html, Head, Main, NextScript } from "next/document";

class AugmentDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Practice for nextJS, firebase and react."
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
