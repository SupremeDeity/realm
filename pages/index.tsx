import Head from "next/head";
import Header from "@components/header";

// TODO: Take care of styling

export default function Home() {
  return (
    <>
      <Head>
        <title>Realm</title>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        ></script>
        <meta
          name="description"
          content="Practice for nextJS, firebase and react."
        />
      </Head>
      <Header active="Home" />
    </>
  );
}
