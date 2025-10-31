import { FaRegCircleXmark } from 'react-icons/fa6';
import { ServiceDone } from '../../types/repairTypes';
import { TableRow, TableCell, IconButton, Box } from '@mui/material';

type ServiceRecordProps = {
  index: number;
  service: ServiceDone;
  deleteFn: (id: number) => void;
};

const ServiceRecord = ({ index, service, deleteFn }: ServiceRecordProps) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{service.service?.name}</TableCell>
      <TableCell>
        {service.price.toFixed(2)} ({service.service?.price.toFixed(2)})
      </TableCell>
      <TableCell align="center">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton
            size="small"
            onClick={() => deleteFn(service.id)}
            sx={{
              p: 1,
              borderRadius: 2,
              '&:hover': { backgroundColor: 'grey.200' },
            }}
          >
            <FaRegCircleXmark style={{ color: '#e53935' }} />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ServiceRecord;
