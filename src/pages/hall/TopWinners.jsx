import React, { useEffect, useState } from "react";
import Header from "../../components/templates/Header";
import Menu from "../../components/templates/Menu";
import Footer from "../../components/templates/Footer";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import useTopWinners from "./useTopWinners";
import "../home/Home.css";
import "./TopWinners.css";

const TopWinners = () => {
  const findTopWinners = useTopWinners();
  const [playersRank, setPlayersRank] = useState();

  const updateWinnersTable = async () => {
    let response = await findTopWinners();
    console.log(response);
    console.log(response.topWinners.topUsersRecords);
    if (response.topWinners) {
      setPlayersRank(response.topWinners.topUsersRecords);
    }
  };

  useEffect(() => {
    updateWinnersTable();
  }, []);

  return (
    <div className="app">
      <Header />
      <Menu />
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
              <h4 style={{ textAlign: "center", backgroundColor: "#ff5858" }}>
                Melhores Jogadores
              </h4>
              <div className="top-winners-limiter">
                <table>
                  <thead>
                    <tr>
                      {/* <th className="th-bots-rank">rank</th> */}
                      <th className="th-bots-rank">Jogador</th>
                      <th className="th-bots-rank">vitórias</th>
                      {/* <th className="th-bots-rank">dono</th> */}
                      {/* <th className="th-bots-rank">tipo</th> */}
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </>
          )}
          <button>Refresh</button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TopWinners;
