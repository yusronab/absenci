import { Route, Routes, useLocation } from "react-router-dom"
import Credential from "./pages/Credential";
import NamePage from "./pages/NamePage";
import Scanner from "./pages/Scanner";
import Todo from "./pages/Todo";
import transition from "./transition";

const HomePage = transition({ OgComponent: NamePage });
const NimPage = transition({ OgComponent: Credential });
const ScannerPage = transition({ OgComponent: Scanner });
const TodoPage = transition({ OgComponent: Todo });

function App() {
  const location = useLocation();

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-l from-green-700
  to-teal-700">
      <Routes location={location} key={location.pathname}>
        <Route index element={<HomePage />} />
        <Route path="/nim" element={<NimPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/scan" element={<ScannerPage />} />
      </Routes>
    </div>
  )
}

export default App
