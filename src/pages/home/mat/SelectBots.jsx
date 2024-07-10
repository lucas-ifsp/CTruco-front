import React from "react";

const SelectBots = ({botName ,setBotName}) => {
  const bots = ["MineiroByBueno", "DummyBot", "LazyBot", "VapoBot"];
  return (
    <select
      className="form-select mb-3"
      value={botName}
      onChange={(e) => setBotName(e.target.value)}
    >
      {bots.map((optionBotName) => (
        <option value={optionBotName} >{optionBotName}</option>
      ))}
    </select>
  );
};

export default SelectBots;
