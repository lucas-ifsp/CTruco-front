import React from "react";
const MatchPlayButton = ({
  isP1,
  match,
  onPlay,
  camp,
  times,
  onOpen,
  setModalPlayer,
}) => {
  const handleOpenModal = (player) => {
    setModalPlayer(player);
    onOpen();
  };

  if (!isP1) {
    return (
      <>
        <div className={"match-play-btn m" + match.matchNumber + " p2"}>
          <button
            type="button"
            className="btn btn-dark play-btn"
            onClick={() => {
              handleOpenModal("p2");
              onPlay(2 * match.matchNumber - camp.size, times);
            }}
            disabled={
              !camp.matchesDTO[2 * match.matchNumber - camp.size - 1].available
            }
          >
            Jogar
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className={"match-play-btn m" + match.matchNumber + " p1"}>
        <button
          type="button"
          className="btn btn-dark play-btn"
          onClick={() => {
            handleOpenModal("p1");
            onPlay(2 * match.matchNumber - camp.size - 1, times);
          }}
          disabled={
            !camp.matchesDTO[2 * match.matchNumber - camp.size - 2].available
          }
        >
          Jogar
        </button>
      </div>
    </>
  );
};

export default MatchPlayButton;
