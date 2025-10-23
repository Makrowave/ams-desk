import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  Paper,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { FaBars, FaCheck, FaPlus, FaTrash, FaXmark } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosAdmin from '../../hooks/useAxiosAdmin';
import DeleteModal from '../../components/modals/DeleteModal';
import ColorInput from '../../components/input/ColorInput';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import FetchSelect from '../../components/filtering/FetchSelect';
import { createQueryHook } from '../../hooks/queryHooks';
import MaterialModal from '../../components/modals/MaterialModal';

//MRT refactor later
const AdminTable = ({
  data,
  url,
  newRowFormat,
  noReorder = false,
  noEdit = false,
  noDelete = false,
  noAdd = false,
  addAsQuery = false,
}) => {
  const [addRowVisible, setAddRowVisible] = useState(false);
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const reorderMutation = useMutation({
    mutationFn: async (els) => {
      const response = await axiosAdmin.put(
        `${url}ChangeOrder?first=${els[0]}&last=${els[1]}`,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData([url], () => data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        console.log('test');
        const destination = location.current.dropTargets[0];
        // if dropped outside of any drop targets
        if (!destination) {
          return;
        }
        // Check if we are dragging rows in same table
        if (source.data.dragId !== destination.data.dragId) {
          return;
        }

        const firstId = source.data.itemId;
        const lastId = destination.data.itemId;
        reorderMutation.mutate([firstId, lastId]);
      },
    });
  }, [data]);

  return (
    <TableContainer
      component={Paper}
      className={`m-8 max-h-[600px] ${className}`}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {newRowFormat.map((item) => (
              <TableCell
                key={item.key}
                align={item.input === 'check' ? 'center' : 'left'}
              >
                {item.label}
              </TableCell>
            ))}
            {!(noDelete && noEdit) && (
              <TableCell align={'center'} className={'w-32'}>
                Akcje
              </TableCell>
            )}
            {!noReorder && (
              <TableCell align={'center'} className={'w-16'}></TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <AdminTableRow
              key={Object.values(item)[0]}
              item={item}
              url={url}
              dragId={url}
              noDelete={noDelete}
              noEdit={noEdit}
              noReorder={noReorder}
              rowFormat={newRowFormat}
            />
          ))}
          {addRowVisible
            ? !noAdd && (
                <AdminTableAddRow
                  format={newRowFormat}
                  url={url}
                  setVisible={setAddRowVisible}
                  noEdit={noEdit}
                  noDelete={noDelete}
                  noReorder={noReorder}
                  addAsQuery={addAsQuery}
                />
              )
            : !noAdd && (
                <TableRow>
                  <TableCell colSpan={newRowFormat.length}></TableCell>
                  <TableCell align={'center'}>
                    <IconButton
                      onClick={() => {
                        setAddRowVisible(true);
                      }}
                      color={'success'}
                      variant="contained"
                    >
                      <FaPlus />
                    </IconButton>
                  </TableCell>
                  {!noReorder && <TableCell></TableCell>}
                </TableRow>
              )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function AdminTableRow({
  item,
  url,
  dragId,
  noEdit,
  noDelete,
  noReorder,
  rowFormat,
}) {
  const itemId = Object.values(item)[0];
  const ref = useRef(null);
  const dragHandleRef = useRef(null);
  const [rowWidth, setRowWidth] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(item);
  const [dragging, setDragging] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const editData = (key, value) => {
    setEditedData((prev) => ({ ...prev, [key]: value }));
  };
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosAdmin.put(url + itemId, editedData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    },
    onSuccess: (data) => {
      setIsEditing(false);
      queryClient.setQueryData([url], (oldData) =>
        oldData.map((oldItem) =>
          Object.values(oldItem)[0] === itemId ? data : oldItem,
        ),
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    // Width
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setRowWidth(rect.height);
    }
    // Dragging
    const el = ref.current;
    const handle = dragHandleRef.current;
    if (el) {
      return draggable({
        element: el,
        dragHandle: handle,
        getInitialData: () => ({ itemId, dragId }),
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false),
      });
    } else {
      console.log('no ref in admin row');
    }
  }, []);
  //Dropping
  useEffect(() => {
    const el = ref.current;
    if (el) {
      return dropTargetForElements({
        element: el,
        getData: () => ({ itemId, dragId }),
        onDragEnter: () => setIsDraggedOver(true),
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: () => setIsDraggedOver(false),
      });
    }
  }, []);
  const startEditing = () => {
    setIsEditing(true);
  };
  const endEditing = () => {
    editMutation.mutate();
  };

  return (
    <TableRow
      key={itemId}
      ref={ref}
      style={{
        opacity: dragging ? 0.4 : 1,
        // borderBottom: isDraggedOver ? "1px solid" : "",
      }}
      className={isDraggedOver ? 'bg-secondary' : ''}
    >
      {Object.entries(item).map(([key, value], index) => (
        <ContentCell
          key={key}
          dataKey={key}
          value={value}
          index={index}
          rowFormat={rowFormat}
          editData={editData}
          editedData={editedData}
          isEditing={isEditing}
          rowWidth={rowWidth}
        />
      ))}
      {!(noDelete && noEdit) && (
        <TableCell align={'center'}>
          <Box className={'flex justify-center'}>
            {isEditing
              ? !noEdit && (
                  <IconButton
                    onClick={endEditing}
                    variant="contained"
                    color={'success'}
                  >
                    <FaCheck />
                  </IconButton>
                )
              : !noEdit && (
                  <IconButton
                    onClick={startEditing}
                    variant="contained"
                    color={'primary'}
                  >
                    <FaEdit />
                  </IconButton>
                )}
            {isEditing
              ? !noDelete && (
                  <IconButton
                    onClick={() => {
                      setIsEditing(false);
                      setEditedData(item);
                    }}
                    color={'error'}
                  >
                    <FaXmark />
                  </IconButton>
                )
              : !noDelete && (
                  <MaterialModal
                    label={'Usuń'}
                    button={
                      <IconButton variant="contained" color={'error'}>
                        <FaTrash />
                      </IconButton>
                    }
                  >
                    <DeleteModal
                      id={itemId}
                      url={url}
                      refetchQueryKey={url}
                      admin
                    />
                  </MaterialModal>
                )}
          </Box>
        </TableCell>
      )}
      {!noReorder && (
        <TableCell>
          <IconButton ref={dragHandleRef}>
            <FaBars />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
}

function AdminTableAddRow({ format, url, setVisible, noReorder, addAsQuery }) {
  const [data, setData] = useState(createAddRowInitialData(format));

  const editData = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosAdmin.post(
        addAsQuery ? `${url}${createQuery(data)}` : url,
        addAsQuery ? {} : data,
        { headers: { 'Content-Type': 'application/json' } },
      );
      return response.data;
    },
    onSuccess: (data) => {
      setVisible(false);
      queryClient.setQueryData([url], (oldData) => {
        const newData = [...oldData];
        newData.push(data);
        return newData;
      });
    },
  });

  const createQuery = (queryObject) => {
    const params = new URLSearchParams();
    Object.entries(queryObject).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
    let queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  };

  return (
    <TableRow>
      {format.map((item) => {
        switch (item.input) {
          case 'color':
            return (
              <ColorPickerCell
                key={item.key}
                value={data[item.key]}
                onChange={(value) => editData(item.key, value)}
              />
            );
          case 'picker':
            return (
              <PickerCell
                key={item.key}
                value={data[item.key]}
                onChange={(value) => editData(item.key, value)}
                pickerData={item.pickerData}
                label={item.label}
              />
            );
          case 'check':
            return (
              <CheckBoxCell
                key={item.key}
                value={data[item.key]}
                onChange={(value) => editData(item.key, value)}
              />
            );
          case 'text':
            return (
              <TextCell
                key={item.key}
                label={item.label}
                value={data[item.key]}
                onChange={(value) => editData(item.key, value)}
              />
            );
          default:
            return <TableCell key={''} />;
        }
      })}
      <TableCell align={'center'}>
        <IconButton
          onClick={() => {
            mutation.mutate();
          }}
          color={'success'}
          variant="contained"
        >
          <FaCheck />
        </IconButton>
        <IconButton
          onClick={() => {
            setVisible(false);
          }}
          variant="contained"
          color={'error'}
        >
          <FaXmark />
        </IconButton>
      </TableCell>
      {!noReorder && <TableCell></TableCell>}
    </TableRow>
  );
}

