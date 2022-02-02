import React from "react";
import { Button } from "react-bootstrap";

export const ToggleButton = (props) => {
    const { changeDenomination, isUSD } = props;

    return (
        // Calls function on click and sets to opposite of current state.
        <Button variant="outline-dark" size="sm" onClick={changeDenomination}>{isUSD === true ? "₿" : "$"}</Button>
    )
}