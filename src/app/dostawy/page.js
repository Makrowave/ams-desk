import {Box, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {shortDeliveryData} from "@/test-data/short-delivery-data";
import Link from "next/link";
import {FaChevronRight} from "react-icons/fa6";

export default function DeliveriesPage() {

  const isError = false;
  const isLoading = false;
  const data = shortDeliveryData;

  return (
    <main>
      <Box sx={{display: "flex", flexDirection: "column"}}>
        <Paper sx={{m: 8, flex: 1, p: 4}}>
          <Typography sx={{pb: 1}} variant={"h6"}>Dostawy</Typography>
          <Paper>
            {!isLoading && !isError &&
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Lp.</TableCell>
                    <TableCell>Numer dostawy</TableCell>
                    <TableCell>Faktura</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.deliveryNumber}</TableCell>
                        <TableCell>{item.invoiceNumber}</TableCell>
                        <TableCell>{item.date.toLocaleDateString('pl-PL')}</TableCell>
                        <TableCell>
                          {item.isFinished ? "Zakończona" : "W trakcie"}
                        </TableCell>
                        <TableCell>
                          <Link href={`/dostawy/${item.id}`}>
                            <IconButton>
                              <FaChevronRight/>
                            </IconButton>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            }
          </Paper>
        </Paper>
      </Box>
    </main>
  )
}