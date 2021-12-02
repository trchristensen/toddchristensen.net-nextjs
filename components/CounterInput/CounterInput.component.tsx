import React, { useEffect, useState } from "react";

interface ICounterInput {
  onCounterChange: Function;
  min?: number | null;
  max?: number | null;
  step?: number | null;
}

export default function CounterInput({
  onCounterChange,
  min = null,
  max = null,
  step = 1,
}): React.ReactElement {
  const [value, setValue] = useState(0);

  const increment = (e) => {
    e.preventDefault();

    if (max && value >= max) {
      return;
    } else {
      setValue((prevState) => prevState + step);
    }
  };
  const decrement = (e) => {
    e.preventDefault();
    if (min && value <= min) {
      return;
    } else {
      setValue((prevState) => prevState - step);
    }
  };

  useEffect(() => {
    onCounterChange(value);
  }, [value]);

  return (
    <div className="custom-number-input w-32 border-gray-300">
      <label
        htmlFor="custom-input-number"
        className="w-full text-gray-800 dark:text-gray-200 text-sm font-semibold"
      >
        Rating
      </label>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          onClick={(e) => decrement(e)}
          className=" bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-700 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          step={step ? step : null}
          max={max ? max : null}
          min={min ? min : null}
          value={value}
          type="number"
          className="outline-none focus:outline-none text-center w-full bg-white dark:bg-gray-800 font-semibold text-md text-gray-900 dark:text-gray-100  md:text-basecursor-default flex items-center"
          name="custom-input-number"
        ></input>
        <button
          onClick={(e) => increment(e)}
          className="bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-700 h-full w-20 rounded-r cursor-pointer"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
}

{
  /* <style>
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-number-input input:focus {
    outline: none !important;
  }

  .custom-number-input button:focus {
    outline: none !important;
  }
</style> */
}
