import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import "./SimulationModal.css";
import { useEffect, useState } from "react";

const SimulationModal = ({ isOpen, onOpen, onClose, results, setResults }) => {
  const [isSimulating, setIsSimulating] = useState(true);
  const [bot1Name, setBot1Name] = useState("sem bot aqui");
  const [bot2Name, setBot2Name] = useState("");
  const [bot1Wins, setBot1Wins] = useState(0);
  const [bot2Wins, setBot2Wins] = useState(0);
  const [timeToExecute, setTimeToExecute] = useState(0);
  const [times, setTimes] = useState(1);

  useEffect(() => {
    if (results) {
      setBot1Name(results.bot1Name);
      setBot2Name(results.bot2Name);
      setBot1Wins(results.bot1Wins);
      setBot2Wins(results.bot2Wins);
      setTimeToExecute(results.timeToExecute);
      setTimes(results.gamesPlayed);
    }
  }, [results]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setResults(undefined);
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent className="modal-content">
          <ModalHeader>
            {!results && "Simulando Partida"}
            {results && "Resultado"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!results && <p>Este processo pode demorar um pouco</p>}
            {results && (
              <div>
                <p>Partidas:{times} Tempo de execução: {timeToExecute}ms</p>
                <p>{bot1Name}: {bot1Wins}</p>
                <p>{bot2Name}: {bot2Wins}</p>
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SimulationModal;
