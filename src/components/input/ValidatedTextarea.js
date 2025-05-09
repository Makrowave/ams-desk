import {TextField} from "@mui/material";

export default function ValidatedTextarea({placeholder, value, onChange, regex, otherProps = {}}) {
  return (
    <TextField placeholder={placeholder} {...otherProps} value={value} multiline
               onChange={(e) => onChange(e.target.value)}
               error={!regex.test(value)}/>
  )
}