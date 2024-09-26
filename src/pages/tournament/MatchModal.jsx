const MatchModal = ({ match }) => {
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
      <ModalContent>
        <ModalHeader>
          {!match.winnerName && "Simulando Partidas"}
          {match.winnerName && "Resultado"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!match.winnerName && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="black"
              size="xl"
              className="spinner"
            />
          )}
          {match.winnerName && <p>{match.winnerName}</p>}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
