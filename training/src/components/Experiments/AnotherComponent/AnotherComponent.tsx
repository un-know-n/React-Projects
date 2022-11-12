import React, { forwardRef, useImperativeHandle, useRef } from 'react';

type Props = {};

export const AnotherComponent = forwardRef((props: Props, ref) => {
  const inputRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return (
    <>
      <div>
        <input ref={inputRef} type="text" />
      </div>
    </>
  );
});
