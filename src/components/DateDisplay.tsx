import { Typography, TypographyProps } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

type DateDisplayProps = {
  date: string | Date | Dayjs | undefined;
  outputFormat?: string;
  typographyProps?: TypographyProps;
  placeholder?: string;
};

const DateDisplay = ({
  date,
  outputFormat = 'DD.MM.YYYY',
  typographyProps,
  placeholder = '-',
}: DateDisplayProps) => {
  if (!date) {
    return <Typography {...typographyProps}>{placeholder}</Typography>;
  }
  return (
    <Typography {...typographyProps}>
      {dayjs(date).format(outputFormat)}
    </Typography>
  );
};

export default DateDisplay;
