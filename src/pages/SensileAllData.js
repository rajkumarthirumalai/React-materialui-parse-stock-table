import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate, useParams } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  AppWidgetSummary,
  AppWidgetSummary2,
} from "src/sections/@dashboard/app";
import {
  Card,
  CardHeader,
  Divider,
  Stack,
  Link,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import Iconify from "src/components/iconify/Iconify";
import UserHeader from "src/layouts/dashboard/header/UserHeader";
import { Margin } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SensileAllData() {
  
  const navigate = useNavigate();
  const [theArray, setTheArray] = useState([]);
  const [theArrayOfvalues, setTheArrayOfvalues] = useState([]);
  useEffect(() => {
    console.log("use");
    ParseCall();
  }, []);
  const groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      []
    );

  let dump = useParams();
  async function ParseCall() {
    console.log("ParseCall");
    const qq3 = new Parse.Query("aprilNifty");
    // qq3.ascending("Strike")
    // qq3.descending("createdAt");
    // qq3.skip(1000)
    qq3.select('niftyStrikeValue', 'Strike', 'CallLTP','PutLTP');
    qq3.limit(10000);

    await qq3
      .find()
      .then((r) => {
        console.log(r.length);
        return r.map((e) => ({
          medianVAl: e.get("niftyStrikeValue"),
          Strike: e.get("Strike"),
          CallLTP: e.get("CallLTP"),
          PutLTP: e.get("PutLTP"),
          createdAt: e.createdAt,
          ObjId: e.id,
        }));
      })
      .then((re) =>{
        console.log(re);
        let resp = re.filter(e=>e.Strike <30000)
        // Group the time objects by minute
        const groups = {};
        resp.forEach(time => {
          const year = time.createdAt.getFullYear();
          const month = time.createdAt.getMonth();
          const date = time.createdAt.getDate();
          const hour = time.createdAt.getHours();
          const minute = time.createdAt.getMinutes();
          const key = `${year}-${month}-${date} ${hour}:${minute}`;
          if (!groups[key]) {
            groups[key] = [];
          }
          groups[key].push(time);
        });
        
        // Print the groups
        console.log(groups,"the groups");
        let resArr = groups.map(e=>e.filter((_,i)=>i<20))
        console.log(resArr);
      });
  }
  const signout = () => {
    navigate(`/sensibullview`, { replace: true });
  };
  return (
    <>
      {/* <Header/> */}
      <UserHeader />

      <>
        <Typography variant="h5" sx={{ opacity: 0.82 }}>
          <div
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
              zIndex: 1,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "10vh",
              marginBottom: 5,
            }}
          >
            <Typography variant="h1" color="primary">
              {" "}
              {dump.id}
            </Typography>
            <Grid textAlign="right" sx={{ paddingX: 5, marginY: 1 }}>
              <Button
                size="medium"
                color="warning"
                variant="outlined"
                onClick={signout}
              >
                back
              </Button>
            </Grid>
          </div>
        </Typography>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">CallGamma</TableCell>
                <TableCell align="right">CallVega</TableCell>
                <TableCell align="right">CallTheta</TableCell>
                <TableCell align="right">CallDelta</TableCell>
                <TableCell align="right">CallOL</TableCell>
                <TableCell align="right">CallLTP</TableCell>
                <TableCell align="right">PutGamma</TableCell>
                <TableCell align="right">PutVega</TableCell>
                <TableCell align="right">PutTheta</TableCell>
                <TableCell align="right">PutDelta</TableCell>
                <TableCell align="right">PutOL</TableCell>
                <TableCell align="right">PutLTP</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {theArray?.map((row, i) => (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>
                    {theArray[0].createdAt.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{theArray[0].Strike}</TableCell>
                  <TableCell align="right">{theArray[1].Strike}</TableCell>
                  <TableCell align="right">{theArray[2].Strike}</TableCell>
                  <TableCell align="right">{theArray[3].Strike}</TableCell>
                  <TableCell align="right">{theArray[4].Strike}</TableCell>
                  <TableCell align="right">{theArray[5].Strike}</TableCell>
                  <TableCell align="right">{theArray[6].Strike}</TableCell>
                  <TableCell align="right">{theArray[7].Strike}</TableCell>
                  <TableCell align="right">{theArray[8].Strike}</TableCell>
                  <TableCell align="right">{theArray[9].Strike}</TableCell>
                  <TableCell align="right">{theArray[10].Strike}</TableCell>
                  <TableCell align="right">{theArray[11].Strike}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  );
}

export default SensileAllData;
