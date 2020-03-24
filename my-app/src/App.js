import React, { useState } from "react";
import { getPosterById } from "./db.js";

import View from "./components/View";
import Container from "react-bootstrap/Container";
import ScoreBoard from "./components/ScoreBoard";

import { getPosterLength } from "./db";

function App() {
  const [idOnView, setIdOnView] = useState(0);
  const [score, setScore] = useState(0);

  const checkAndSetNextIdOnView = () => {
    if (idOnView + 1 >= getPosterLength()) {
      alert("끝");
    } else {
      setIdOnView(idOnView + 1);
    }
  };

  const onClickConfirm = answer => {
    if (
      answer.replace(/\s/g, "") ===
      getPosterById(idOnView).name.replace(/\s/g, "")
    ) {
      alert("정답");
      setScore(score + 1);
    } else {
      alert("오답");
    }

    checkAndSetNextIdOnView();
  };

  const onClickPass = () => {
    checkAndSetNextIdOnView();
  };

  return (
    <Container style={{ width: 300 }}>
      <ScoreBoard total={getPosterLength()} score={score} />
      <View
        id={idOnView}
        onClickPass={onClickPass}
        onClickConfirm={onClickConfirm}
      />
    </Container>
  );
}

export default App;
