import { React, useEffect, useState } from "react";
import Header from "../../components/templates/Header";
import Menu from "../../components/templates/Menu";
import Footer from "../../components/templates/Footer";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import "../home/Home.css";
import "./UserMatchHistory.css";
import "../Table.css";
import useUserMatchHistory from "./useUserMatchHistory";

const UserMatchHistory = () => {
  const [userHistory, setUserHistory] = useState();
  const getHistory = useUserMatchHistory();

  const updateUserHistory = async () => {
    let response = await getHistory();
    // console.log(response);
    setUserHistory(response);
  };

  useEffect(() => {
    updateUserHistory();
  }, []);

  const dateHandler = (originalDate) => {
    // original format YYYY-MM-DD HH:SS

    const [date, time] = originalDate.split(" ");
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year.slice(2)} ${time}`;

    // treated format DD-MM-YY HH:SS
  };

  return (
    <main id="match-history" className="cs-feat">
      <section>
        <p className="fs-5 mb-0 text-center">Suas Partidas</p>
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
          <div className="table-limiter mb-3 mt-4">
            <table className="default-table" style={{ gap: "3px" }}>
              <thead>
                <tr>
                  <th className="default-th">Ganhador</th>
                  <th className="default-th">Jogador 1</th>
                  <th className="default-th">Jogador 2</th>
                  <th className="default-th">Pontos J1</th>
                  <th className="default-th">Pontos J2</th>
                  <th className="default-th">Data início</th>
                  <th className="default-th">Data fim</th>
                  <th className="default-th">Duração</th>
                </tr>
              </thead>
              <tbody className="default-tbody">
                {userHistory.map((match) => (
                  <tr key={match.gameId}>
                    <td className="default-td">{match.winner}</td>
                    <td className="default-td">{match.p1Name}</td>
                    <td className="default-td">{match.p2Name}</td>
                    <td className="default-td">{match.p1Score}</td>
                    <td className="default-td">{match.p2Score}</td>
                    <td className="default-td">
                      {dateHandler(match.startingDate)}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        paddingRight: "15px",
                      }}
                      className="default-td"
                    >
                      {dateHandler(match.endingDate)}
                    </td>
                    <td className="default-td">
                      {match.matchDuration > 60
                        ? `${match.matchDuration / 60}min`
                        : `${match.matchDuration}sec`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default UserMatchHistory;
