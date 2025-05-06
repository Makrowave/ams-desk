import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import {FaEdit} from "react-icons/fa";
import {FaCheck, FaPlus, FaTrash, FaXmark} from "react-icons/fa6";
import {useEffect, useRef, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import URLS from "@/util/urls";
import useAxiosAdmin from "@/hooks/useAxiosAdmin";
import useModal from "@/hooks/useModal";
import DeleteModal from "@/components/modals/DeleteModal";
import ColorInput from "@/components/input/ColorInput";

export default function AdminTable({headers, data, url, newRowFormat}) {
  const [addRowVisible, setAddRowVisible] = useState(false);
  return (
    <TableContainer component={Paper} className={"m-8 h-[600px]"}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map(header => <TableCell>{header}</TableCell>)}
            <TableCell align={"center"}>Akcje</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((item) => (
              <AdminTableRow item={item} url={url}/>
            ))
          }
          {
            addRowVisible
              ? <AdminTableAddRow format={newRowFormat} url={url} setVisible={setAddRowVisible}/>
              : (
                <TableRow>
                  <TableCell colSpan={headers.length + 1} align={"right"}>
                    <IconButton onClick={() => {
                      setAddRowVisible(true)
                    }} color={"success"} variant="contained">
                      <FaPlus/>
                    </IconButton>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function AdminTableRow({item, url}) {
  const itemId = Object.values(item)[0]
  const heightRef = useRef(null);
  const [rowWidth, setRowWidth] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(item);
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal()
  const editData = (key, value) => {
    setEditedData(prev => ({...prev, [key]: value}));
  }
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosAdmin.put(
        url + itemId,
        editedData,
        {
          headers: {"Content-Type": "application/json"},
        }
      );
      return response.data
    },
    onSuccess: (data) => {
      setIsEditing(false);
      queryClient.setQueryData([URLS.Colors], (oldData) => (
        oldData.map(oldItem => Object.values(oldItem)[0] === itemId ? data : oldItem)
      ));
    },
    onError: (error) => {
      console.log(error);
    },
  });


  useEffect(() => {
    if (heightRef.current) {
      const rect = heightRef.current.getBoundingClientRect();
      setRowWidth(rect.height);
    }
  }, []);

  const startEditing = () => {
    setIsEditing(true);
  }
  const endEditing = () => {
    mutation.mutate()
  }
  const renderCellContent = (key, value, index) => {
    if (key === "hexCode") {
      return (
        <TableCell style={{background: isEditing ? editedData[key] : item.hexCode, width: rowWidth ?? 10}} key={key}>
          {isEditing && <ColorInput title={""} value={editedData[key]} setValue={(v) => editData(key, v)}/>}
        </TableCell>
      )
    } else if (index === 0) {
      return <TableCell>{value}</TableCell>
    } else {
      return (
        <TableCell className={"w-60"}>
          {
            isEditing
              ? <TextField variant="standard" value={editedData[key]} onChange={(e) => editData(key, e.target.value)}/>
              : value
          }
        </TableCell>
      )
    }
  }

  return (
    <TableRow key={itemId} ref={heightRef}>
      {
        Object.entries(item).map(([key, value], index) => (
          renderCellContent(key, value, index)
        ))
      }
      <TableCell>
        <IconButton onClick={() => {
          isEditing ? endEditing() : startEditing();
        }} variant="contained" color={"primary"}>
          {isEditing ? <FaCheck/> : <FaEdit/>}
        </IconButton>
        <IconButton variant="contained" color={"error"} onClick={() => {
          setModalTitle("Usuń")
          setModalContent(<DeleteModal id={itemId} url={url} refetchQueryKey={url} admin/>)
          setIsModalOpen(true)
        }}>
          <FaTrash/>
        </IconButton>
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  )
}

function AdminTableAddRow({format, url, setVisible}) {
  const [data, setData] = useState({});

  const editData = (key, value) => {
    setData(prev => ({...prev, [key]: value}));
  }

  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosAdmin.post(url, data, {headers: {"Content-Type": "application/json"}});
      return response.data;
    },
    onSuccess: (data) => {
      setVisible(false);
      queryClient.setQueryData([url], (oldData) => {
        const newData = [...oldData];
        newData.push(data);
        return newData;
      })
    }
  });

  return (
    <TableRow>
      <TableCell></TableCell>
      {
        format.map((item) => {
          switch (item.input) {
            case "color":
              return <ColorPickerCell value={data[item.key]} onChange={(value) => editData(item.key, value)}/>
            case "picker":
              return <PickerCell value={data[item.key]} onChange={(value) => editData(item.key, value)}/>
            default:
              return <TextCell label={item.label} value={data[item.key]}
                               onChange={(value) => editData(item.key, value)}/>
          }
        })
      }
      <TableCell>
        <IconButton onClick={() => {
          mutation.mutate()
        }} color={"success"} variant="contained">
          <FaCheck/>
        </IconButton>
        <IconButton onClick={() => {
          setVisible(false)
        }} variant="contained" color={"error"}>
          <FaXmark/>
        </IconButton>
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  )
}

function PickerCell({value, onChange}) {
  return <div></div>
}

function TextCell({value, onChange, label}) {
  return (
    <TableCell>
      <TextField label={label}
                 value={value}
                 onChange={(e) => onChange(e.target.value)}
                 variant="standard"/>
    </TableCell>
  )
}

function ColorPickerCell({value, onChange}) {
  return (
    <TableCell>
      <div className={"border border-gray-200 rounded-lg"}>
        <ColorInput title={""} value={value} setValue={onChange}/>
      </div>
    </TableCell>
  )
}