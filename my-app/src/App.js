import React, { useState } from "react";
import { getPosterById } from "./db.js";

import View from "./components/View";
import Container from "react-bootstrap/Container";
import ScoreBoard from "./components/ScoreBoard";
import ScoreAlert from "./components/ScoreAlert";
import EndView from "./components/EndView";

import { getPosterLength } from "./db";
import CradStack from "./components/CardStack";

function App() {
  const [idOnView, setIdOnView] = useState(0);
  const [score, setScore] = useState(0);
  const [show, setShow] = useState(false);
  const [correct, setCorrect] = useState("success");
  const [showEndPage, setShowEndPage] = useState(false);

  const checkAndSetNextIdOnView = () => {
    if (idOnView + 1 >= getPosterLength()) {
      setShowEndPage(true);
    } else {
      setIdOnView(idOnView + 1);
    }
  };

  const onClickConfirm = (answer) => {
    if (
      answer.replace(/\s/g, "") ===
      getPosterById(idOnView).name.replace(/\s/g, "")
    ) {
      setCorrect(true);
      setScore(score + 1);
    } else {
      setCorrect(false);
    }

    setShow(true);
    checkAndSetNextIdOnView();
  };

  const onClickPass = () => {
    checkAndSetNextIdOnView();
  };

  // return (
  //   <>
  //     <Container style={{ width: 300 }}>
  //       {showEndPage ? (
  //         <EndView score={score} />
  //       ) : (
  //         <>
  //           <ScoreBoard
  //             total={getPosterLength()}
  //             score={score}
  //             index={idOnView + 1}
  //           />
  //           <View
  //             id={idOnView}
  //             onClickPass={onClickPass}
  //             onClickConfirm={onClickConfirm}
  //           />
  //         </>
  //       )}
  //     </Container>
  //     <ScoreAlert
  //       setShow={setShow}
  //       show={show}
  //       correct={correct}
  //       style={{ zIndex: 100, position: "fixed", top: 30 }}
  //     />
  //   </>
  // );

  return (
    <div style={{ marginTop: 10 }}>
      <CradStack
        effect="krisna"
        imgs={[getPosterById(0).path, getPosterById(1).path]}
      />
    </div>
  );
}

export default App;
