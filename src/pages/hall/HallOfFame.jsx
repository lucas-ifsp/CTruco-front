import React, { useEffect, useState } from "react";
import Header from "../../components/templates/Header";
import Menu from "../../components/templates/Menu";
import Footer from "../../components/templates/Footer";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import useRankAllBots from "./useRankAllBots";
import "../home/Home.css";
import "./HallOfFame.css";

const HallOfFame = () => {
  const [rank, setRank] = useState();
  const rankAvailableOnes = useRankAllBots();

  useEffect(() => {
    setRank(rankAvailableOnes());
  }, []);
  // const botsRank = null;
  const botsRank = [
    {
      rank: 1,
      botName: "LazyBot",
      owner: "indefinido",
      type: "local",
      wins: 500,
    },
    {
      rank: 2,
      botName: "MineiroByBueno",
      owner: "indefinido",
      type: "local",
      wins: 203,
    },
    {
      rank: 3,
      botName: "DummyBot",
      owner: "Lucas",
      type: "remoto",
      wins: 200,
    },
  ];

  return (
    <div className="app">
      <Header />
      <Menu />
      <main id="bots-rank" className="cs-feat">
        <section>
          {!botsRank && (
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
          {botsRank && (
            <>
              <h4 style={{ textAlign: "center", backgroundColor: "#ff5858" }}>
                COLOCAÇÃO
              </h4>
              <p style={{ textAlign: "center", backgroundColor: "#ff5858" }}>
                (da ultima análise)
              </p>
              <table>
                <thead>
                  <tr>
                    <th className="th-bots-rank">rank</th>
                    <th className="th-bots-rank">bot</th>
                    <th className="th-bots-rank">vitórias</th>
                    <th className="th-bots-rank">dono</th>
                    <th className="th-bots-rank">tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {botsRank.map((bot) => (
                    <tr>
                      <td className="td-bots-rank">{bot.rank}</td>
                      <td className="td-bots-rank">{bot.botName}</td>
                      <td className="td-bots-rank">{bot.wins}</td>
                      <td className="td-bots-rank">{bot.owner}</td>
                      <td className="td-bots-rank">{bot.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HallOfFame;
