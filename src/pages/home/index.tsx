import { useState, FormEvent, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

import styles from "./home.module.css";

export interface CryptoDataProp {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
  formatedPrice?: string;
  formatedMarket?: string;
  formatedVolume?: string;
}

interface DataProp {
  data: Array<CryptoDataProp>;
}

export function Home() {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<Array<CryptoDataProp>>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getData();
  }, [offset]);

  async function getData() {
    fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`)
      .then((response) => response.json())
      .then((data: DataProp) => {
        const coinData = data.data;

        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
        });

        const formatedResult = coinData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.priceUsd)),
            formatedMarket: price.format(Number(item.marketCapUsd)),
            formatedVolume: price.format(Number(item.volumeUsd24Hr)),
          };

          return formated;
        });

        const listCoins = [...coins, ...formatedResult]

        setCoins(listCoins);
      });
  }

  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (input === "") {
      return;
    }

    navigate(`detail/${input}`);
  }

  function handleGetMore() {
    if (offset === 0) {
      setOffset(10);
      return;
    }

    setOffset(offset + 10);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da moeda... EX: bitcoin"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <BsSearch size={30} color="#FFF" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>

        <tbody id="tbody">
          {coins.length > 0 &&
            coins.map((coin) => (
              <tr className={styles.tr} key={coin.id}>
                <td className={styles.tdLabel} data-label="Moeda">
                  <div className={styles.name}>
                    <img
                      className={styles.logo}
                      alt="logo cripto"
                      src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLocaleLowerCase()}@2x.png`}
                    />
                    <Link to={`/detail/${coin.id}`}>
                      <span>{coin.name}</span> | BTC
                    </Link>
                  </div>
                </td>

                <td className={styles.tdLabel} data-label="Valor mercado">
                  {coin.formatedMarket}
                </td>

                <td className={styles.tdLabel} data-label="Preço">
                  {coin.formatedPrice}
                </td>

                <td className={styles.tdLabel} data-label="Volume">
                  {coin.formatedVolume}
                </td>

                <td className={styles.tdProfit} data-label="Mudança 24h">
                  <span>{Number(coin.changePercent24Hr).toFixed(2)}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button className={styles.buttonMore} onClick={handleGetMore}>
        Carregar mais
      </button>
    </main>
  );
}
