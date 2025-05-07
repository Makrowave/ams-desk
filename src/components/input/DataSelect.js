import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";


export function DataSelect({defaultValue, defaultLabel, value, onChange, options, label}) {
  const data = formatData(options ?? []);
  const isColored = data[0] !== undefined ? Object.keys(data[0]).includes("hexCode") : false

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <FormControl fullWidth variant="filled">
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        labelId={label}
        variant={"filled"}>
        <MenuItem value={defaultValue}>
          <MenuItemChild option={{value: defaultValue, label: defaultLabel, ...(isColored && {color: '#ffffff'})}}/>
        </MenuItem>
        {
          data.map((option) => (
            <MenuItem value={option.value}>
              <MenuItemChild option={option} key={option.value}/>
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

function MenuItemChild({option}) {
  return (
    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
      {option.color && <Box sx={{
        backgroundColor: option.color, width: 20,
        height: 20,
      }}/>}
      {option.label}
    </Box>
  );
}

/**
 * Formats data
 * @param data
 * @returns {Array<{ value: any, label: any, color: string | undefined }>}
 */
const formatData = (data) => {
  if (data === undefined || data === null || data.length === 0) return [];
  return data.map(item => {
    const entries = Object.entries(item);
    const color = entries.find(entry => entry[0] === "hexCode")
    return {value: entries[0][1].toString(), label: entries[1][1], ...(color && {color: color[1]})};
  })
}
