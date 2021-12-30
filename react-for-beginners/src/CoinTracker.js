import { useEffect, useState } from "react";

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  //set default array
  const [coins, setCoins] = useState([]);
  const [index, setIndex] = useState("");
  const [amount, setAmount] = useState();
  const [convertedAmount, setConvertAmount] = useState();
  useEffect(() => {
    //get API
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onSelect = (event) => {
    console.log(event.target.value);
    setIndex(event.target.value);
  };

  const onChange = (event) => {
    //console.log(event.target.value);
    setAmount(event.target.value);
  };

  let result = 0;
  const onConvert = (event) => {
    console.log(index);
    result = coins
      .filter((x) => x.name === index)
      .map((x) => x.quotes.USD.price);
    setConvertAmount(result);
    console.log(result);
    console.log(amount);
  };

  const reset = () => {
    setAmount(0);
    setConvertAmount(0);
    result = 0;
  };

  return (
    <div>
      <h1>The Coins : {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select value={index} onChange={onSelect}>
          {coins.map((coin) => (
            <option value={coin.name}>
              {coin.name} - ({coin.symbol}) : {coin.quotes.USD.price}USD
            </option>
          ))}
        </select>
      )}
      <br />
      <br />

      <hr />
      <input
        value={amount}
        id="usd"
        placeholder="Please input your USD dollars"
        type="number"
        onChange={onChange}
      />
      <button onClick={reset}>Reset</button>
      <button onClick={onConvert}>Convert</button>
      <h1>
        the amount you can buy {index} : {Math.round(amount / convertedAmount)}
      </h1>
    </div>
  );
}

export default CoinTracker;
