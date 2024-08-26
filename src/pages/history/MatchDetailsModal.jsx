import React from "react";
import {
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import "./MatchDetailsModal.css";

const MatchDetailsModal = ({ match, isOpen, onClose }) => {
  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="match-details">
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!match && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                className="spinner"
              />
            )}
            {match && (
              <div className="match-details-modal-body">
                <p id="init-time-details">Início: {match.initTime}</p>
                <p id="end-time-details">Fim: {match.endTime}</p>

                <p id="p1-name">{match.p1}:</p>
                {match.p1Score == 12 && (
                  <p id="p1-score" className="winner">
                    {match.p1Score}
                  </p>
                )}
                {match.p1Score != 12 && (
                  <p id="p1-score" className="loser">
                    {match.p1Score}
                  </p>
                )}

                <p id="p2-name">{match.p2}:</p>
                {match.p2Score == 12 && (
                  <p id="p2-score" className="winner">
                    {match.p2Score}
                  </p>
                )}
                {match.p2Score != 12 && (
                  <p id="p2-score" className="loser">
                    {match.p2Score}
                  </p>
                )}
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default MatchDetailsModal;
