import React from "react";
import "./App.scss";

import { Container } from "react-bootstrap";
import { Fileupload } from "./Components/Fileupload";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container>
      <Fileupload />
    </Container>
  );
}

export default App;
