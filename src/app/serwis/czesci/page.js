"use client"
import AddPartModal from "@/components/modals/repair/AddPartModal";
import {FaCircleXmark, FaObjectUngroup, FaPencil, FaPlus} from "react-icons/fa6";
import PrivateRoute from "@/components/routing/PrivateRoute";
import Navigation from "@/components/navigation/Navigation";
import SideBar from "@/components/navigation/SideBar";
import {repairsNavigation} from "@/app/serwis/page";
import {useState} from "react";
import DeleteModal from "@/components/modals/DeleteModal";
import ModifyPartModal from "@/components/modals/repair/ModifyPartModal";
import URLS from "@/util/urls";
import {useFilteredPartsQuery, usePartCategoriesQuery, usePartTypesQuery} from "@/hooks/queryHooks";
import MaterialModal from "@/components/modals/MaterialModal";
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip
} from "@mui/material";
import MergePartModal from "@/components/modals/repair/MergePartModal";


export default function PartRepairsPage() {
  const [categoryId, setCategoryId] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const [text, setText] = useState("");
  // Fetch categories
  const {data: catData, isLoading: catIsLoading, isError: catIsError} = usePartCategoriesQuery();

  // Fetch parts based on selected part type
  const {data: partData, isLoading: partIsLoading, isError: partIsError} = useFilteredPartsQuery({
    categoryId: categoryId,
    typeId: typeId
  });
  const [selectedParts, setSelectedParts] = useState([]);

  const handleSelection = (part) => {
    if (selectionContains(part)) {
      setSelectedParts((prev) => prev.filter(p => !(p.partId === part.partId)));
    } else if (selectedParts.length < 2) {
      setSelectedParts((prev) => [...prev, part])
    }
  }

  const selectionContains = (part) => {
    return selectedParts.some(selection => selection.partId === part.partId)
  }


  //Fetch types based on selected category
  const {data: typeData, isLoading: typeIsLoading, isError: typeIsError} = usePartTypesQuery({id: categoryId});

  const defaultSx = {
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'scroll',
    maxHeight: 800,
  }


  return (
    <PrivateRoute>
      <Navigation active={2}/>
      <main className='overflow-y-hidden'>
        <SideBar baseUrl={"/serwis"} links={repairsNavigation}/>
        <Paper className={"w-10/12 m-auto my-8 flex p-4"}>
          {/* Category List */}
          <List disablePadding sx={{...defaultSx, width: 250}} subheader={<ListSubheader>Kategorie</ListSubheader>}>
            {!catIsLoading && !catIsError &&
              [{id: 0, name: "Wszystkie"}, ...catData].map(category => (
                <ListItemButton
                  className={category.id === categoryId ? "sticky" : ""}
                  sx={{
                    ...(category.id === categoryId && {
                      position: 'sticky',
                      top: 48,
                      zIndex: 10,
                    }),
                    '&.Mui-selected': {
                      backgroundColor: '#3b82f6',
                      color: 'white',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: '#0056b3',
                    },
                  }}
                  key={category.id}
                  selected={category.id === categoryId}
                  onClick={() => {
                    setCategoryId(category.id);
                    setTypeId(0)
                  }}
                >
                  <ListItemText>
                    {category.name}
                  </ListItemText>
                </ListItemButton>
              ))
            }
          </List>
          {/* Type List */}
          <List disablePadding sx={{...defaultSx, width: 250}} subheader={<ListSubheader>Typy części</ListSubheader>}>
            {!typeIsLoading && !typeIsError &&
              [{id: 0, name: "Wszystkie"}, ...typeData].map(type => (
                <ListItemButton
                  sx={{
                    ...(type.id === typeId && {
                      position: 'sticky',
                      top: 48,
                      zIndex: 10,
                    }),
                    '&.Mui-selected': {
                      backgroundColor: '#34d399',
                      color: 'white',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: '#059669',
                    },
                  }}
                  key={type.id}
                  selected={type.id === typeId}
                  onClick={() => setTypeId(type.id)}
                >
                  <ListItemText>
                    {type.name}
                  </ListItemText>
                </ListItemButton>
              ))
            }
          </List>
          {/* Part List */}
          {/*<input type="text" className="w-full rounded-lg p-1 border-gray-300 border"*/}
          {/*       placeholder="Część"*/}
          {/*       onChange={(e) => setText(e.target.value)}*/}
          {/*/>*/}
          <Box sx={{flex: "3", maxHeight: 800, display: 'flex', flexDirection: 'column'}}>
            <TextField label={"Wyszukaj część"} sx={{marginX: 0.5}} onChange={(e) => setText(e.target.value)}
                       value={text}/>
            <TableContainer sx={{position: 'relative', overflow: 'scroll', flex: '1'}}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Część</TableCell>
                    <TableCell>Cena</TableCell>
                    <TableCell>Jedn.</TableCell>
                    <TableCell>
                      <Box className={"flex items-center justify-center"}>
                        <MaterialModal label={"Dodaj część"} button={
                          <Tooltip title="Dodaj część">
                            <IconButton color="primary">
                              <FaPlus/>
                            </IconButton>
                          </Tooltip>
                        }>
                          <AddPartModal/>
                        </MaterialModal>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    !partIsLoading && !partIsError &&
                    partData.filter(part => (strFind(part.partName, text)))
                      .map((part) => (
                        <TableRow key={part.partId}>
                          <TableCell>
                            <Checkbox
                              onChange={() => handleSelection(part)}
                              disabled={selectedParts.length >= 2 && !selectionContains(part)}
                              checked={selectedParts.includes(part)}
                            />
                          </TableCell>
                          <TableCell>
                            {categoryId === 0 &&
                              <span className="inline text-[11px] text-gray-400 underline">
                                  {part.partType.partCategory.partCategoryName}
                                </span>
                            }
                            {
                              typeId === 0 && categoryId === 0 &&
                              <span className="inline text-[11px] text-gray-400">
                                  {" - "}
                                </span>
                            }
                            {typeId === 0 &&
                              <span className="inline text-[11px] text-gray-400 underline text-ellipsis">
                                  {part.partType.partTypeName}
                                </span>
                            }
                            <span className="block">
                                {part.partName}
                              </span>
                          </TableCell>
                          <TableCell className="text-center">
                            {part.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-center">
                            {part.unit.unitName}
                          </TableCell>
                          <TableCell>
                            <Box className={"flex items-center justify-center"}>
                              <MaterialModal label={"Edytuj część"} button={
                                <Tooltip title={"Edytuj część"}>
                                  <IconButton color={"primary"}>
                                    <FaPencil/>
                                  </IconButton>
                                </Tooltip>
                              }>
                                <ModifyPartModal part={part}/>
                              </MaterialModal>
                              <MaterialModal label={"Usuń część"} button={
                                <Tooltip title={"Usuń część"}>
                                  <IconButton>
                                    <FaCircleXmark className="text-red-600"/>
                                  </IconButton>
                                </Tooltip>
                              }>
                                <DeleteModal id={part.partId} refetchQueryKey={URLS.Parts} url={URLS.Parts}/>
                              </MaterialModal>
                            </Box>
                          </TableCell>
                        </TableRow>))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <TableContainer sx={{...defaultSx, flex: "2", position: 'relative'}}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <MaterialModal label={"Połącz części"}
                                   button={
                                     <Tooltip title="Połącz części">
                                       <IconButton color={"primary"} disabled={selectedParts.length < 2}>
                                         <FaObjectUngroup/>
                                       </IconButton>
                                     </Tooltip>
                                   }>
                      <MergePartModal part1={selectedParts[0]} part2={selectedParts[1]}/>
                    </MaterialModal>
                  </TableCell>
                  <TableCell>Część</TableCell>
                  <TableCell>Cena</TableCell>
                  <TableCell>Jedn.</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  !partIsLoading && !partIsError &&
                  selectedParts.map((part) => (
                    <TableRow key={part.partId}>
                      <TableCell>
                        <Checkbox
                          onChange={() => handleSelection(part)}
                          disabled={selectedParts.length >= 2 && !selectionContains(part)}
                          checked={selectedParts.includes(part)}
                        />
                      </TableCell>
                      <TableCell>
                        <span className="inline text-[11px] text-gray-400 text-ellipsis">
                          {part.partType.partCategory.partCategoryName}{" - "}{part.partType.partTypeName}
                        </span>
                        <span className="block">
                          {part.partName}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {part.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        {part.unit.unitName}
                      </TableCell>
                    </TableRow>))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </main>
    </PrivateRoute>
  );
}

const strFind = (where, what) => {
  if (typeof where !== "string" || typeof what !== "string") return false;
  if (what === "") return true;
  where = where.toLocaleLowerCase();
  where = where
    .split("")
    .map((c) => polishDict[c] ?? c)
    .join("");
  what = what.toLocaleLowerCase();
  what = what
    .split("")
    .map((c) => polishDict[c] ?? c)
    .join("");

  return where.includes(what);
};

const polishDict = {
  ż: "z",
  ź: "z",
  ę: "e",
  ó: "o",
  ą: "a",
  ś: "s",
  ł: "l",
  ć: "c",
  ń: "n",
};