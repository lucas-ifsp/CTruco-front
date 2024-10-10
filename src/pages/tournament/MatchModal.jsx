import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import "./MatchModal.css";

const MatchModal = ({ match, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {!match.winnerName && "Simulando Partidas"}
          {match.winnerName && "Resultado"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!match.winnerName && (
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
          {match.winnerName && (
            <div id="result">
              <p className="p1Name">{match.p1Name}</p>
              <p
                style={{ textAlign: "start" }}
                className={match.p2Score > match.p1Score ? "loser " : "winner "}
              >
                {match.p1Score}
              </p>
              <p style={{ textAlign: "center" }}>X</p>
              <p
                style={{ textAlign: "end" }}
                className={match.p1Score > match.p2Score ? "loser " : "winner "}
              >
                {match.p2Score}
              </p>
              <p className="p2Name">{match.p2Name}</p>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MatchModal;
