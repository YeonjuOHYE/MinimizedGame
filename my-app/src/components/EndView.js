import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import firebase from "../firebase/firebase.warpper";

const EndView = props => {
  const { score } = props;

  const shareScore = () => {
    firebase.sendLog({ type: "share" });
  };

  return (
    <>
      <Row>
        <Col className="text-center">
          <div>당신의 점수는 {score}</div>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button onClick={shareScore}>공유하기</Button>
        </Col>
      </Row>
    </>
  );
};

export default EndView;
