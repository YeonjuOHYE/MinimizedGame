import React, { useState, useEffect } from "react";
import { getPosterById, poster, posters } from "./db.js";

import View from "./components/View";
import Container from "react-bootstrap/Container";
import ScoreBoard from "./components/ScoreBoard";
import ScoreAlert from "./components/ScoreAlert";
import EndView from "./components/EndView";

import { getPosterLength } from "./db";
import firebase from "./firebase/firebase.wrapper";

firebase
  .getLocalIP()
  .then((ip) => {
    window.localStorage.setItem("ip", ip);
    window.localStorage.setItem("browser", firebase.getBrowser());
  })
  .catch((error) => {
    let ip = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < characters.length; i++) {
      ip += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    window.localStorage.setItem("ip", ip);
    window.localStorage.setItem("browser", firebase.getBrowser());
  });

function App() {
  const [idOnView, setIdOnView] = useState(0);
  const [score, setScore] = useState(0);
  const [show, setShow] = useState(false);
  const [correct, setCorrect] = useState("success");
  const [showEndPage, setShowEndPage] = useState(false);

  useEffect(() => {
    posters.forEach((poster) => {
      new Image().src = poster.path;
    });
  }, []);

  const checkAndSetNextIdOnView = () => {
    if (idOnView + 1 >= getPosterLength()) {
      setShowEndPage(true);
    } else {
      setIdOnView(idOnView + 1);
    }
  };

  const onClickConfirm = (answer) => {
    let isCorrect = false;
    if (
      answer.replace(/\s/g, "") ===
      getPosterById(idOnView).name.replace(/\s/g, "")
    ) {
      isCorrect = true;
      setScore(score + 1);
    }

    setCorrect(isCorrect);
    setShow(true);
    checkAndSetNextIdOnView();

    // firebase.sendLog({
    //   type: "quest",
    //   step: idOnView,
    //   correct: isCorrect,
    // });
  };

  const onClickPass = async () => {
    checkAndSetNextIdOnView();
  };

  return (
    <>
      <Container style={{ width: 300 }}>
        {showEndPage ? (
          <EndView score={score} />
        ) : (
          <>
            <ScoreBoard
              total={getPosterLength()}
              score={score}
              index={idOnView + 1}
            />
            <View
              id={idOnView}
              onClickPass={onClickPass}
              onClickConfirm={onClickConfirm}
            />
          </>
        )}
      </Container>
      <ScoreAlert
        setShow={setShow}
        show={show}
        correct={correct}
        style={{ zIndex: 100, position: "fixed", top: 30 }}
      />
    </>
  );
}

export default App;
