import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  List,
  ListItem,
  Checkbox,
  Input,
} from "@chakra-ui/react";
import "./TransferListFragment.css";

const TransferListFragment = ({
  content,
  transferButtonArrowDirection,
  className,
  setTransferedContent,
}) => {
  const [visibleContent, setVisibleContent] = useState(content);
  const [selectedToTransfer, setSelectedToTransfer] = useState([]);
  const [inputContent, setInputContent] = useState("");
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    setVisibleContent(content);
  }, [content]);

  useEffect(() => {
    if (inputContent === "") {
      setVisibleContent(content);
    } else {
      handleInputChange(inputContent);
    }
  }, [inputContent]);

  const handleTransfer = () => {
    setTransferedContent(selectedToTransfer.sort());
    removeTranferedBotsFromContent();
    setSelectedToTransfer([]);
    if (isAllSelected) {
      setIsAllSelected(!isAllSelected);
    }
  };

  const handleInputChange = (name) => {
    const newBotsList = content.filter((botName) =>
      botName.toLowerCase().includes(name.toLowerCase())
    );
    setVisibleContent(newBotsList);
  };

  const removeTranferedBotsFromContent = () => {
    selectedToTransfer.forEach((bot) => {
      let index = content.findIndex((b) => b === bot);
      if (index > -1) {
        content.splice(index, 1);
      }
    });
  };

  const handleCheckboxChange = (bot) => {
    let bots = [...selectedToTransfer];

    if (bots.includes(bot)) {
      let index = bots.findIndex((b) => b === bot);

      if (index > -1) {
        bots.splice(index, 1);
      }
    } else {
      bots.push(bot);
    }
    setIsAllSelected(false);
    setSelectedToTransfer(bots);
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedToTransfer([]);
    } else {
      setSelectedToTransfer([...content]);
    }
    setIsAllSelected(!isAllSelected);
  };

  return (
    <>
      <ChakraProvider>
        <div className="transfer-list-fragment">
          <p style={{ margin: "0px" }}>Número de bots: {content.length}</p>
          <Input
            className="bot-filter"
            onChange={(e) => {
              setInputContent(e.target.value);
            }}
            placeholder="Buscar bot"
          ></Input>
          <button
            type="button"
            className="btn btn-dark select-all"
            onClick={(e) => {
              e.preventDefault();
              toggleSelectAll();
            }}
          >
            Selecionar Todos
          </button>
          <div className="list-limiter">
            <List paddingLeft={"0px"} paddingRight={"15px"} spacing={3}>
              {visibleContent.map((bot) => (
                <ListItem key={bot}>
                  <Checkbox
                    onChange={() => handleCheckboxChange(bot)}
                    isChecked={selectedToTransfer.includes(bot)}
                  >
                    {bot}
                  </Checkbox>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
        <button
          className={"btn btn-dark transfer-button " + className}
          onClick={(e) => {
            e.preventDefault();
            handleTransfer();
            setInputContent("");
          }}
        >
          <i className={"bi bi-arrow-" + transferButtonArrowDirection}></i>
        </button>
      </ChakraProvider>
    </>
  );
};

export default TransferListFragment;
