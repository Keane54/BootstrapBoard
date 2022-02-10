import React, { useState, useEffect } from 'react';

export const SecondsSinceLastBlock = (props) => {

    // Gets passed current block from parent component.
    const { currentBlock } = props;

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

        // Set a start time.
        const startTime = Math.floor((Date.now() / 1000));

        const intervalID = setInterval(() => {

            // Get current time every second.
            const currentTime = Math.floor(Date.now() / 1000)

            // Calculate difference between current time and start time and sets state.
            setSeconds(currentTime - startTime);
        }, 1000);

        return () => {

            // When currentBlock changes, set timer back to 0 and clear previous interval.
            setSeconds(0);
            clearInterval(intervalID);
        };

    }, [currentBlock])

    return <h4>Time since previous block: {seconds}s</h4>
}