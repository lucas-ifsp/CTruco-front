import React, { useEffect, useState } from "react";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import useRankAllBots from "./useRankAllBots";
import useGetRank from "./useGetRank";
import "../home/Home.css";
import "./RankBots.css";

const RankBots = () => {
  const [rank, setRank] = useState([]);
  const [numberOfGames, setNumberOfGames] = useState(0);
  const rankAvailableOnes = useRankAllBots();
  const getFromDB = useGetRank();

  const updateRank = async () => {
    // await rankAvailableOnes();
    let payload = await getFromDB();
    setNumberOfGames(payload.numberOfGames);
    if (payload.rank.length > 0) {
      setRank(payload.rank);
    }
  };

  useEffect(() => {
    updateRank();

    const interval = setInterval(() => {
      updateRank();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main id="bots-rank" className="cs-feat">
      <section>
        <div className="section-header">
          <button
            className="btn btn-dark"
            style={{ width: "fit-content" }}
            onClick={() => updateRank()}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
          <p className="fs-5 mb-0 text-center">Colocação Atual</p>
        </div>
        {rank.length === 0 && (
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
        {rank.length > 0 && (
          <div className="section-content mb-3 mt-4">
            <div className="table-limiter">
              <table className="default-table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th className="default-th">rank</th>
                    <th className="default-th">bot</th>
                    <th className="default-th">vitórias</th>
                  </tr>
                </thead>
                <tbody className="default-tbody">
                  {rank.map((bot) => {
                    return (
                      <tr key={bot.botName}>
                        <td className="default-td">{bot.botRank}</td>
                        <td className="default-td">{bot.botName}</td>
                        <td className="default-td">
                          {bot.botWins} / {numberOfGames}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default RankBots;
