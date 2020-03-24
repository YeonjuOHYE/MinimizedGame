import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ScoreBoard(props) {
  const { score, total } = props;
  return (
    <Row>
      <Col className="text-center">
        <br />
        <div>
          {score} / {total}
        </div>
        <br />
      </Col>
    </Row>
  );
}

export default ScoreBoard;
