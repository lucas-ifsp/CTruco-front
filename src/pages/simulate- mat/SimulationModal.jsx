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
import { useState } from "react";

const SimulationModal = ({ isOpen, onOpen, onClose, results }) => {
  const [isSimulating, setIsSimulating] = useState(true);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="modal-content">
          <ModalHeader>
            {!results && "Simulando Partida"}
            {results && "Resultado"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!results && <p>Este processo pode demorar um pouco</p>}
            {results}
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
