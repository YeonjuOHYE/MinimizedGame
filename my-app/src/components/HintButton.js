import React, { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";

const HintButton = (props) => {

    const { hintArr } = props;

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);


    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    return (
        <>
            <OverlayTrigger
                show={show}
                target={target}
                placement="top"
                trigger={['hover']}
                overlay={
                    <Popover id="popover-contained" style={{ width: 200 }}>
                        <Popover.Title as="h3">힌트</Popover.Title>
                        <Popover.Content>
                            {Array.from(hintArr).map(hint => <div>{hint}</div>)}
                        </Popover.Content>
                    </Popover>}
            >
                <Button onClick={handleClick} variant="outline-warning">힌트</Button>
            </OverlayTrigger>
        </>
    )
}

export default HintButton;