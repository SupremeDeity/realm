import Head from "next/head";
import Header from "@components/header";

// TODO: Take care of styling

export default function Home() {
  return (
    <>
      <Head>
        <title>Realm</title>
      </Head>
      <Header active="Home" />
    </>
  );
}
