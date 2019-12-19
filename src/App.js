import React, { lazy, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function reloadScreenOnChunkFail(fn) {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch(error => {
        console.log(error);
        if (error.toString().startsWith("ChunkLoadError"))
          window.location.reload(true);
      });
  });
}

const First = lazy(() =>
  reloadScreenOnChunkFail(() => import("./FirstComponent"))
);
const Home = lazy(() => reloadScreenOnChunkFail(() => import("./Home")));

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/first">
          <button>First</button>
        </Link>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/first" component={First} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
