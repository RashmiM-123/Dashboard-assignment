// import Image from "next/image";

// export default function Home() {
//   return (
//     <div >
    
//     </div>
//   );
// }
import Image from "next/image";
import { DashBoardContextProvider } from "./components/context/DashboardContext";
import Dashboard from "./components/Dashboard";
import AddWidget from "./components/AddWidget";

export default function Home() {
  return (
    <DashBoardContextProvider>
    <Dashboard />

    {/* <AddWidget/> */}
  </DashBoardContextProvider>
  );
}