function ContentCell({
  dataKey,
  value,
  index,
  rowFormat,
  editedData,
  editData,
  isEditing,
  rowWidth,
}) {
  // Undefined - early return
  if (value === null || value === undefined || typeof value === 'object') {
    return <></>;
  }
  const isFetch = rowFormat[index].input === 'picker';
  const pickerData = rowFormat[index].pickerData;
  const hook = createQueryHook(pickerData?.urlKey ?? '');
  const { data, isLoading, isError, error, refetch } = hook(
    pickerData?.params ?? {},
    { enabled: isFetch },
  );
  if (isFetch) {
    return isEditing ? (
      <PickerCell
        value={editedData[dataKey]}
        onChange={(value) => editData(dataKey, value)}
        pickerData={pickerData}
        label={rowFormat[index].label}
      />
    ) : (
      <TableCell>
        {isLoading && <CircularProgress />}
        {!isError &&
          !isLoading &&
          (data.find(
            (item) => item[pickerData.idKey]?.toString() === value.toString(),
          )[pickerData.valueKey] ??
            '')}
      </TableCell>
    );
  }

  // dataKey === hexCode - color editable
  if (dataKey === 'hexCode') {
    return (
      <TableCell
        style={{
          background: isEditing ? editedData[dataKey] : value,
          width: rowWidth ?? 10,
        }}
        key={dataKey}
      >
        {isEditing && (
          <ColorInput
            title={''}
            value={editedData[dataKey]}
            setValue={(v) => editData(dataKey, v)}
          />
        )}
      </TableCell>
    );
  }
  // Booleans - checkbox editable
  if (typeof value === 'boolean') {
    return (
      <TableCell align={'center'}>
        {isEditing ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Checkbox
              checked={editedData[dataKey]}
              onChange={(e) => editData(dataKey, e.target.checked)}
            />
          </Box>
        ) : (
          <SvgIcon>{value ? <FaCheck /> : <FaXmark />}</SvgIcon>
        )}
      </TableCell>
    );
  }
  // Id cell
  if (index === 0) {
    return <TableCell>{value}</TableCell>;
  }
  // Other cells - text editables
  return (
    <TableCell className={'w-60'}>
      {isEditing ? (
        <TextField
          variant="standard"
          value={editedData[dataKey]}
          onChange={(e) => editData(dataKey, e.target.value)}
        />
      ) : (
        value
      )}
    </TableCell>
  );
}

