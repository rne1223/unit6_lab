import { useEffect, useState } from 'react';
import './App.css'

import CoinInfo from "./components/coinInfo";

function App() {

  const API_KEY = import.meta.env.VITE_API_KEY;
  const URL = import .meta.env.VITE_URL;

  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(`${URL}/all/coinlist?api_key=${API_KEY}`);
      const json = await response.json();
      setList(json);
    };

    fetchAllCoinData().catch(console.error);
  }, [])


  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = searchValue => {
    setSearchInput(searchValue);

    if(searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) =>
        Object.values(item).join("").toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };
  
  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>

      <input 
        type="text" 
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />

      <ul>
         {searchInput.length > 0
      ? filteredResults.map((coin, index) => 
            list.Data[coin].PlatformType === "blockchain" ? 
            <CoinInfo
              key={index}
              image={list.Data[coin].ImageUrl}
              name={list.Data[coin].FullName}
              symbol={list.Data[coin].Symbol}
            />
            : null
        )
      : list && Object.entries(list.Data).map(([coin],index) => 
            list.Data[coin].PlatformType === "blockchain" ? 
            <CoinInfo
              key={index}
              image={list.Data[coin].ImageUrl}
              name={list.Data[coin].FullName}
              symbol={list.Data[coin].Symbol}
            />
            : null
        )}
      </ul>
    </div>
  ); 
}

export default App