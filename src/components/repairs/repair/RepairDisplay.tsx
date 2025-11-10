import { useEffect, useRef, useState } from 'react';
import PartRecord from '../PartRecord';
import {
  generateRepairCostDoc,
  generateRepairNewDoc,
  printRepairCostDoc,
  printRepairDoc,
} from '../../../util/print';
import { formatPhone } from '../../../util/formatting';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaFloppyDisk, FaPencil, FaPlus } from 'react-icons/fa6';
import ServiceRecord from '../ServiceRecord';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate } from '../../../api/axios';
import useSavedData from '../../../hooks/useSavedData';
import SavedDataWarning from '../../navigation/SavedDataWarning';
import ServiceSelectModal from '../../modals/repair/ServiceSelectModal';
import PartSelectModal from '../../modals/repair/PartSelectModal';
import StatusButtons from '../StatusButtons';
import SaveIndicator from '../SaveIndicator';
import URLS from '../../../util/urls';
import MaterialModal from '../../modals/MaterialModal';
import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { FaInfoCircle } from 'react-icons/fa';
import { REPAIR_STATUS } from '../../../util/repairStatuses';
import EditRepairModal from '../../modals/repair/EditRepairModal';
import { Part, Repair, Service } from '../../../types/repairTypes';
import { Employee } from '../../../types/employeeTypes';
import CostsDisplay from './CostsDisplay';
import DateDisplay from '../../DateDisplay';

