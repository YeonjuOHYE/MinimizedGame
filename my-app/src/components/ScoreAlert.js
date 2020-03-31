import React, { useState, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ScoreAlert = (props) => {

    const { show, correct, setShow } = props;


    return (
        <Modal
            show={show}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => setShow(false)}
        >
            <Modal.Header style={{ margin: "0 auto" }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {correct ? "정답" : "오답"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { setShow(false) }}>Close</Button>
            </Modal.Footer>
        </Modal>
    );


}

export default ScoreAlert;