import Head from "next/head";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Coins from "../components/Coins";
import CoinList from "../components/CoinList";
import Layout from "../components/Layout";

export default function Home({ filteredCoins }) {
  const [search, setSearch] = useState("");
  const allCoins = filteredCoins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <div className="coin_app">
        <div className="github_link">
          <a
            href="https://www.linkedin.com/in/mohit-parashar-2849201b8/"
            target="_blank"
          >
            designed and developed by Mohit Parashar
          </a>
        </div>
        <SearchBar type="text" placeholder="Search" onChange={handleChange} />
        <CoinList filteredCoins={allCoins} />
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=150&page=1&sparkline=true"
  );

  const filteredCoins = await res.json();

  return {
    props: {
      filteredCoins,
    },
  };
};
