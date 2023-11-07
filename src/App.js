import "bootstrap/dist/css/bootstrap.css";

import Home from "./components/Home";
import Search from "./components/Search";
import PageNotFound from "./components/PageNotFound";

import { Route, Routes } from "react-router-dom";
import Restaurant from "./components/Restaurant";
import CheckOut from "./components/CheckOut";

function App() {
  return (
    <>
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>'{" "}
          <Route path="/Restaurant-details/:id" element={<Restaurant />}></Route>
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="*" element={<PageNotFound />}>

                 </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
