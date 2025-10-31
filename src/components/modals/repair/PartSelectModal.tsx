import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import AddPartModal from '../..//modals/repair/AddPartModal';
import {
  useFilteredPartsQuery,
  usePartCategoriesQuery,
  usePartTypesQuery,
} from '../../../hooks/queryHooks';
import MaterialModal from '../../modals/MaterialModal';
import { Part, PartCategory, PartType } from '../../../types/repairTypes';
import { strFind } from '../../../util/repairsHelper';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  CircularProgress,
  Button,
  Stack,
  Typography,
  Paper,
  Divider,
} from '@mui/material';

type PartSelectModalProps = {
  mutation: (part: Part) => void;
  closeModal?: () => void;
};

const PartSelectModal = ({ mutation, closeModal }: PartSelectModalProps) => {
  const [categoryId, setCategoryId] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const [text, setText] = useState('');
  // Fetch categories
  const {
    data: catData,
    isLoading: catIsLoading,
    isError: catIsError,
  } = usePartCategoriesQuery<PartCategory[]>();

  //Fetch types based on selected category
  const {
    data: typeData,
    isLoading: typeIsLoading,
    isError: typeIsError,
  } = usePartTypesQuery<PartType[]>({ id: categoryId });

  // Fetch parts based on selected part type
  const {
    data: partData,
    isLoading: partIsLoading,
    isError: partIsError,
  } = useFilteredPartsQuery<Part[]>({
    categoryId: categoryId,
    typeId: typeId,
  });

  const handleOnClick = (record: Part) => {
    mutation(record);
    setText('');
    if (closeModal) closeModal();
  };

  return (
    <Box
      sx={{ position: 'relative', display: 'inline-block', width: '1000px' }}
    >
      <Stack direction="row" spacing={0} sx={{ display: 'flex' }}>
        {/* Category List */}
        <Box
          sx={{
            width: '25%',
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
                    onClick={() => {
                      setCategoryId(category.id);
                      setTypeId(0);
                    }}
                  >
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                ),
              )}
          </List>
        </Box>

        {/* Type List */}
        <Box
          sx={{
            width: '33%',
            paddingX: 2,
            borderRight: '1px solid',
            borderColor: 'divider',
            maxHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Typ
          </Typography>
          <List
            sx={{
              flex: 1,
              overflow: 'auto',
              padding: 0,
              gap: 1,
            }}
          >
            {typeIsLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress size={24} />
              </Box>
            )}
            {!typeIsLoading &&
              !typeIsError &&
              [{ id: 0, name: 'Wszystkie' }, ...(typeData ?? [])].map(
                (type) => (
                  <ListItemButton
                    key={type.id}
                    selected={typeId === type.id}
                    onClick={() => setTypeId(type.id)}
                  >
                    <ListItemText primary={type.name} />
                  </ListItemButton>
                ),
              )}
          </List>
        </Box>

        {/* Part List */}
        <Box
          sx={{
            width: '42%',
            paddingLeft: 2,
            maxHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Część
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Część"
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
            {partIsLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress size={24} />
              </Box>
            )}
            {!partIsLoading &&
              !partIsError &&
              partData!
                .filter((part) => strFind(part.name, text))
                .map((part) => (
                  <Box key={part.id}>
                    <ListItemButton
                      onClick={() => handleOnClick(part)}
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
                            {part.partType?.partCategory?.name}
                            {typeId === 0 && categoryId === 0 && ' - '}
                            {typeId === 0 && part.partType?.name}
                          </Typography>
                        )}
                        <Typography variant="body2" sx={{ display: 'block' }}>
                          {part.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          marginLeft: 2,
                          minWidth: '64px',
                          textAlign: 'right',
                        }}
                      >
                        {part.price.toFixed(2)}
                      </Typography>
                    </ListItemButton>
                  </Box>
                ))}
          </List>
        </Box>
      </Stack>

      <MaterialModal
        label={'Dodaj część'}
        button={
          <Button
            size="small"
            sx={{
              position: 'absolute',
              top: 4,
              right: 20,
            }}
          >
            <FaPlus />
          </Button>
        }
      >
        <AddPartModal />
      </MaterialModal>
    </Box>
  );
};

export default PartSelectModal;
