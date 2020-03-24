import React, { useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { getPosterById } from "../db.js";

function View(props) {
  const { id, onClickConfirm, onClickPass } = props;
  const poster = getPosterById(id);
  const [answer, setAnswer] = useState("");

  return (
    <Fragment>
      <Row>
        <Col>
          <Image src={poster.path} fluid />
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">
                정답
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={answer}
              onChange={e => {
                if (answer !== e.target.value) {
                  setAnswer(e.target.value);
                }
              }}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button variant="outline-warning">힌트</Button>
          <Button
            onClick={() => {
              onClickConfirm(answer);
              setAnswer("");
            }}
            variant="outline-info"
          >
            확인
          </Button>
          <Button onClick={onClickPass} variant="outline-danger">
            패스
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}

export default View;
