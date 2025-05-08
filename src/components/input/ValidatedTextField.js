import {TextField} from "@mui/material";

export default function ValidatedTextField({label, value, onChange, regex, otherProps = {}}) {
  return (
    <TextField label={label} {...otherProps} value={value} onChange={onChange} error={!regex.test(value)}/>
  )
}