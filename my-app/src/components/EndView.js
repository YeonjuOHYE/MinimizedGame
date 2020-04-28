import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// import firebase from "../firebase/firebase.warpper";

const EndView = (props) => {
  const { score } = props;

  // const shareScore = () => {
  //   firebase.sendLog({ type: "share" });
  // };

  return (
    <>
      <Row>
        <Col className="text-center">
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            당신의 점수는 {score}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button>공유하기</Button> <Button>앱 다운받기</Button>
        </Col>
      </Row>
    </>
  );
};

export default EndView;
