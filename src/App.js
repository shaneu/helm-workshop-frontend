import React from "react";
import { Router } from "@reach/router"
import TodosContainer from "./todo/TodosContainer";
import Secret from "./secret/Secret";

function App() {
  return (
    <div>
      <header>Helm Workshop</header>
      <Router>
        <TodosContainer path="/" />
        <Secret path="/secret" />
      </Router>
    </div>
  );
}

export default App;
