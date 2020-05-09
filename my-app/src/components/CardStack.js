import React, { useLayoutEffect, useState } from "react";
import Stack from "../common/Stack";

const CradStack = (props) => {
  const { effect, imgs, reject, accept } = props;
  const [stack, setStack] = useState(null);

  useLayoutEffect(() => {
    let stack = new Stack(document.getElementById("stack"));
    setStack(stack);
  }, []);

  return (
    <div className="stack-container">
      <ul id="stack" className={`stack stack--${effect}`}>
        {imgs &&
          imgs.map((img, i) => (
            <li key={i} className="stack__item">
              <img width="150px" src={img} />
            </li>
          ))}
      </ul>
      <div className="controls">
        <div>
          <button onClick={() => stack.reject.bind(stack)()}>거절한다.</button>
          <button onClick={() => stack.accept.bind(stack)()}>수용한다.</button>
        </div>
      </div>
    </div>
  );
};

export default CradStack;
