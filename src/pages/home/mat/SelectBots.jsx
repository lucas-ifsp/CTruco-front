import React, { useEffect } from "react";
import { useState } from "react";
import useGetBotNames from "../../../hooks/api/useGetBotNames";

const SelectBots = ({ botName, setBotName }) => {
  const [botsList, setBotsList] = useState([
    "MineiroByBueno",
    "DummyBot",
    "LazyBot",
    "VapoBot",
  ]);

  const fetchBotNames = useGetBotNames();
  const updateBotsList = async () => {
    const response = await fetchBotNames();
    console.log(response);
    const data = await response.data.sort();
    setBotsList(data);
  };

  useEffect(() => {
    updateBotsList();
  }, []);

  return (
    <select
      className="form-select mb-3"
      value={botName}
      onChange={(e) => setBotName(e.target.value)}
    >
      {botsList.map((optionBotName) => (
        <option value={optionBotName} key={optionBotName}>
          {optionBotName}
        </option>
      ))}
    </select>
  );
};

export default SelectBots;
