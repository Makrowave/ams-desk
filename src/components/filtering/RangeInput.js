import {useEffect, useRef, useState} from "react";
import {Box, TextField} from "@mui/material";

//Component that contains 2 input fields that
//represend range (most likely price range).
//Should be used in filtering and only in filtering to prevent creation of
//multiple queries for every single number.
//If used in modyfing params which are passed to be sent later,
//it might cause to send the old state values.
export default function RangeInput({minValue, maxValue, title, setMin, setMax}) {
  const [realMin, setRealMin] = useState(minValue);
  const [realMax, setRealMax] = useState(maxValue);

  const prevMinValue = useRef(realMin);
  const prevMaxValue = useRef(realMax);

  //Change shown values when parent changes values externally
  //example: parent's reset function
  useEffect(() => {
    //Prevent infinite loop
    if (minValue !== prevMinValue.current) {
      setRealMin(minValue);
      prevMinValue.current = minValue;
    }
    if (maxValue !== prevMaxValue.current) {
      setRealMax(maxValue);
      prevMaxValue.current = maxValue;
    }
  }, [minValue, maxValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setMin(realMin);
      setMax(realMax);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [realMin, realMax]);

  function handleChange(func, value) {
    if (value === "" || value === null || value < 0) func(0);
    else {
      value = removeLeadingZeros(value);
      func(value);
    }
  }

  function removeLeadingZeros(value) {
    while (value.length > 1 && value[0] === "0") value = value.slice(1);
    return value;
  }

  return (
    <Box className={'flex justify-between align-center mt-1'}>
      <TextField
        type='number'
        className=' text-center bg-primary border-2 border-tertiary rounded w-2/5 block'
        label='Cena min'
        value={realMin}
        onChange={(e) => handleChange(setRealMin, e.target.value)}
      />
      <span className='m-auto block'>-</span>
      <TextField
        type='number'
        className=' text-center bg-primary border-2 border-tertiary rounded w-2/5 block'
        label='Cena max'
        value={realMax}
        onChange={(e) => handleChange(setRealMax, e.target.value)}
      />
    </Box>
  );
}
