import { useState } from 'react';
import {
  useServiceCategoriesQuery,
  useServicesFromCategoryQuery,
} from '../../../hooks/queryHooks';
import { Service, ServiceCategory } from '../../../types/repairTypes';
import { strFind } from '../../../util/repairsHelper';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

type ServiceSelectModalProps = {
  mutation: (service: Service) => void;
  closeModal?: () => void;
};

const ServiceSelectModal = ({
  mutation,
  closeModal,
}: ServiceSelectModalProps) => {
  const [categoryId, setCategoryId] = useState(0);
  const [text, setText] = useState('');
  // Fetch categories
  const {
    data: catData,
    isLoading: catIsLoading,
    isError: catIsError,
  } = useServiceCategoriesQuery<ServiceCategory[]>();

  // Fetch services based on selected category
  const {
    data: serData,
    isLoading: serIsLoading,
    isError: serIsError,
  } = useServicesFromCategoryQuery<Service[]>({ id: categoryId });

  const handleOnClick = (record: Service) => {
    mutation(record);
    setText('');
    if (closeModal) closeModal();
  };

  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{ width: '1000px', display: 'flex' }}
    >
      {/* Category List */}
      <Box
        sx={{
          width: '33%',
          paddingRight: 2,
          borderRight: '1px solid',
          borderColor: 'divider',
          maxHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Kategoria
        </Typography>
        <List
          sx={{
            flex: 1,
            overflow: 'auto',
            padding: 0,
            gap: 1,
          }}
        >
          {catIsLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
          {!catIsLoading &&
            !catIsError &&
            [{ id: 0, name: 'Wszystkie' }, ...(catData ?? [])].map(
              (category) => (
                <ListItemButton
                  key={category.id}
                  selected={categoryId === category.id}
                  onClick={() => setCategoryId(category.id)}
                >
                  <ListItemText primary={category.name} />
                </ListItemButton>
              ),
            )}
        </List>
      </Box>

      {/* Services List */}
      <Box
        sx={{
          width: '67%',
          paddingLeft: 2,
          maxHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Usługa
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Usługa"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <List
          sx={{
            flex: 1,
            overflow: 'auto',
            padding: 0,
          }}
        >
          {serIsLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
          {!serIsLoading &&
            !serIsError &&
            serData!
              .filter((service) => strFind(service.name, text))
              .map((service) => (
                <Box key={service.id}>
                  <ListItemButton
                    onClick={() => handleOnClick(service)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 2,
                      borderRight: '1px solid',
                      borderColor: 'divider',
                      mb: 1,
                      borderRadius: 1,
                    }}
                  >
                    <Box sx={{ flex: 1, textAlign: 'start' }}>
                      {categoryId === 0 && (
                        <Typography
                          variant="caption"
                          sx={{
                            textDecoration: 'underline',
                            color: 'text.secondary',
                            display: 'block',
                          }}
                        >
                          {service.serviceCategory?.name}
                        </Typography>
                      )}
                      <Typography variant="body2" sx={{ display: 'block' }}>
                        {service.name}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        marginLeft: 2,
                        minWidth: '40px',
                        textAlign: 'right',
                      }}
                    >
                      {service.price}
                    </Typography>
                  </ListItemButton>
                </Box>
              ))}
        </List>
      </Box>
    </Stack>
  );
};

export default ServiceSelectModal;
