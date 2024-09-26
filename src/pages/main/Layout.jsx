import { Outlet } from "react-router-dom";
import { TournamentProvider } from "../tournament/TournamentProvider";

const Layout = () => {
  return (
    <main>
      <TournamentProvider>
        <Outlet />
      </TournamentProvider>
    </main>
  );
};

export default Layout;
