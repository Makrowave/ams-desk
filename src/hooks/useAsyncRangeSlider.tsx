'use client';
import { useRef, useState, useCallback } from 'react';
import { Slider, Stack, Typography } from '@mui/material';

type RangeInputProps = {
  minValue: number;
  maxValue: number;
  title?: string;
  setMin: (value: number) => void;
  setMax: (value: number) => void;
  step: number;
  min?: number;
  max?: number;
};

const useAsyncRangeSlider = ({
  minValue,
  maxValue,
  title,
  setMin,
  setMax,
  step,
  min,
  max,
}: RangeInputProps) => {
  const [localMin, setLocalMin] = useState(minValue);
  const [localMax, setLocalMax] = useState(maxValue);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Store setMin and setMax in refs to avoid recreating handleChange
  const setMinRef = useRef(setMin);
  const setMaxRef = useRef(setMax);

  // Update refs when callbacks change
  setMinRef.current = setMin;
  setMaxRef.current = setMax;

  const reset = useCallback(() => {
    setLocalMin(minValue);
    setLocalMax(maxValue);
  }, [minValue, maxValue]);

  const handleChange = useCallback((value: [number, number]) => {
    setLocalMin(value[0]);
    setLocalMax(value[1]);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setMinRef.current(value[0]);
      setMaxRef.current(value[1]);
    }, 700);
  }, []);

  const rangeInput = (
    <Stack>
      <Typography>{title}</Typography>
      <Slider
        value={[localMin, localMax]}
        onChange={(e, newValue) => handleChange(newValue as [number, number])}
        valueLabelDisplay="auto"
        step={step}
        min={min}
        max={max}
        // marks
      />
    </Stack>
  );

  return { rangeInput, reset };
};

export default useAsyncRangeSlider;
