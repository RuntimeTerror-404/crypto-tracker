import React from "react";
import Coins from "../../components/Coins";
import Coin from "./[id]";

function Graph({id, name, marketcap }) {
  return (
    <div>
      <h1>{marketcap}</h1>
    </div>
  );
}

export default Graph;

export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  
    const data = await res.json();
  
    return {
      props: {
        coin: data,
      },
    };
  }
  