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
import { TimeInput, TimePicker } from "@mui/lab";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SensilbleDataSortedByTime() {
  const navigate = useNavigate();
  const [theArray, setTheArray] = useState([]);
  const [theArrayOfvalues, setTheArrayOfvalues] = useState([]);
  const [selectedTime, setSelectedTime] = useState(new Date()); // set initial time value here

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
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

  let n2 = [];
  async function ParseCall() {
    for (let i = 0; i < 5; i++) {
      (async () => {
        let timeIs = `${dump.time}`.split(":");

        var hours = timeIs[0]; // Replace with the desired hour value (1-12)
        var minutes = timeIs[1] + i ; // Replace with the desired minute value (0-59)
        var meridian = timeIs[2]; // Replace with 'AM' or 'PM'

        // Convert hours to 24-hour format if meridian is 'PM'
        if (meridian === "PM" && hours !== 12) {
          hours += 12;
        }
        // Create the Date object with the specified time
        var date = new Date();
        date.setDate(28);
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0); // Set seconds to 0 to avoid any rounding issues
        // Get the current time
        var now = date;
        // Set the time to the start of the minute
        var minuteStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          0
        );
        var minuteEnd = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes() + 1,
          0
        );
        console.log(minuteStart,minuteEnd);
        var MyObject = Parse.Object.extend("aprilNifty");
        var query = new Parse.Query(MyObject);
        query.greaterThanOrEqualTo("createdAt", minuteStart);
        query.lessThan("createdAt", minuteEnd);
        query.limit(1000);
        query.descending("createdAt");
        await query
          .find()
          .then((r) => {
            r[0].get("spotValue");
            const match = r.filter((object) => {
              let resp = object.get("Strike");
              let median =
                Math.round(parseInt(object.get("spotValue")) / 50) * 50;
              resp = Math.round(parseInt(resp) / 50) * 50;
              return resp >= median - 200 && resp <= median + 200;
            });

            if (parseInt(dump.id) < 30000) {
              let c = match.map((e) => {
                const pp = new Object();
                pp.createdAt = e.createdAt;
                pp.updatedAt = e.updatedAt;
                pp.spotValue = e.get("spotValue");
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
              let newArr = c.map((e) => ({ pl: e.PutLTP, clp: e.CallLTP }));
              console.log(newArr, "for this iteration", i, c);
              n2[i] = newArr;
              //newArr = []
            }
            console.log(n2, "heerree bOOII");
            // else {
            //   const qq2 = new Parse.Query("aprilBankNifty");
            //   qq2.greaterThanOrEqualTo("createdAt", minuteStart);
            //   qq2.lessThan("createdAt", minuteEnd);
            //   qq2.limit(1000);
            //   qq2.descending("createdAt");
            //   qq2.find().then((re) => {
            //     console.log("this works 2");
            //     let cw = re.map((e) => {
            //       const pp = new Object();
            //       pp.createdAt = e.createdAt;
            //       pp.updatedAt = e.updatedAt;
            //       pp.spotValue = e.get("spotValue");
            //       pp.Strike = e.get("Strike");
            //       pp.weburl = e.get("weburl");
            //       pp.CallGamma = e.get("CallGamma");
            //       pp.CallVega = e.get("CallVega");
            //       pp.CallTheta = e.get("CallTheta");
            //       pp.CallDelta = e.get("CallDelta");
            //       pp.CallOL = e.get("CallOL");
            //       pp.CallLTP = e.get("CallLTP");
            //       pp.Strike = e.get("Strike");
            //       pp.PutGamma = e.get("PutGamma");
            //       pp.PutVega = e.get("PutVega");
            //       pp.PutTheta = e.get("PutTheta");
            //       pp.PutDelta = e.get("PutDelta");
            //       pp.PutOL = e.get("PutOL");
            //       pp.PutLTP = e.get("PutLTP");
            //       return pp;
            //     });
            //     console.log(cw.map(e=>({pl:e.PutLTP,clp:e.CallLTP})), "the array");
            //     setTheArray(cw);
            //   });
            // }
          })
          .catch((error) => {
            // Handle the error
          });
      })();
    }
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
        {/* <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Strike</TableCell>
                <TableCell align="right">spotValue</TableCell>
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
                  <TableCell align="right">{row.Strike}</TableCell>
                  <TableCell align="right">{row.spotValue}</TableCell>
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
        </TableContainer> */}
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>time</TableCell>
                <TableCell align="right">-200</TableCell>
                <TableCell align="right">-150</TableCell>
                <TableCell align="right">-100</TableCell>
                <TableCell align="right">-50</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">50</TableCell>
                <TableCell align="right">100</TableCell>
                <TableCell align="right">150</TableCell>
                <TableCell align="right">200</TableCell>
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
                  <TableCell align="right">{row.Strike}</TableCell>
                  <TableCell align="right">{row.spotValue}</TableCell>
                  <TableCell align="right">{row.CallGamma}</TableCell>
                  <TableCell align="right">{row.CallVega}</TableCell>
                  <TableCell align="right">{row.CallVega}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  );
}

export default SensilbleDataSortedByTime;
