import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const URL = import.meta.env.VITE_URL;

// eslint-disable-next-line react/prop-types
const CoinInfo = ({ image, name, symbol }) => {

  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getCoinPrice = async () => {
      const response = await fetch(`${URL}/price?api_key=${API_KEY}&fsym=${symbol}&tsyms=USD`);
      const json = await response.json();
      setPrice(json);
    };

    getCoinPrice().catch(console.error);
  }, [symbol])
  

  return (
    <div>
      {price ? (
        <li className="main-list" key={symbol}>
          <img
            className="icons"
            src={`https://www.cryptocompare.com${image}`}
            alt={`Small icon for ${name} crypto coin`}
          />
          {name} <span className="tab"></span> ${price.USD} USD
        </li>
      ) : null}
    </div>
  );
};

export default CoinInfo;
