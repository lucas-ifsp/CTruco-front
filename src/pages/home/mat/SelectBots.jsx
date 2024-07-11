import React from "react";
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
  const listBots = () => {
    fetchBotNames().then((response) => {
      setBotsList(response.data.sort());
    });
  };
  listBots();
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
