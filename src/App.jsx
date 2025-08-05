import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/router/RequireAuth";
import { AuthContextProvider } from "./contexts/AuthContext";
import { IntelContextProvider } from "./contexts/IntelContext";
import { TournamentProvider } from "./pages/tournament/TournamentProvider";
import { EvaluationProvider } from "./pages/evaluate-bot/EvaluateContext";
import Authentication from "./pages/authentication/Authentication";
import NotFound from "./pages/error/NotFound";
import Home from "./pages/home/Home";
import Layout from "./pages/main/Layout";
import Registration from "./pages/registration/Registration";
import Mat from "./pages/mat/GameMat";
import StartGameMat from "./pages/mat/StartGameMat";
import UserMatchHistory from "./pages/history/UserMatchHistory";
import RankBots from "./pages/hall-of-fame/RankBots";
import ConfigSimulation from "./pages/simulate-mat/ConfigSimulation";
import RemoteBotsMenu from "./pages/crud-remote-bots/RemoteBotsMenu";
import TopWinners from "./pages/hall-of-fame/TopWinners";
import EvaluateBot from "./pages/evaluate-bot/EvaluateBot";
import PagesLayout from "./pages/main/PagesLayout";
import TournamentConfig from "./pages/tournament/TournamentConfig";
import Tournament from "./pages/tournament/Tournament";
import TournamentPageLayout from "./pages/main/TournamentPageLayout";

// TODO
// 1. Solve opponent card showing covered before unveiled. X
// 2. Implement feature to notify player about leaving active game
// 3. Implement feature to remove active game if player leaves
// 4. Solve problem of overflow in long usernames and put a limit in name length
// 5. Implement responsive layout
// 6. Implement hall of fame
// 7. Implement player history

const App = () => (
  <AuthContextProvider>
    <IntelContextProvider>
      <TournamentProvider>
        <EvaluationProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" element={<Authentication />} />
              <Route path="register" element={<Registration />} />
              <Route element={<RequireAuth />}>
                <Route element={<PagesLayout />}>
                  <Route index element={<Home />} />
                  <Route path="add-remote" element={<RemoteBotsMenu />} />
                  <Route path="mat/start-game" element={<StartGameMat />} />
                  <Route path="mat/game" element={<Mat />} />
                  <Route path="evaluate-bot" element={<EvaluateBot />} />
                  <Route path="user-history" element={<UserMatchHistory />} />
                  <Route path="hall-of-fame" element={<RankBots />} />
                  <Route path="top-winners" element={<TopWinners />} />
                  <Route path="simulate-bots" element={<ConfigSimulation />} />
                  <Route
                    path="tournament/config"
                    element={<TournamentConfig />}
                  />
                </Route>
                <Route element={<TournamentPageLayout />}>
                  <Route path="tournament" element={<Tournament />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </EvaluationProvider>
      </TournamentProvider>
    </IntelContextProvider>
  </AuthContextProvider>
);

export default App;
