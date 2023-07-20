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
import { Container, MenuItem, Select } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#98bf64',
  ...theme.typography.body2,
  textAlign: 'center',
  fontSize: 10,
  color: theme.palette.text.secondary,
}));
const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#63c5da',
  ...theme.typography.body2,
  textAlign: 'center',
  fontSize: 10,
  color: theme.palette.text.secondary,
}));
const Item3 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  fontSize: 8,
  color: theme.palette.text.secondary,
}));

function SensilbleDataSortedByTime() {
  const navigate = useNavigate();
  const [theArray, setTheArray] = useState([]);
  const [ltpArray, setltpArray] = useState([]);
  const [theArrayOfvalues, setTheArrayOfvalues] = useState([]);
  const [selectedTime, setSelectedTime] = useState(new Date()); // set initial time value here
  const [time, setTime] = useState({
    hour: "03",
    minute: "00",
    meridian: "am",
  });
  const [totime, tosetTime] = useState({
    hour: "11",
    minute: "00",
    meridian: "am",
  });

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    setTime((prevTime) => ({ ...prevTime, [name]: value }));
  };
  const handleTimeChange1 = (event) => {
    const { name, value } = event.target;
    tosetTime((prevTime) => ({ ...prevTime, [name]: value }));
  };
  useEffect(() => {

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
  let newArr = [];
  async function ParseCall() {

    let timeIs = `${dump.time}`.split(":");
    var hours = parseInt(timeIs[0]); // Replace with the desired hour value (1-12)
    var minutes = parseInt(timeIs[1]); // Replace with the desired minute value (0-59)
    var meridian = timeIs[2];
    console.log(meridian);
    if (meridian === "pm" && hours !== 12) {
      hours = hours + 12;
    }
    console.log(hours, "this is hours");
    console.log(minutes, "this is mins");

    const now = new Date();
    now.setMonth(6);
    now.setMinutes(minutes);
    now.setHours(hours);
    now.setDate(14);

    for (let i = 0; i < 100; i++) {
      (async () => {

        let j = i * 1;
        var minuteStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes() + j,
          0
        );
        var minuteEnd = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes() + j + 1,
          0
        );
        console.log(minuteStart, minuteEnd);
        var MyObject = Parse.Object.extend("aprilNifty");
        var query = new Parse.Query(MyObject);
        query.greaterThanOrEqualTo("createdAt", minuteStart);
        query.lessThan("createdAt", minuteEnd);
        query.limit(1000);
        query.descending("createdAt");
        await query
          .find()
          .then((r) => {
            // console.log(r);
            r[0].get("spotValue");
            const match = r.filter((object) => {
              let resp = object.get("Strike");
              let median =
                Math.round(parseInt(object.get("spotValue")) / 50) * 50;
              resp = Math.round(parseInt(resp) / 50) * 50;
              return resp >= median - 200 && resp <= median + 200;
            });
            // console.log(match);
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
              pp.CallLTP = parseFloat(e.get("CallLTP"));
              pp.Strike = e.get("Strike");
              pp.PutGamma = parseFloat(e.get("PutGamma"));
              pp.PutVega = e.get("PutVega");
              pp.PutTheta = e.get("PutTheta");
              pp.PutDelta = e.get("PutDelta");
              pp.PutOL = e.get("PutOL");
              pp.PutLTP = e.get("PutLTP");
              pp.indiaVix = e.get("indiaVix");
              return pp;
            });
            console.log(c, "this is cc");
            newArr = c.map((e) => e);
            console.log(newArr, "for this iteration", i, c);
            n2[i] = newArr;
            newArr = [];
            console.log(n2, "heerree bOOII");
          })
          .catch((error) => { });
      })();
    }



    setTimeout(() => {
      setltpArray(n2);
    }, 20000);


    //console.log(theArray, "thisss");  
  }



  const FindData = () => {
    console.log("work aguthu");
    let t1 = time
    let t2 = totime
    // Get the current date
    const currentDate = new Date();
    if (t1.meridian == "pm") {
      t1.hour = parseInt(t1.hour) + 12
    }
    if (t2.meridian == "pm") {
      t2.hour = parseInt(t2.hour) + 12
    }
    console.log(t1, t2, "works");
    // Define two time values in "hh:mm:ss" format
    const time1 = `${t1.hour}:${t1.minute}:00`;
    const time2 = `${t2.hour}:${t2.minute}:00`;

    // Combine the current date with the time values
    const dateTime1 = new Date(`${currentDate.toDateString()} ${time1}`);
    const dateTime2 = new Date(`${currentDate.toDateString()} ${time2}`);

    // Calculate the time difference in milliseconds
    const timeDiff = Math.abs(dateTime1 - dateTime2);

    // Convert the time difference to minutes
    const minutesDiff = Math.floor(timeDiff / 1000 / 60);

    console.log(
      `The time difference between ${time1} and ${time2} is ${minutesDiff} minutes.`
    );

    t1 = time
    t2 = totime
  };
  const signout = () => {
    navigate(`/sensibullview`, { replace: true });
  };
  console.log(theArray, "theArraytheArraytheArray");
  return (
    <>
      <UserHeader />

      <>
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
          <Container maxWidth="sm">
            <Grid container spacing={2}>
              <Typography variant="h2" color="primary">
                From
              </Typography>
              <Grid item xs={2}>
                <Select
                  name="hour"
                  value={time.hour}
                  onChange={handleTimeChange}
                  fullWidth
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                    <MenuItem key={num} value={num < 10 ? `0${num}` : `${num}`}>
                      {num < 10 ? `0${num}` : `${num}`}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={2}>
                <Select
                  name="minute"
                  value={time.minute}
                  onChange={handleTimeChange}
                  fullWidth
                >
                  {Array.from({ length: 60 }, (_, i) => i).map((num) => (
                    <MenuItem key={num} value={num < 10 ? `0${num}` : `${num}`}>
                      {num < 10 ? `0${num}` : `${num}`}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={2}>
                <Select
                  name="meridian"
                  value={time.meridian}
                  onChange={handleTimeChange}
                  fullWidth
                >
                  <MenuItem value="am">am</MenuItem>
                  <MenuItem value="pm">pm</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="sm">
            <Grid container spacing={2}>
              <Typography variant="h2" color="primary">
                To
              </Typography>
              <Grid item xs={2}>
                <Select
                  name="hour"
                  value={totime.hour}
                  onChange={handleTimeChange}
                  fullWidth
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                    <MenuItem key={num} value={num < 10 ? `0${num}` : `${num}`}>
                      {num < 10 ? `0${num}` : `${num}`}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={2}>
                <Select
                  name="minute"
                  value={totime.minute}
                  onChange={handleTimeChange}
                  fullWidth
                >
                  {Array.from({ length: 60 }, (_, i) => i).map((num) => (
                    <MenuItem key={num} value={num < 10 ? `0${num}` : `${num}`}>
                      {num < 10 ? `0${num}` : `${num}`}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={2}>
                <Select
                  name="meridian"
                  value={totime.meridian}
                  onChange={handleTimeChange1}
                  fullWidth
                >
                  <MenuItem value="am">am</MenuItem>
                  <MenuItem value="pm">pm</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Container>
          <Grid textAlign="left" sx={{ paddingX: 2, marginY: 1 }}>
            <Button
              size="medium"
              color="warning"
              variant="outlined"
              onClick={FindData}
            >
              Find Data
            </Button>
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
                <TableCell sx={{ padding: "2px", margin: "0px" }}>time</TableCell>
                <TableCell sx={{ padding: "2px", margin: "0px" }}>SpotValue</TableCell>
                <TableCell sx={{ padding: "2px", margin: "0px" }}>IndiaVix</TableCell>

                <TableCell align="center">
                  straddle

                </TableCell>
                <TableCell align="center">
                  1pt strangle

                </TableCell>
                <TableCell align="center">
                  2pt strangle

                </TableCell>
                <TableCell align="center">
                  3pt strangle

                </TableCell>
                <TableCell align="center">
                  4pt strangle
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {ltpArray?.map((row, i) => {
                // (console.log))
                return (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell sx={{ padding: "2px", margin: "0px" }}>{row[0].createdAt.toLocaleString()}</TableCell>
                    <TableCell sx={{ padding: "2px", margin: "0px" }}>{row[0].spotValue}</TableCell>
                    <TableCell sx={{ padding: "2px", margin: "0px" }}>{JSON.parse(row[0].indiaVix)}</TableCell>


                    <TableCell align="right">
                      <Grid container rowSpacing={0.1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>

                        <Grid item xs={12}>
                          <Item>{row[4].Strike} </Item>
                        </Grid>

                        <Grid item xs={3}>
                          <Item3>Delta</Item3>
                          <Item1>{row[4].CallDelta}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Gamma</Item3>
                          <Item1>{row[4].CallGamma}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Theta</Item3>
                          <Item1>{row[4].CallTheta}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Vega</Item3>
                          <Item1>{row[4].CallVega}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>LTP</Item3>
                          <Item1>{row[4].CallLTP}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>OI</Item3>
                          <Item1>{row[4].CallOL}</Item1>
                        </Grid>

                        <Grid item xs={3}>
                          <Item3>LTP</Item3>
                          <Item2>{row[4].PutGamma}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>OI</Item3>
                          <Item2>{row[4].PutVega}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Delta</Item3>
                          <Item2>{row[4].PutTheta}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                         <Item3>Gamma</Item3>
                          <Item2>{row[4].PutLTP}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Theta</Item3>
                          <Item2>{row[4].PutTheta}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Vega</Item3>
                          <Item2>{row[4].PutOL}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>LTP together</Item3>
                          <Item1>{row[4].CallLTP + row[4].PutGamma}</Item1>
                          </Grid>
                        <Grid item xs={3}>
                          <Item3>Actual Put</Item3>
                          <Item1>{((row[4].CallLTP + row[4].PutGamma)/2-(row[0].spotValue-row[4].Strike))}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Actual call</Item3>
                          <Item1>{((row[4].CallLTP + row[4].PutGamma)/2-(row[4].Strike-row[0].spotValue))}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Premium diff</Item3>
                          <Item1>{((row[4].CallLTP + row[4].PutGamma)/2-(row[4].Strike-row[0].spotValue))-row[4].CallLTP}</Item1>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Grid container rowSpacing={0.1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>

                      <Grid item xs={6}>
                          <Item>{row[3].Strike} </Item>
                        </Grid>
                        <Grid item xs={5}>
                          <Item>{row[5].Strike} </Item>
                        </Grid>

                        <Grid item xs={3}>
                          <Item3>Delta</Item3>
                          <Item1>{row[3].CallDelta}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Gamma</Item3>
                          <Item1>{row[3].CallGamma}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Theta</Item3>
                          <Item1>{row[3].CallTheta}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Vega</Item3>
                          <Item1>{row[3].CallVega}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>LTP</Item3>
                          <Item1>{row[3].CallLTP}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>OI</Item3>
                          <Item1>{row[3].CallOL}</Item1>
                        </Grid>

                        <Grid item xs={3}>
                          <Item3>LTP</Item3>
                          <Item2>{row[5].PutGamma}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>OI</Item3>
                          <Item2>{row[5].PutVega}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Delta</Item3>
                          <Item2>{row[5].PutTheta}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                         <Item3>Gamma</Item3>
                          <Item2>{row[5].PutLTP}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Theta</Item3>
                          <Item2>{row[5].PutTheta}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Vega</Item3>
                          <Item2>{row[5].PutOL}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>LTP together</Item3>
                          <Item1>{row[3].CallLTP + row[5].PutGamma}</Item1>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Grid container rowSpacing={0.1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>

                      <Grid item xs={6}>
                          <Item>{row[2].Strike} </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item>{row[6].Strike} </Item>
                        </Grid>

                        <Grid item xs={3}>
                          <Item3>Delta</Item3>
                          <Item1>{row[2].CallDelta}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Gamma</Item3>
                          <Item1>{row[2].CallGamma}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Theta</Item3>
                          <Item1>{row[2].CallTheta}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Vega</Item3>
                          <Item1>{row[2].CallVega}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>LTP</Item3>
                          <Item1>{row[2].CallLTP}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>OI</Item3>
                          <Item1>{row[2].CallOL}</Item1>
                        </Grid>

                        <Grid item xs={3}>
                          <Item3>LTP</Item3>
                          <Item2>{row[6].PutGamma}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>OI</Item3>
                          <Item2>{row[6].PutVega}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Delta</Item3>
                          <Item2>{row[6].PutTheta}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                         <Item3>Gamma</Item3>
                          <Item2>{row[6].PutLTP}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Theta</Item3>
                          <Item2>{row[6].PutTheta}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Vega</Item3>
                          <Item2>{row[6].PutOL}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>LTP together</Item3>
                          <Item1>{row[2].CallLTP + row[6].PutGamma}</Item1>
                        </Grid>
                        
                        <Grid item xs={3}>
                          <Item3>Actual Put</Item3>
                          <Item1>{((row[2].CallLTP + row[6].PutGamma)/2-(row[0].spotValue-row[4].Strike))}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Actual call</Item3>
                          <Item1>{((row[2].CallLTP + row[6].PutGamma)/2-(row[4].Strike-row[0].spotValue))}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Premium diff</Item3>
                          <Item1>{((row[2].CallLTP + row[6].PutGamma)/2-(row[4].Strike-row[2].spotValue))-row[2].CallLTP}</Item1>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Grid container rowSpacing={0.1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>

                      <Grid item xs={6}>
                          <Item>{row[1].Strike} </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item>{row[7].Strike} </Item>
                        </Grid>

                        <Grid item xs={3}>
                          <Item3>Delta</Item3>
                          <Item1>{row[1].CallDelta}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Gamma</Item3>
                          <Item1>{row[1].CallGamma}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Theta</Item3>
                          <Item1>{row[1].CallTheta}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Vega</Item3>
                          <Item1>{row[1].CallVega}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>LTP</Item3>
                          <Item1>{row[1].CallLTP}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>OI</Item3>
                          <Item1>{row[1].CallOL}</Item1>
                        </Grid>

                        <Grid item xs={3}>
                          <Item3>LTP</Item3>
                          <Item2>{row[7].PutGamma}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>OI</Item3>
                          <Item2>{row[7].PutVega}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Delta</Item3>
                          <Item2>{row[7].PutTheta}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                         <Item3>Gamma</Item3>
                          <Item2>{row[7].PutLTP}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Theta</Item3>
                          <Item2>{row[7].PutTheta}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Vega</Item3>
                          <Item2>{row[7].PutOL}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>LTP together</Item3>
                          <Item1>{row[1].CallLTP + row[7].PutGamma}</Item1>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Grid container rowSpacing={0.1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>

                      <Grid item xs={6}>
                          <Item>{row[0].Strike} </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item>{row[8].Strike} </Item>
                        </Grid>

                        <Grid item xs={3}>
                          <Item3>Delta</Item3>
                          <Item1>{row[0].CallDelta}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Gamma</Item3>
                          <Item1>{row[0].CallGamma}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Theta</Item3>
                          <Item1>{row[0].CallTheta}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Vega</Item3>
                          <Item1>{row[0].CallVega}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>LTP</Item3>
                          <Item1>{row[0].CallLTP}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>OI</Item3>
                          <Item1>{row[0].CallOL}</Item1>
                        </Grid>

                        <Grid item xs={3}>
                          <Item3>LTP</Item3>
                          <Item2>{row[8].PutGamma}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>OI</Item3>
                          <Item2>{row[8].PutVega}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Delta</Item3>
                          <Item2>{row[8].PutTheta}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                         <Item3>Gamma</Item3>
                          <Item2>{row[8].PutLTP}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Theta</Item3>
                          <Item2>{row[8].PutTheta}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Vega</Item3>
                          <Item2>{row[8].PutOL}</Item2>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>LTP together</Item3>
                          <Item1>{row[0].CallLTP + row[8].PutGamma}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Actual Put</Item3>
                          <Item1>{((row[0].CallLTP + row[8].PutGamma)/2-(row[0].spotValue-row[4].Strike))}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Actual call</Item3>
                          <Item1>{((row[0].CallLTP + row[8].PutGamma)/2-(row[4].Strike-row[0].spotValue))}</Item1>
                        </Grid>
                        <Grid item xs={3}>
                          <Item3>Premium diff</Item3>
                          <Item1>{((row[0].CallLTP + row[8].PutGamma)/2-(row[4].Strike-row[0].spotValue))-row[0].CallLTP}</Item1>
                        </Grid>
                        
                      </Grid>
                    </TableCell>
                    
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  );
}

export default SensilbleDataSortedByTime;
