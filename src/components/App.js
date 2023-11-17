import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./Details";
import Home from "./Home";
import Person from "./Person";
import CrewInfo from "./CrewInfo";
import List from "./List";
import BackdropList from "./BackdropList";
import PosterList from "./PosterList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:categ/:id" element={<Details />}></Route>
        <Route path="/person/:pid" element={<Person />}></Route>
        <Route path="/:category/:id/credits" element={<CrewInfo />}></Route>
        <Route path="/:category/:type/list" element={<List />}></Route>
        <Route
          path="/:category/:id/images/backdrops"
          element={<BackdropList />}
        ></Route>
        <Route
          path="/:category/:id/images/posters"
          element={<PosterList />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
