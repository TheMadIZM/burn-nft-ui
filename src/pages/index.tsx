import Footer from "components/Footer";
import type { NextPage } from "next";
import Head from "next/head";
import { GalleryView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div  className=" flex flex-col h-screen justify-between">
      <Head>
        <title>IZ-CINERATOR</title>
        <meta
          name="description"
          content="Come burn your unwanted Solana NFTs!"
        />
      </Head>
      <GalleryView />
      <Footer/>
    </div>
  );
};

export default Home;
