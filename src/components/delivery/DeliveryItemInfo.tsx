import { Box, CircularProgress, Fade, Grid } from '@mui/material';
import {
  Delivery,
  DeliveryItem,
  DeliveryModel,
} from '../../types/deliveryTypes';
import { useState } from 'react';
import DeliveryModelDisplay from './DeliveryModelDisplay';
import DeliveryModelEdit from './DeliveryModelEdit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import URLS from '../../util/urls';

const DeliveryItemInfo = ({
  item,
  deliveryId,
}: {
  item: DeliveryItem;
  deliveryId: number;
}) => {
  const model = item.deliveryModel;

  const [editData, setEditData] = useState(item.deliveryModel);

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      field,
      value,
    }: {
      field: keyof DeliveryModel;
      value: any;
    }) => {
      const response = await axiosPrivate.patch(URLS.TemporaryModel, {
        id: item.temporaryModelId,
        eanCode: editData.eanCode,
        [field]: value,
      });

      return response.data;
    },
    onSuccess: (updatedModel: DeliveryModel, { field }) => {
      queryClient.setQueryData<Delivery>(
        [URLS.Deliveries, deliveryId],
        (oldData) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            deliveryDocuments: oldData.deliveryDocuments.map((doc) => ({
              ...doc,
              items: doc.items?.map((itm) =>
                itm.id === item.id
                  ? {
                      ...itm,
                      deliveryModel: {
                        ...itm.deliveryModel,
                        [field]: updatedModel[field],
                      },
                    }
                  : itm,
              ),
            })),
          };
        },
      );
    },
  });

  const handleSave = (field: keyof DeliveryModel, value: any) => {
    mutation.mutate({ field, value });
  };

  return (
    <Box
      sx={{ display: 'flex', flexGrow: 1, width: '100%', position: 'relative' }}
    >
      <Fade in={mutation.isPending}>
        <Box
          sx={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              bgcolor: 'rgba(0, 0, 0, 0.05)',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
              zIndex: 10,
            }}
          />
          <CircularProgress
            size={60}
            sx={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              zIndex: 11,
            }}
          />
        </Box>
      </Fade>
      <Grid
        container
        spacing={2}
        padding={2}
        sx={{
          flexGrow: 1,
          width: '100%',
          filter: mutation.isPending ? 'blur(4px)' : 'none',
          transition: 'filter 0.4s ease',
        }}
      >
        {item.modelId ? (
          <DeliveryModelDisplay model={model} />
        ) : (
          <DeliveryModelEdit
            editData={editData}
            setEditData={setEditData}
            handleSave={handleSave}
          />
        )}
      </Grid>
    </Box>
  );
};

export default DeliveryItemInfo;
