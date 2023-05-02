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

function SensilbleDataSortedByTime() {
  const navigate = useNavigate();
  const [theArray, setTheArray] = useState([]);
  const [ltpArray, setltpArray] = useState([]);
  const [theArrayOfvalues, setTheArrayOfvalues] = useState([]);
  const [selectedTime, setSelectedTime] = useState(new Date()); // set initial time value here
  const [time, setTime] = useState({
    hour: "01",
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
    for (let i = 0; i < 30; i++) {
      (async () => {
        let timeIs = `${dump.time}`.split(":");
        var hours = timeIs[0]; // Replace with the desired hour value (1-12)
        var minutes = timeIs[1] + i; // Replace with the desired minute value (0-59)
        var meridian = timeIs[2];
        console.log(meridian);
        if (meridian === "pm" && hours !== 12) {
          hours = parseInt(hours) + 12;
        }
        console.log(parseInt(hours), "this is hours");
        const now = new Date();
        now.setMonth(3);
        now.setMinutes(minutes);
        now.setHours(parseInt(hours));
        now.setDate(28);

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
              pp.CallLTP = e.get("CallLTP");
              pp.Strike = e.get("Strike");
              pp.PutGamma = e.get("PutGamma");
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
          .catch((error) => {});
      })();
    }
    setTimeout(() => {
      setltpArray(n2);
    }, 2000);
    console.log(theArray, "thisss");
  }
  const FindData = () => {
    console.log("work aguthu");
    let t1 = time
    let t2 = totime
    // Get the current date
    const currentDate = new Date();
    if(t1.meridian == "pm"){
      t1.hour = parseInt(t1.hour) + 12
    }
    if(t2.meridian == "pm"){
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
                <TableCell>time</TableCell>
                <TableCell>SpotValue</TableCell>
                <TableCell>IndiaVix</TableCell>
                <TableCell align="center">
                  -200
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      callLtp
                    </Grid>
                    <Grid item xs={6}>
                      putLtp
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">
                  -150
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      callLtp
                    </Grid>
                    <Grid item xs={6}>
                      putLtp
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">
                  -100
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      callLtp
                    </Grid>
                    <Grid item xs={6}>
                      putLtp
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">
                  -50
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      callLtp
                    </Grid>
                    <Grid item xs={6}>
                      putLtp
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">
                  0
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      callLtp
                    </Grid>
                    <Grid item xs={6}>
                      putLtp
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">
                  50
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      callLtp
                    </Grid>
                    <Grid item xs={6}>
                      putLtp
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">
                  100
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      callLtp
                    </Grid>
                    <Grid item xs={6}>
                      putLtp
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">
                  150
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      callLtp
                    </Grid>
                    <Grid item xs={6}>
                      putLtp
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">
                  200
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      callLtp
                    </Grid>
                    <Grid item xs={6}>
                      putLtp
                    </Grid>
                  </Grid>
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
                    <TableCell>{row[0].createdAt.toLocaleString()}</TableCell>
                    <TableCell>{row[0].spotValue}</TableCell>
                    <TableCell>{JSON.parse(row[0].indiaVix)}</TableCell>

                    <TableCell align="right">
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {row[0].CallLTP}
                        </Grid>
                        <Grid item xs={6}>
                          {row[0].PutGamma}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {row[1].CallLTP}
                        </Grid>
                        <Grid item xs={6}>
                          {row[1].PutGamma}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {row[2].CallLTP}
                        </Grid>
                        <Grid item xs={6}>
                          {row[2].PutGamma}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {row[3].CallLTP}
                        </Grid>
                        <Grid item xs={6}>
                          {row[3].PutGamma}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {row[4].CallLTP}
                        </Grid>
                        <Grid item xs={6}>
                          {row[4].PutGamma}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {row[5].CallLTP}
                        </Grid>
                        <Grid item xs={6}>
                          {row[5].PutGamma}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {row[6].CallLTP}
                        </Grid>
                        <Grid item xs={6}>
                          {row[6].PutGamma}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {row[7].CallLTP}
                        </Grid>
                        <Grid item xs={6}>
                          {row[7].PutGamma}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {row[8].CallLTP}
                        </Grid>
                        <Grid item xs={6}>
                          {row[8].PutGamma}
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
