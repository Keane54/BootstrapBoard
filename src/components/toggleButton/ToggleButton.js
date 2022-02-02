import React from "react";
import { Button, Form } from "react-bootstrap";

export const ToggleButton = (props) => {
    const { changeDenomination, isUSD } = props;

    return (
        // Calls function on click and sets to opposite of current state.
        <Form.Switch className="d-flex justify-content-center" onClick={changeDenomination} label={isUSD === true ? "$" : "₿"}></Form.Switch>
    )
}