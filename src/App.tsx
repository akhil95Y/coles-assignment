import "./App.css";
import Navbar from "./components/Navbar";
import TypeAheadSearch from "./components/TypeAheadSearch";

function App() {
  return (
    <div
      className="justify-content-center d-flex flex-column align-items-center min-vh-100"
      data-bs-theme="dark"
    >
      <div className="h-10 w-100 col-12 d-flex justify-content-center mt-5">
        <h1 className="h1">Search Countries for population</h1>
      </div>

      <div className="w-50 col-6 pt-1 h-100 d-flex flex-grow-1 justify-content-center">
        <TypeAheadSearch></TypeAheadSearch>
      </div>
    </div>
  );
}

export default App;
