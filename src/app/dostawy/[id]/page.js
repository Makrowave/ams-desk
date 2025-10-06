"use client"
import {fullDeliveryData} from "@/test-data/short-delivery-data";
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {FaSearch} from "react-icons/fa";
import FetchSelect from "@/components/filtering/FetchSelect";
import {URLKEYS} from "@/util/urls";
import {FaBolt, FaCheck, FaPlus, FaVenus, FaXmark} from "react-icons/fa6";
import ValidatedTextField from "@/components/input/ValidatedTextField";
import {REGEX} from "@/util/regex";

export default function DeliveryPage({params}) {

  const {id} = params;
  const isLoading = false;
  const isError = false;
  const data = fullDeliveryData.find(d => d.id === Number(id));
  const [delivery, setDelivery] = useState({});

  useEffect(() => {
    setDelivery(data);
    console.log(data)
  }, []);

  return (
    <main>
      <Box sx={{display: "flex", flexDirection: "column"}}>
        <Paper sx={{m: 8, flex: 1, p: 4, display: "flex", flexDirection: "column", gap: 2}}>
          <Typography variant="h6" sx={{mb: 1}}>
            Dostawa #{data.id}
          </Typography>
          <Paper sx={{display: "flex", alignItems: "center", justifyContent: "space-between", p: 2}}>
            <Box>
              <Typography>
                Numer faktury
              </Typography>
              <Typography>
                {data.invoiceNumber}
              </Typography>
            </Box>
            <Box>
              <Typography>
                Numer dostawy
              </Typography>
              <Typography>
                {data.deliveryNumber}
              </Typography>
            </Box>
            <Box>
              <Typography>
                Data
              </Typography>
              <Typography>
                {data.date.toLocaleDateString('pl-PL')}
              </Typography>
            </Box>
            <Box>
              <Typography>
                Status
              </Typography>
              <Typography>
                {data.isFinished ? "Zakończona" : "W trakcie"}
              </Typography>
            </Box>
            <Box>
              <Typography>
                Ilość rowerów
              </Typography>
              <Typography>
                {data.models.reduce((acc, item) => (acc + item.count), 0)}
              </Typography>
            </Box>
          </Paper>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Lp.</TableCell>
                  <TableCell>Kolory</TableCell>
                  <TableCell>Nazwa</TableCell>
                  <TableCell>Kod producenta</TableCell>
                  <TableCell>Kod ean</TableCell>
                  <TableCell>Rama</TableCell>
                  <TableCell>Koło</TableCell>
                  <TableCell sx={{textAlign: "center"}}>Producent</TableCell>
                  <TableCell sx={{textAlign: "center"}}>Kategoria</TableCell>
                  <TableCell>Cena</TableCell>
                  <TableCell>
                    <Tooltip title={"Damski"}>
                      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <FaVenus/>
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={"Elektryczny"}>
                      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <FaBolt/>
                      </Box>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data.models.map((model, index) => (
                    <DeliveryRow key={model.modelId} model={model} index={index} editable={model.modelId === -1}/>
                  ))
                }
                <TableRow>
                  <TableCell colSpan={3}></TableCell>
                  <TableCell>
                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                      <TextField/>
                      <Tooltip title={"Wyszukaj po kodzie EAN"}>
                        <IconButton>
                          <FaSearch/>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                      <TextField/>
                      <Tooltip title={"Wyszukaj po numerze producenta"}>
                        <IconButton>
                          <FaSearch/>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton color={"success"}>
                      <FaPlus/>
                    </IconButton>
                  </TableCell>
                  <TableCell colSpan={6}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Paper>
      </Box>
    </main>
  )
}


function DeliveryRow({model, changeModel, editable, index}) {


  return (
    <TableRow>
      <TableCell>
        {index + 1}
      </TableCell>
      <TableCell>
        <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
          <Box sx={{bgcolor: model.primaryColor, minWidth: 30, minHeight: 30, width: 30, height: 30}}/>
          <Box sx={{bgcolor: model.secondaryColor, minWidth: 30, minHeight: 30, width: 30, height: 30}}/>
          <FetchSelect validated label={"Kolor"} urlKey={URLKEYS.Colors} value={model.colorId} onChange={() => {
          }}/>
        </Box>
      </TableCell>
      <TableCell>
        {
          editable ? (
            <ValidatedTextField value={model.modelName} regex={REGEX.MODEL_NAME} onChange={() => {
            }}/>
          ) : (
            model.modelName
          )
        }
      </TableCell>
      <TableCell>
        {
          editable ? (
            <ValidatedTextField value={model.productCode} regex={REGEX.PRODUCT_NAME} onChange={() => {
            }}/>
          ) : (
            model.productCode
          )
        }
      </TableCell>
      <TableCell>
        {
          editable ? (
            <ValidatedTextField value={model.eanCode} regex={REGEX.EAN} onChange={() => {
            }}/>
          ) : (
            model.eanCode
          )
        }
      </TableCell>
      <TableCell>
        {
          editable ? (
            <ValidatedTextField value={model.frameSize} regex={REGEX.FRAME} onChange={() => {
            }}/>
          ) : (
            model.frameSize
          )
        }
      </TableCell>
      <TableCell>
        <FetchSelect validated label={""} urlKey={URLKEYS.WheelSizes} value={model.wheelSize}
                     disabled={!editable}
                     onChange={() => {
                     }}/>
      </TableCell>
      <TableCell>
        <FetchSelect validated label={""} urlKey={URLKEYS.Manufacturers} value={model.manufacturerId}
                     disabled={!editable}
                     onChange={() => {
                     }}/>
      </TableCell>
      <TableCell>
        <FetchSelect validated label={""} urlKey={URLKEYS.Categories} value={model.manufacturerId}
                     disabled={!editable}
                     onChange={() => {
                     }}/>
      </TableCell>
      <TableCell>
        {model.price}
      </TableCell>
      <TableCell>
        {
          editable ? (
            <Checkbox checked={model.isWoman} onChange={() => {
            }}/>
          ) : (
            model.isWoman ? (
              <FaCheck/>
            ) : (
              <FaXmark/>
            )
          )
        }
      </TableCell>
      <TableCell>
        {
          editable ? (
            <Checkbox checked={model.isElectric} onChange={() => {
            }}/>
          ) : (
            model.isElectric ? (
              <FaCheck/>
            ) : (
              <FaXmark/>
            )
          )
        }

      </TableCell>
    </TableRow>
  )
}