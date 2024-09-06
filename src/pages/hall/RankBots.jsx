import React, { useEffect, useState } from "react";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import useRankAllBots from "./useRankAllBots";
import useGetRank from "./useGetRank";
import "../home/Home.css";
import "./RankBots.css";

const RankBots = () => {
  const [rank, setRank] = useState([]);
  const rankAvailableOnes = useRankAllBots();
  const getFromDB = useGetRank();

  const updateRank = async () => {
    await rankAvailableOnes();
    let response = await getFromDB();
    console.log(response);
    if (response.rank.length > 0) {
      setRank(response.rank);
    }
  };

  useEffect(() => {
    updateRank();
    const interval = setInterval(() => {
      updateRank();
    }, 10000);
    // interval();
    return () => clearInterval(interval);
  }, []);

  return (
    <main id="bots-rank" className="cs-feat">
      <section>
        {rank.length == 0 && (
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
          <div className="section-content">
            <div className="section-header">
              <button
                className="btn btn-dark"
                style={{ width: "fit-content" }}
                onClick={() => updateRank()}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
              <h4 style={{ textAlign: "center" }}>COLOCAÇÃO ATUAL</h4>
            </div>
            <div className="table-limiter">
              <table className="default-table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th className="default-th">rank</th>
                    <th className="default-th">bot</th>
                    <th className="default-th">vitórias</th>
                    {/* <th className="default-th">dono</th> */}
                    {/* <th className="default-th">tipo</th> */}
                  </tr>
                </thead>
                <tbody className="default-tbody">
                  {rank.map((bot) => {
                    return (
                      <tr key={bot.botName}>
                        <td className="default-td">{bot.botRank}</td>
                        <td className="default-td">{bot.botName}</td>
                        <td className="default-td">{bot.botWins}</td>
                        {/* <td className="default-td">{bot.owner}</td> */}
                        {/* <td className="default-td">{bot.type}</td> */}
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
