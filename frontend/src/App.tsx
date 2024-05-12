import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserListing } from "./components/UserListing";
import { UserDetails } from "./components/UserDetails";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<UserListing />} />
      <Route path="/:seed/:loginId" index element={<UserDetails />} />
    </Routes>
  );
}

export default App;
