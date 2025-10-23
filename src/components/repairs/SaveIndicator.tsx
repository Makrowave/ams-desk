import { Chip } from '@mui/material';

const SaveIndicator = ({ status }: { status: 'success' | 'error' | '' }) => {
  switch (status) {
    case 'success':
      return (
        <Chip
          label="Zapisano"
          color="success"
          sx={{
            width: 120,
            boxShadow: 3,
            bgcolor: 'success.main',
            color: 'success.contrastText',
            fontWeight: 500,
            fontSize: 16,
            borderRadius: 2,
          }}
        />
      );
    case 'error':
      return (
        <Chip
          label="Błąd"
          color="error"
          sx={{
            width: 120,
            boxShadow: 3,
            bgcolor: 'error.main',
            color: 'error.contrastText',
            fontWeight: 500,
            fontSize: 16,
            borderRadius: 2,
          }}
        />
      );
    default:
      return (
        <Chip
          label="Zapisywanie..."
          sx={{
            width: 120,
            boxShadow: 3,
            bgcolor: 'background.paper',
            color: 'text.primary',
            fontWeight: 500,
            fontSize: 16,
            borderRadius: 2,
          }}
        />
      );
  }
};
export default SaveIndicator;