const RepairDisplay = ({ repair }: { repair: Repair }) => {
  const { isSaved, setIsSaved, updateIsUsed } = useSavedData();
  const [localRepair, setLocalRepair] = useState(repair);
  const noteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  let disabledEditing =
    localRepair.statusId === REPAIR_STATUS.Finished ||
    localRepair.statusId === REPAIR_STATUS.Notified ||
    localRepair.statusId === REPAIR_STATUS.Cancelled ||
    localRepair.statusId === REPAIR_STATUS.Pending ||
    localRepair.statusId === REPAIR_STATUS.Collected;
  const setChangeTimeoutRef = (repair: Repair) => {
    setSaveStatus('');
    if (noteTimeoutRef.current) clearTimeout(noteTimeoutRef.current);
    noteTimeoutRef.current = setTimeout(() => {
      repairMutation.mutate(repair);
    }, 2000);
  };

  const queryClient = useQueryClient();
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | ''>(
    'success',
  );
  const { data, isError, isLoading, error } = useQuery({
    queryKey: [URLS.Employees],
    queryFn: async () => {
      const response = await axiosPrivate.get('Employees');
      return response.data;
    },
  });

  const employeeMutation = useMutation({
    mutationFn: async ([id, collection]: [number, boolean]) => {
      setSaveStatus('');
      const response = await axiosPrivate.put(
        `repairs/employee/${localRepair.id}?employeeId=${id}&collection=${collection}`,
      );
      return response.data;
    },
    onSuccess: async (data) => {
      setIsSaved(true);
      queryClient.setQueryData<Repair>([URLS.Repairs, repair.id], (oldData) => {
        const base = oldData ?? repair;
        const result = {
          ...base,
          repairEmployeeName: data.repairEmployeeName,
          repairEmployeeId: data.repairEmployeeId,
        };
        setLocalRepair(result);
        setSaveStatus('success');
        return result;
      });
    },
    onError: async (error) => {
      setSaveStatus('error');
    },
  });

  const repairMutation = useMutation({
    mutationFn: async (repair: Repair) => {
      setSaveStatus('');
      const response = await axiosPrivate.put(
        `repairs/${repair.id}`,
        JSON.stringify({
          ...repair,
          services: repair.services.map((service) => ({
            serviceDoneId: service.id > 0 ? service.id : 0,
            serviceId: service.service?.id,
            repairId: repair.id,
            price: service.price,
          })),
          parts: repair.parts.map((part) => ({
            partUsedId: part.id > 0 ? part.id : 0,
            partId: part.part?.id,
            repairId: repair.id,
            amount: Number(part.amount),
            price: part.price,
          })),
          status: null,
        }),
      );
      return response.data;
    },
    onSuccess: async (data) => {
      setLocalRepair(data);
      setIsSaved(true);
      queryClient.setQueryData([URLS.Repairs, repair.id], () => {
        return data;
      });
      setSaveStatus('success');
    },
    onError: () => {
      setSaveStatus('error');
    },
  });

  const save = async () => {
    await repairMutation.mutate(localRepair);
  };

  const [newPartId, setNewPartId] = useState(-1);
  const updateParts = (value: Part) => {
    setIsSaved(false);
    const newParts = localRepair.parts;
    const id = newPartId;
    setNewPartId(id - 1);
    const partUsed = {
      id: isNaN(id) ? -1 : id,
      part: value,
      //this might break
      partId: value.id,
      repairId: localRepair.id,
      amount: 1,
      price: value.price,
    };
    newParts.push(partUsed);
    const updatedRepair = { ...localRepair, parts: newParts };
    setLocalRepair(updatedRepair);
    repairMutation.mutate(updatedRepair);
  };

  const changePartAmount = (id: number, value: number) => {
    setIsSaved(false);
    const newParts = localRepair.parts.map((part) =>
      part.id === id ? { ...part, amount: value } : part,
    );
    const updatedRepair = { ...localRepair, parts: newParts };
    setLocalRepair(updatedRepair);
    repairMutation.mutate(updatedRepair);
  };

  const deletePart = (id: number) => {
    setIsSaved(false);
    const newParts = localRepair.parts.filter((part) => part.id !== id);
    const updatedRepair = { ...localRepair, parts: newParts };
    setLocalRepair(updatedRepair);
    repairMutation.mutate(updatedRepair);
  };
  const [newServiceId, setNewServiceId] = useState(-1);
  const updateServices = (value: Service) => {
    setIsSaved(false);
    const newServices = localRepair.services;
    const id = newServiceId;
    setNewServiceId(id - 1);
    const serviceDone = {
      id: isNaN(id) ? -1 : id,
      service: value,
      //this might break
      serviceId: value.id!,
      repairId: localRepair.id,
      price: value.price,
    };
    newServices.push(serviceDone);
    const updatedRepair = { ...localRepair, services: newServices };
    setLocalRepair(updatedRepair);
    repairMutation.mutate(updatedRepair);
  };

  const deleteService = (id: number) => {
    setIsSaved(false);
    const newServices = localRepair.services.filter(
      (service) => service.id !== id,
    );
    const updatedRepair = { ...localRepair, services: newServices };
    setLocalRepair(updatedRepair);
    repairMutation.mutate(updatedRepair);
  };

  const handleRepEmployeeChange = async (id: number) => {
    await employeeMutation.mutate([id, false]);
  };

  const changeDiscount = (value: string) => {
    setIsSaved(false);
    const repair = {
      ...localRepair,
      discount: Number(value.replace(/[^0-9]/g, '')),
    };
    setLocalRepair(repair);
    setChangeTimeoutRef(repair);
  };
  const changeCosts = (value: string) => {
    setIsSaved(false);
    const repair = {
      ...localRepair,
      additionalCosts: Number(value.replace(/[^0-9]/g, '')),
    };
    setLocalRepair(repair);
    setChangeTimeoutRef(repair);
  };

  const router = useRouter();

  const servicesTotal = () => {
    return localRepair.services.reduce((acc, s) => acc + s.price, 0);
  };
  const partsTotal = () => {
    return localRepair.parts.reduce((acc, p) => acc + p.price * p.amount, 0);
  };

  //Handle browser navigation
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isSaved) {
        event.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isSaved]);

  useEffect(() => {
    updateIsUsed(true);
    return () => {
      updateIsUsed(false);
    };
  }, []);
  const [noteFocus, setNoteFocus] = useState(false);

  return (
    <Stack>
      <Paper component={Stack} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => router.back()}>
            <SavedDataWarning>
              <FaArrowLeft />
            </SavedDataWarning>
          </IconButton>
          <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
            <MaterialModal
              label={'Edytuj treść zgłoszenia'}
              button={
                <IconButton
                  color={'primary'}
                  disabled={
                    localRepair.statusId === REPAIR_STATUS.Collected ||
                    localRepair.statusId === REPAIR_STATUS.Cancelled
                  }
                >
                  <FaPencil />
                </IconButton>
              }
            >
              <EditRepairModal
                repair={localRepair}
                updateRepair={setLocalRepair}
              />
            </MaterialModal>
            <IconButton onClick={save} color={'primary'}>
              <FaFloppyDisk />
            </IconButton>
            <SaveIndicator status={saveStatus} />
            <Button
              variant="contained"
              onClick={() => printRepairDoc(generateRepairNewDoc, localRepair)}
            >
              Drukuj zgłoszenie
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                printRepairCostDoc(generateRepairCostDoc, localRepair)
              }
            >
              Drukuj cennik
            </Button>
          </Box>
        </Box>
        <Box component={'section'}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h5">
                Zgłoszenie serwisowe #{localRepair.id}
              </Typography>
              <Chip
                style={{
                  backgroundColor: localRepair.status?.color,
                  borderRadius: 2,
                }}
                label={localRepair.status?.name}
              />
            </Box>
            <StatusButtons
              localRepair={localRepair}
              setIsSaved={setIsSaved}
              setLocalRepair={setLocalRepair}
              setSaveStatus={setSaveStatus}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Stack>
              <Box sx={{ mb: 2, display: 'flex', gap: 4 }}>
                <Card component={Stack} sx={{ width: 120, p: 2 }}>
                  <Typography fontWeight="bold">Data przyjęcia</Typography>
                  <DateDisplay date={localRepair.arrivalDate} />
                </Card>
                {localRepair.collectionDate !== null && (
                  <Card component={Stack} sx={{ width: 120, p: 2 }}>
                    <Typography fontWeight="bold">Data wydania</Typography>
                    <DateDisplay date={localRepair.collectionDate} />
                  </Card>
                )}
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Stack
                  sx={{
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <Card component={Stack} sx={{ width: 120, p: 2 }}>
                    <Typography fontWeight="bold">Telefon</Typography>
                    <Typography>
                      {formatPhone(localRepair.phoneNumber)}
                    </Typography>
                  </Card>
                  <Card component={Stack} sx={{ width: 120, p: 2 }}>
                    <Typography fontWeight="bold">Rower</Typography>
                    <Typography>{localRepair.bikeName}</Typography>
                  </Card>
                </Stack>
                <CostsDisplay
                  repair={localRepair}
                  servicesCostTotal={servicesTotal()}
                  partsCostTotal={partsTotal()}
                  changeCosts={changeCosts}
                  changeDiscount={changeDiscount}
                />
              </Box>
              <Card component={Stack} sx={{ marginTop: 2, p: 2 }}>
                <Typography fontWeight="bold">Treść</Typography>
                <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                  {localRepair.issue}
                </Typography>
              </Card>
            </Stack>
            <Stack sx={{ gap: 4 }}>
              <Box sx={{ display: 'flex', gap: 4 }}>
                <Card component={Stack} sx={{ marginTop: 2, p: 2 }}>
                  <Typography fontWeight="bold">Kto przyjmował</Typography>
                  <Typography>{localRepair.takeInEmployeeName}</Typography>
                </Card>
                {localRepair.repairEmployeeId !== null && (
                  <Card component={Stack} sx={{ marginTop: 2, p: 2 }}>
                    <Typography fontWeight="bold">
                      {localRepair.statusId === 7 ||
                      localRepair.statusId === 6 ||
                      localRepair.statusId === 5
                        ? 'Kto naprawiał'
                        : 'Kto naprawia'}
                    </Typography>
                    {localRepair.statusId === 7 ||
                    localRepair.statusId === 6 ||
                    localRepair.statusId === 5 ? (
                      <Typography>{localRepair.repairEmployeeName}</Typography>
                    ) : (
                      <Select
                        variant="standard"
                        value={localRepair.repairEmployeeId}
                        onChange={(e) =>
                          handleRepEmployeeChange(Number(e.target.value))
                        }
                      >
                        {!isError &&
                          !isLoading &&
                          data.map((employee: Employee) => (
                            <MenuItem key={employee.id} value={employee.id}>
                              {employee.name}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  </Card>
                )}
                {localRepair.collectionEmployeeId !== null && (
                  <Card component={Stack} sx={{ marginTop: 2, p: 2 }}>
                    <Typography fontWeight="bold">Kto wydał</Typography>
                    <Typography>
                      {localRepair.collectionEmployeeName}
                    </Typography>
                  </Card>
                )}
              </Box>
              <Card>
                <TextField
                  multiline
                  minRows={10}
                  fullWidth
                  label="Notatka"
                  variant="outlined"
                  placeholder="Notatka"
                  value={localRepair.note ?? ''}
                  onChange={(e) => {
                    setLocalRepair({ ...localRepair, note: e.target.value });
                    setIsSaved(false);
                    setChangeTimeoutRef({
                      ...localRepair,
                      note: e.target.value,
                    });
                  }}
                  onFocus={() => {
                    setNoteFocus(true);
                  }}
                  onBlur={() => {
                    setNoteFocus(false);
                  }}
                />
              </Card>
            </Stack>
          </Box>
        </Box>
      </Paper>
      <Box component={'section'} sx={{ display: 'flex', gap: 10, mt: 2 }}>
        <Paper sx={{ flex: 1, p: 2 }}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" fontWeight={'bold'}>
                Usługi
              </Typography>

              <MaterialModal
                label={'Dodaj część'}
                button={
                  <IconButton
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: '20%',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                    disabled={disabledEditing}
                  >
                    <FaPlus />
                  </IconButton>
                }
              >
                <ServiceSelectModal mutation={updateServices} />
              </MaterialModal>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Lp.</TableCell>
                  <TableCell>Nazwa</TableCell>
                  <Tooltip
                    title={
                      'Cena z obecną ceną są różne, jeśli ktoś zmienił cennik usług. Usuń i dodaj usługę, jeśli chcesz mieć obecną cenę na zgłoszeniu.'
                    }
                  >
                    <TableCell
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      Cena (Obecna) <FaInfoCircle />
                    </TableCell>
                  </Tooltip>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {localRepair.services.map((service, index) => (
                  <ServiceRecord
                    index={index}
                    service={service}
                    key={service.id}
                    deleteFn={deleteService}
                  />
                ))}
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <Typography fontWeight="bold">Suma:</Typography>
                  </TableCell>
                  <TableCell>{servicesTotal().toFixed(2)}</TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Paper>
        <Paper sx={{ flex: 1, p: 2 }}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" fontWeight={'bold'}>
                Części
              </Typography>
              <MaterialModal
                label={'Dodaj część'}
                button={
                  <IconButton
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: '20%',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                    disabled={disabledEditing}
                  >
                    <FaPlus />
                  </IconButton>
                }
              >
                <PartSelectModal mutation={updateParts} />
              </MaterialModal>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Lp.</TableCell>
                  <TableCell>Nazwa</TableCell>
                  <Tooltip
                    title={
                      'Cena z obecną ceną są różne, jeśli ktoś w międzyczasie edytował część. Usuń i dodaj część, jeśli chcesz mieć obecną cenę na zgłoszeniu.'
                    }
                  >
                    <TableCell>
                      Cena (Obecna) <FaInfoCircle />
                    </TableCell>
                  </Tooltip>
                  <TableCell>Ilość</TableCell>
                  <TableCell>Suma</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {localRepair.parts.map((part, index) => (
                  <PartRecord
                    index={index}
                    part={part}
                    changeAmount={changePartAmount}
                    deleteFn={deletePart}
                    key={part.id}
                  />
                ))}
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell>
                    <Typography fontWeight="bold">Suma:</Typography>
                  </TableCell>
                  <TableCell>{partsTotal().toFixed(2)}</TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Box>
    </Stack>
  );
};

export default RepairDisplay;
