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

const SimulationModal = ({ isOpen, onOpen, onClose }) => {
  const [isSimulating, setIsSimulating] = useState(true);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="modal-content">
          <ModalHeader>
            {isSimulating ? "Simulando Partida" : "Resultado"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>OLA</p>
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
