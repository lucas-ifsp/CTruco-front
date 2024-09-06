import React, { useEffect, useState } from "react";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import useTopWinners from "./useTopWinners";
import "../home/Home.css";
import "./TopWinners.css";

const TopWinners = () => {
  const findTopWinners = useTopWinners();
  const [playersRank, setPlayersRank] = useState();

  const updateWinnersTable = async () => {
    let response = await findTopWinners();
    if (response.topWinners) {
      setPlayersRank(response.topWinners.topUsersRecords);
    }
  };

  useEffect(() => {
    updateWinnersTable();
  }, []);

  return (
    <main id="top-winners-main" className="cs-feat">
      <section>
        {!playersRank && (
          <ChakraProvider>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              className="spinner"
            />
            <p>Isso pode demorar um pouco...</p>
          </ChakraProvider>
        )}
        {playersRank && (
          <>
            <div className="section-header">
              <ChakraProvider>
                <button
                  className="btn btn-dark"
                  style={{ width: "fit-content" }}
                  onClick={() => updateWinnersTable()}
                >
                  <i className="bi bi-arrow-clockwise"></i>
                </button>
              </ChakraProvider>
              <h4 style={{ textAlign: "center" }}>Melhores Jogadores</h4>
            </div>
            <div className="top-winners-limiter">
              <table className="default-table">
                <thead>
                  <tr>
                    <th className="default-th">Jogador</th>
                    <th className="default-th">vitórias</th>
                  </tr>
                </thead>
                <tbody className="default-tbody">
                  {playersRank &&
                    Object.entries(playersRank).map(([player, score]) => (
                      <tr key={player}>
                        <td className="default-td">{player}</td>
                        <td className="default-td">{score}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default TopWinners;
