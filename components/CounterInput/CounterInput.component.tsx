import React, { useEffect, useState } from "react";
import styles from "./CounterInput.module.css";
import cn from "classnames";

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
}) {

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
    <div className="custom-number-input w-32">
      <label
        htmlFor="custom-input-number"
        className="w-full text-sm font-semibold"
      >
        Rating
      </label>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          onClick={(e) => decrement(e)}
          className="bg-secondary hover:bg-secondary-focus transition-all customNumberInputButton h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span className="m-auto text-2xl font-thin text-base-300">−</span>
        </button>
        <input
          onChange={null}
          step={step ? step : null}
          max={max ? max : null}
          min={min ? min : null}
          value={value}
          type="number"
          className={cn([
            styles.customNumberInputInput,
            `customNumberInputInput bg-secondary outline-none border-none focus:ring-0 hover:border-0 text-base-100 focus:outline-none ring-0 text-center w-full font-semibold text-md md:text-basecursor-default flex items-center`,
          ])}
          name="custom-input-number"
        ></input>
        <button
          onClick={(e) => increment(e)}
          className="customNumberInputButton bg-secondary text-base-300 hover:bg-secondary-focus transition-all h-full w-20 rounded-r cursor-pointer"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
}