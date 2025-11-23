import { Box, Typography } from '@mui/material';

type ErrorDisplayProps = {
  message: string;
  isVisible: boolean;
};

const ErrorDisplay = ({ message, isVisible }: ErrorDisplayProps) => {
  return isVisible ? (
    <Box
      sx={{
        bgcolor: 'error.light',
        p: 1,
        mt: 2,
        border: 1,
        borderColor: 'error.main',
        textAlign: 'center',
        alignSelf: 'center',
        maxWidth: '300px',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" color="error.contrastText">
        {message}
      </Typography>
    </Box>
  ) : null;
};

export default ErrorDisplay;
