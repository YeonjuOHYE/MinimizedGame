import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

function ScoreBoard(props) {
  const { score, total, index } = props;
  return (
    <>
      <Row className="justify-content-md-center">
        <Col>
          <Table striped bordered hover style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>전체</th>
                <th>현재</th>
                <th>점수</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{total}</td>
                <td>{index}</td>
                <td>{score}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row >
    </>
  );
}

export default ScoreBoard;
