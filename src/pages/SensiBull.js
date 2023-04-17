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

function SensiBull() {
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

    const qq = new Parse.Query("Nifty");
    let valIs = `${dump.id}`;
    qq.equalTo("Strike", valIs);
    qq.limit(1000);
    qq.descending("createdAt");
    await qq
      .find()
      .then(async (r) => {
        console.log(r, "r is");
        if (parseInt(dump.id) < 30000) {
          console.log("it is found");
          let c = r.map((e) => {
            const pp = new Object();
            pp.createdAt = e.createdAt;
            pp.updatedAt = e.updatedAt;
            pp.weburl = e.get("weburl");
            pp.CallGamma = e.get("CallGamma");
            pp.CallVega = e.get("CallVega");
            pp.CallTheta = e.get("CallTheta");
            pp.CallDelta = e.get("CallDelta");
            pp.CallOL = e.get("CallOL");
            pp.CallLTP = e.get("CallLTP");
            pp.Strike = e.get("Strike");
            pp.PutGamma = e.get("PutGamma");
            pp.PutVega = e.get("PutVega");
            pp.PutTheta = e.get("PutTheta");
            pp.PutDelta = e.get("PutDelta");
            pp.PutOL = e.get("PutOL");
            pp.PutLTP = e.get("PutLTP");
            return pp;
          });
          console.log(c, "the array");
          setTheArray(c);
        } else {
          console.log("it is not found");

          console.log("this works 1");
          const qq2 = new Parse.Query("bankNifty");
          let valIs = `${dump.id}`;
          qq2.equalTo("Strike", valIs);
          qq2.limit(1000);
          qq2.descending("createdAt");

          await qq2.find().then((re) => {
            console.log("this works 2");
            let cw = re.map((e) => {
              const pp = new Object();
              pp.createdAt = e.createdAt;
              pp.updatedAt = e.updatedAt;
              pp.weburl = e.get("weburl");
              pp.CallGamma = e.get("CallGamma");
              pp.CallVega = e.get("CallVega");
              pp.CallTheta = e.get("CallTheta");
              pp.CallDelta = e.get("CallDelta");
              pp.CallOL = e.get("CallOL");
              pp.CallLTP = e.get("CallLTP");
              pp.Strike = e.get("Strike");
              pp.PutGamma = e.get("PutGamma");
              pp.PutVega = e.get("PutVega");
              pp.PutTheta = e.get("PutTheta");
              pp.PutDelta = e.get("PutDelta");
              pp.PutOL = e.get("PutOL");
              pp.PutLTP = e.get("PutLTP");
              return pp;
            });
            console.log(cw, "the array");
            setTheArray(cw);
          });
        }
      })
      .catch(async () => {});
  }
  const signout = () => {
    navigate(`/sensibullview`, { replace: true });
  };
  console.log(theArray, "theArraytheArraytheArray");
  return (
    <>
      {/* <Header/> */}
      <UserHeader />

      <>
        {/* <Typography variant="h5" sx={{ opacity: 0.82 }}> */}

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
        {/* </Typography> */}
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
                  <TableCell>{row.createdAt.toLocaleString()}</TableCell>
                  <TableCell align="right">{row.CallGamma}</TableCell>
                  <TableCell align="right">{row.CallVega}</TableCell>
                  <TableCell align="right">{row.CallTheta}</TableCell>
                  <TableCell align="right">{row.CallDelta}</TableCell>
                  <TableCell align="right">{row.CallOL}</TableCell>
                  <TableCell align="right">{row.CallLTP}</TableCell>
                  <TableCell align="right">{row.PutGamma}</TableCell>
                  <TableCell align="right">{row.PutVega}</TableCell>
                  <TableCell align="right">{row.PutTheta}</TableCell>
                  <TableCell align="right">{row.PutDelta}</TableCell>
                  <TableCell align="right">{row.PutOL}</TableCell>
                  <TableCell align="right">{row.PutLTP}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  );
}

export default SensiBull;
