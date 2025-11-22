import { Add } from '@mui/icons-material';
import { Button, ListItemIcon, MenuItem } from '@mui/material';
import useModal from '../../../hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import URLS from '../../../util/urls';
import { Delivery } from '../../../types/deliveryTypes';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
const AddToStorageModal = ({
  itemId,
  deliveryId,
}: {
  itemId: number;
  deliveryId: number;
}) => {
  const { Modal, setOpen } = useModal({
    button: (
      <MenuItem key={1} sx={{ m: 0 }} color="warning">
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        Wprowadź na magazyn
      </MenuItem>
    ),
    label: 'Wprowadź na magazyn',
  });

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.post(
        URLS.DeliveryItemAddToStorage + itemId,
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Delivery>(
        [URLS.Delivery, deliveryId],
        (oldData) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            deliveryDocuments: oldData.deliveryDocuments.map((doc) => ({
              ...doc,
              deliveryItems: doc.deliveryItems?.map((itm) =>
                itm.id === itemId ? data : itm,
              ),
            })),
          };
        },
      );
      setOpen(false);
    },
  });

  return (
    <Modal>
      <Button variant="contained" onClick={() => mutation.mutate()}>
        Potwierdź
      </Button>
    </Modal>
  );
};
export default AddToStorageModal;
