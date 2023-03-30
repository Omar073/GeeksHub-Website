import React, { useState } from 'react';

function CounterButton() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <div>
            <button onClick={handleClick}>Click me!</button>
            <p>You've clicked the button {count} times.</p>
        </div>
    );
}

export default CounterButton;