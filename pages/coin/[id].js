import React from "react";
import Layout from "../../components/Layout";
import styles from "./Coin.module.css";
import { Line } from "react-chartjs-2";

function Coin({ coin, prices }) {
  return (
    <div>
      <Layout>
        <div className={styles.coin_page}>
          <div className={styles.coin_container}>
            <a
              className={styles.website_link}
              href={`https://www.coingecko.com/en/coins/${coin.name
                .replace(/ +/g, "-")
                .toLowerCase()}`}
              target="_blank"
            >
              <img
                src={coin.image.large}
                alt={coin.name}
                className={styles.coin_image}
              />

              {/* <img
              src={coin.image.large}
              alt={coin.name}
              className={styles.coin_image}
            /> */}

              <h1 className={styles.coin_name}>{coin.name}</h1>
              <p className={styles.coin_ticker}>{coin.symbol}</p>
              <p className={styles.coin_current}>
                Current market price: {coin.market_data.current_price.usd}
              </p>
            </a>
          </div>
        </div>
        {/* <Graph /> */}
        {/* <div className={styles.graph}>
          <Line
            data={{
              labels: ["Red", "Blue", "Yellow", "Green", "Orange"],
              datasets: [
                {
                  label: "Crypto Tracker",
                  data: [65, 59, 80, 81, 56, 55, 40],
                  borderColor: "rgb(75, 192, 192)",
                },
              ],
            }}
            height={400}
            width={600}
          />
        </div> */}
      </Layout>
    </div>
  );
}

export default Coin;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

  const res2 = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=3&sparkline=true"
  );

  const data = await res.json();

  const data2 = await res2.json();

  return {
    props: {
      coin: data,
      prices: data2,
    },
  };
}
