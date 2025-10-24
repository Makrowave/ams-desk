'use client';
import { Box } from '@mui/material';
import Navigation from '../../../components/navigation/Navigation';
import RepairDisplay from '../../../components/repairs/repair/RepairDisplay';
import PrivateRoute from '../../../components/routing/PrivateRoute';
import { useRepairsQuery } from '../../../hooks/queryHooks';
import { Repair } from '../../../types/repairTypes';

function RepairPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, isPending, isError, error } = useRepairsQuery<Repair>({
    id: Number(id),
  });

  return (
    <PrivateRoute>
      <Navigation />
      <Box
        component={'main'}
        sx={{ overflowY: 'auto', height: 'h-calc(100vh - 48px)' }}
      >
        <Box className="w-full h-full">
          <Box
            sx={{ py: 6, px: 12, height: 'fit-content' }}
            className="main-div"
          >
            {!(isPending || isError) && <RepairDisplay repair={data} />}
          </Box>
        </Box>
      </Box>
    </PrivateRoute>
  );
}

export default RepairPage;
