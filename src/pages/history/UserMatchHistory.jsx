import { React, useEffect, useState } from "react";
import Header from "../../components/templates/Header";
import Menu from "../../components/templates/Menu";
import Footer from "../../components/templates/Footer";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import "../home/Home.css";
import "./UserMatchHistory.css";
import useUserMatchHistory from "./useUserMatchHistory";

const UserMatchHistory = () => {
  const [userHistory, setUserHistory] = useState();
  const getHistory = useUserMatchHistory();

  const updateUserHistory = async () => {
    let response = await getHistory();
    console.log(response);
    setUserHistory(response);
  };

  useEffect(() => {
    updateUserHistory();
  }, []);

  const matchHistory = [
    {
      winner: "LazyBot",
      p1: "VapoBot",
      p2: "LazyBot",
      p1Score: 0,
      p2Score: 12,
      initTime: "10:00",
      endTime: "11:00",
      gameId: 1,
    },
    {
      winner: "VapoBot",
      p1: "VapoBot",
      p2: "MineiroByBueno",
      p1Score: 12,
      p2Score: 5,
      initTime: "10:00",
      endTime: "11:00",
      gameId: 2,
    },
    {
      winner: "MineiroByBueno",
      p1: "MineiroByBueno",
      p2: "LazyBot",
      p1Score: 12,
      p2Score: 3,
      initTime: "10:00",
      endTime: "11:00",
      gameId: 3,
    },
  ];

  return (
    <div className="app">
      <Header />
      <Menu />
      <main id="match-history" className="cs-feat">
        <section>
          {!userHistory && (
            <ChakraProvider>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                className="spinner"
              />
            </ChakraProvider>
          )}
          {userHistory && (
            <>
              <h4 style={{ textAlign: "center", backgroundColor: "#ff5858" }}>
                Histórico de Partidas
              </h4>
              <div className="table-limiter">
                <table style={{ gap: "3px" }}>
                  <thead>
                    <tr>
                      <th className="th-match-history">Ganhador</th>
                      <th className="th-match-history">Jogador 1</th>
                      <th className="th-match-history">Jogador 2</th>
                      <th className="th-match-history">Pontos J1</th>
                      <th className="th-match-history">Pontos J2</th>
                      <th className="th-match-history">Data Fim</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userHistory.map((match) => (
                      <tr key={match.gameId} id={match.gameId}>
                        <td className="td-match-history">{match.winner}</td>
                        <td className="td-match-history">{match.p1Name}</td>
                        <td className="td-match-history">{match.p2Name}</td>
                        <td className="td-match-history">{match.p1Score}</td>
                        <td className="td-match-history">{match.p2Score}</td>
                        <td
                          style={{
                            textAlign: "center",
                            paddingRight:"15px"
                          }}
                          className="td-match-history"
                        >
                          {match.endingTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UserMatchHistory;
