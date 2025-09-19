
import { DashBoardContextProvider } from "./components/context/DashboardContext";
import Dashboard from "./components/Dashboard";


export default function Home() {
  return (
    <DashBoardContextProvider>
    <Dashboard />

   
  </DashBoardContextProvider>
  );
}