function PickerCell({ value, onChange, pickerData, label }) {
  return (
    <TableCell>
      <FetchSelect
        urlKey={pickerData.urlKey}
        params={pickerData.params}
        value={value}
        onChange={onChange}
        defaultValue={''}
        label={label}
        validated
      />
    </TableCell>
  );
}

function CheckBoxCell({ value, onChange }) {
  return (
    <TableCell>
      <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />
    </TableCell>
  );
}

function TextCell({ value, onChange, label }) {
  return (
    <TableCell>
      <TextField
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="standard"
      />
    </TableCell>
  );
}

function ColorPickerCell({ value, onChange }) {
  return (
    <TableCell>
      <div className={'border border-gray-200 rounded-lg'}>
        <ColorInput title={''} value={value} setValue={onChange} />
      </div>
    </TableCell>
  );
}

const createAddRowInitialData = (format) => {
  return format.reduce((acc, item) => {
    return {
      ...acc,
      ...(item.key !== '' && { [item.key]: createAddRowInitialValue(item) }),
    };
  }, {});
};

const createAddRowInitialValue = (item) => {
  switch (item.input) {
    case 'color':
      return '#ffffff';
    case 'picker':
      return item.default;
    case 'check':
      return false;
    case 'text':
      return '';
    default:
      return item.default ?? '';
  }
};

export default AdminTable;
