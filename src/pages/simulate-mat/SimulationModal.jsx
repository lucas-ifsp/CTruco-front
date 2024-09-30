import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import "./SimulationModal.css";
import { useEffect, useState } from "react";

const SimulationModal = ({ isOpen, onOpen, onClose, results, setResults }) => {
  /* TODO - ajustar o jeito que o request é feito.
  Retornar um http 100 avisando que a solicitação foi feita adequadamente
  e checar em intervalos se a simulação terminou ou não,
  fazer isso através de uma consulta no banco (criar uma tabela no banco para isso)
  atualizar o estado do isSimulating de acordo com a situação.
  */
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
          {!results && "Simulando Partidas"}
          {results && "Resultado"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="modal-body">
          {!results && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="black"
              size="xl"
              className="spinner"
            />
          )}
          {results && (
            <div id="simulation-modal-results">
              <p className="times">Partidas: {times}</p>
              <p className="time-to-execute">
                Tempo de execução: {timeToExecute}ms
              </p>
              <p className="bot1-name">{bot1Name}</p>
              {/*.winner e .loser estão estilizados no arquivo Tournament.css*/}
              <p
                className={
                  (bot1Wins > bot2Wins ? "winner " : "loser ") + "bot1-wins"
                }
              >
                {bot1Wins}
              </p>
              <p className="versus">X</p>
              <p className="bot2-name">{bot2Name}</p>
              <p
                className={
                  (bot2Wins > bot1Wins ? "winner " : "loser ") + "bot2-wins"
                }
              >
                {bot2Wins}
              </p>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SimulationModal;
