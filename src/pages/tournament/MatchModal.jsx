import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import "./MatchModal.css";

const MatchModal = ({ isOpen, onClose, match }) => {
  if (!match) return <Modal></Modal>;
  const { winnerName, p1Name, p1Score, p2Name, p2Score, timeToExecute } = match;

  return (
    <Modal
      isOpen={isOpen}
      onClose={winnerName ? onClose : null} // Evita fechar durante a simulação
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxH="220px" height={"90%"} maxW="600px" width="100%">
        <ModalHeader>
          {winnerName ? "Resultado" : "Simulando Partidas"}
        </ModalHeader>
        {winnerName && <ModalCloseButton />}{" "}
        <ModalBody>
          {winnerName ? (
            <div id="result">
              <p className="p1Name">{p1Name}</p>
              <p
                style={{ textAlign: "center", fontSize: "30px" }}
                className={p2Score > p1Score ? "loser " : "winner "}
              >
                {p1Score}
              </p>
              <p style={{ textAlign: "center" }}>X</p>
              <p
                style={{ textAlign: "center", fontSize: "30px" }}
                className={p1Score > p2Score ? "loser " : "winner "}
              >
                {p2Score}
              </p>
              <p className="p2Name">{p2Name}</p>
              <p className="executionTime">
                tempo de execução: {timeToExecute}ms
              </p>
            </div>
          ) : (
            <div id="match-modal-spinner">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="black"
                size="xl"
                className="spinner"
              />
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MatchModal;
