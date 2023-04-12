import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";
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
import { Card, CardHeader, Divider, Stack, Link, Button } from "@mui/material";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import Iconify from "src/components/iconify/Iconify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ExtensionData() {
  const navigate = useNavigate();

  const [theArray, setTheArray] = useState([]);
  const [theArrayOfvalues, setTheArrayOfvalues] = useState([]);
  useEffect(() => {
    raj();
  }, []);
  const groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      []
    );

  function ParseCall() {
    const query2 = new Parse.Query("WebUrlDom2");
    query2.descending("createdAt");
    query2.find().then((res) => {
      let resultantArray = res.map((val, i) => {
        const person = new Object();
        if (val.get("domainName") == "zerodha") {
          console.log(val.get("ZerodhapositionsTab1"),"this is psotitonTab1");
          let arr3 = JSON.parse(val.get("ZerodhapositionsTab1"));
          arr3.pop();
          console.log(arr3, "this is ", i);
          let rv = arr3.map((e) => parseFloat(e["P&L"].replace(/,/g, "")));
          person.daytotalPL = rv.reduce((a, b) => {
            if (a != NaN) {
              return a + b;
            }
          }, 0);
          person.id = val.id;
          person.createdAt = val.createdAt;
          person.updatedAt = val.updatedAt;
          person.domainName = val.get("domainName");
          person.userId = JSON.parse(val.get("userId"));
          person.weburl = val.get("weburl");
          person.HoldingsTab = JSON.parse(val.get("ZerodhaHoldingsTab"));
          person.totalInvestment = JSON.parse(
            val.get("ZerodhatotalInvestment")
          );
          person.currentValue = JSON.parse(val.get("ZerodhacurrentValue"));
          person.DayPL = JSON.parse(val.get("ZerodhaDayPL"));
          person.TotalPL = JSON.parse(val.get("ZerodhaTotalPL"));
          let temp = JSON.parse(val.get("ZerodhapositionsTab1"));
          temp.pop();
          person.positionsTab1 = temp;
          return person;
        } else if (val.get("domainName") == "finvasia") {
          let arr3 = val.get("ShoonyaPositionBook");
          let rv = arr3.map((e) => parseFloat(e.urmtom.replace(/,/g, "")));
          let Rvls = arr3.map((e) => parseFloat(e.ls));
          let Rvti = arr3.map((e) => parseFloat(e.ti));
          let Rvprcftr = arr3.map((e) => parseFloat(e.prcftr));
          let Rvdaybuyqty = arr3.map((e) => parseFloat(e.daybuyqty));
          let Rvdaysellqty = arr3.map((e) => parseFloat(e.daysellqty));
          let Rvdaybuyamt = arr3.map((e) => parseFloat(e.daybuyamt));
          let Rvdaybuyavgprc = arr3.map((e) => parseFloat(e.daybuyavgprc));
          let Rvdaysellamt = arr3.map((e) => parseFloat(e.daysellamt));
          let Rvdaysellavgprc = arr3.map((e) => parseFloat(e.daysellavgprc));
          let Rvcfbuyqty = arr3.map((e) => parseFloat(e.cfbuyqty));
          let Rvcfsellqty = arr3.map((e) => parseFloat(e.cfsellqty));
          let Rvcfsellamt = arr3.map((e) => parseFloat(e.cfsellamt));
          let Rvcfsellavgprc = arr3.map((e) => parseFloat(e.cfsellavgprc));
          let Rvopenbuyqty = arr3.map((e) => parseFloat(e.openbuyqty));
          let Rvopensellqty = arr3.map((e) => parseFloat(e.opensellqty));
          let Rvopenbuyamt = arr3.map((e) => parseFloat(e.openbuyamt));
          let Rvopenbuyavgprc = arr3.map((e) => parseFloat(e.openbuyavgprc));
          let Rvopensellamt = arr3.map((e) => parseFloat(e.opensellamt));
          let Rvopensellavgprc = arr3.map((e) => parseFloat(e.opensellavgprc));
          let Rvdayavgprc = arr3.map((e) => parseFloat(e.dayavgprc));
          let Rvnetqty = arr3.map((e) => parseFloat(e.netqty));
          let Rvnetavgprc = arr3.map((e) => parseFloat(e.netavgprc));
          let Rvupldprc = arr3.map((e) => parseFloat(e.upldprc));
          let Rvnetupldprc = arr3.map((e) => parseFloat(e.netupldprc));
          let Rvlp = arr3.map((e) => parseFloat(e.lp));
          let Rvurmtom = arr3.map((e) => parseFloat(e.urmtom));
          let Rvrpnl = arr3.map((e) => parseFloat(e.rpnl));
          person.ls = Rvls.reduce((a, b) => a + b, 0);
          person.ti = Rvti.reduce((a, b) => a + b, 0);
          person.prcftr = Rvprcftr.reduce((a, b) => a + b, 0);
          person.daybuyqty = Rvdaybuyqty.reduce((a, b) => a + b, 0);
          person.daysellqty = Rvdaysellqty.reduce((a, b) => a + b, 0);
          person.daybuyamt = Rvdaybuyamt.reduce((a, b) => a + b, 0);
          person.daybuyavgprc = Rvdaybuyavgprc.reduce((a, b) => a + b, 0);
          person.daysellamt = Rvdaysellamt.reduce((a, b) => a + b, 0);
          person.daysellavgprc = Rvdaysellavgprc.reduce((a, b) => a + b, 0);
          person.cfbuyqty = Rvcfbuyqty.reduce((a, b) => a + b, 0);
          person.cfsellqty = Rvcfsellqty.reduce((a, b) => a + b, 0);
          person.cfsellamt = Rvcfsellamt.reduce((a, b) => a + b, 0);
          person.cfsellavgprc = Rvcfsellavgprc.reduce((a, b) => a + b, 0);
          person.openbuyqty = Rvopenbuyqty.reduce((a, b) => a + b, 0);
          person.opensellqty = Rvopensellqty.reduce((a, b) => a + b, 0);
          person.openbuyamt = Rvopenbuyamt.reduce((a, b) => a + b, 0);
          person.openbuyavgprc = Rvopenbuyavgprc.reduce((a, b) => a + b, 0);
          person.opensellamt = Rvopensellamt.reduce((a, b) => a + b, 0);
          person.opensellavgprc = Rvopensellavgprc.reduce((a, b) => a + b, 0);
          person.dayavgprc = Rvdayavgprc.reduce((a, b) => a + b, 0);
          person.netqty = Rvnetqty.reduce((a, b) => a + b, 0);
          person.netavgprc = Rvnetavgprc.reduce((a, b) => a + b, 0);
          person.upldprc = Rvupldprc.reduce((a, b) => a + b, 0);
          person.netupldprc = Rvnetupldprc.reduce((a, b) => a + b, 0);
          person.lp = Rvlp.reduce((a, b) => a + b, 0);
          person.urmtom = Rvurmtom.reduce((a, b) => a + b, 0);
          person.rpnl = Rvrpnl.reduce((a, b) => a + b, 0);
          person.daytotalPL = rv.reduce((a, b) => a + b, 0);
          person.id = val.id;
          person.createdAt = val.createdAt;
          person.updatedAt = val.updatedAt;
          person.domainName = val.get("domainName");
          person.userId = JSON.parse(val.get("userId"));
          person.weburl = val.get("weburl");
          person.Holdings = val.get("ShoonyaHoldings");
          person.OrderBook = val.get("ShoonyaOrderBook");
          person.Limits = val.get("ShoonyaLimits");
          person.PositionBook = val.get("ShoonyaPositionBook");
          console.log("the finvaisia array", person);
          return person;
        } else if (val.get("domainName") == "aliceblueonline") {
          let arr3 = val.get("AlicePosition");

          let rv = arr3.map((e) => parseFloat(e.DayPL));
          person.daytotalPL = rv.reduce((a, b) => a + b, 0);
          person.id = val.id;
          person.createdAt = val.createdAt;
          person.updatedAt = val.updatedAt;
          person.domainName = val.get("domainName");
          person.userId = JSON.parse(val.get("userId"));
          person.weburl = val.get("weburl");
          person.AliceHolding = val.get("AliceHolding");
          person.AlicePosition = val.get("AlicePosition");
          person.AliceOrders = val.get("ALiceOrders");
          person.AliceInvestment = val.get("AliceInvestment");
          person.AliceCurVal = val.get("AliceCurVal");
          person.AliceOverallPL = val.get("AliceOverallPL");
          person.AliceDayPL = val.get("AliceDayPL");
          return person;
        } else if (val.get("domainName") == "sensibull") {
          person.id = val.id;
          person.createdAt = val.createdAt;
          person.updatedAt = val.updatedAt;
          person.domainName = val.get("domainName");

          person.userId = JSON.parse(val.get("userId"));
          person.weburl = val.get("weburl");
          person.sensiNifty = val.get("niftyArray");
          person.sensiBank = val.get("bankniftyArray");
          return person;
        }
      });
      let newArray = groupBy(resultantArray, "userId");

      setTheArray(Object.keys(newArray));
      setTheArrayOfvalues(Object.values(newArray));
    });
  }

  async function raj() {
    ParseCall();
    const p = await new Parse.Query("WebUrlDom2");
    const q = p.subscribe();
    (await q).on("create", (obj) => {
      // console.log('object Created....' + obj);
      ParseCall();
    });
    (await q).on("update", (obj) => {
      // console.log('object Updated....' + obj);
      ParseCall();
    });
  }
  console.log(theArray, theArrayOfvalues, "the array ");
  const handleClick = (url) => {
    console.log("workss");
    console.log(`/users/${url}`);
    navigate(`/users/${url}`, { replace: true });
  };
  return (
    <>
      {/* <Header/> */}
      {theArrayOfvalues?.map((ev, i) => {
        return (
          <>
            <Accordion key={i}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container item xs={12} sm={6} md={3} direction="row">
                  <Typography variant="h6" sx={{ opacity: 0.72 }}>
                    {theArray[i]}
                  </Typography>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    {ev?.map((e, i) => {
                      if (e.domainName == "zerodha") {
                        return (
                          <Card>
                            <Scrollbar>
                              <Stack spacing={3} sx={{ p: 1 }}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Box
                                    component="img"
                                    alt={"dumy"}
                                    src={
                                      "https://assets.materialup.com/uploads/4b06b481-0d4b-46e9-8703-e1d55a4f2eaa/teaser.png"
                                    }
                                    sx={{
                                      width: 48,
                                      height: 48,
                                      borderRadius: 1.5,
                                      flexShrink: 0,
                                    }}
                                  />

                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                    noWrap
                                  >
                                    <AppWidgetSummary2
                                      color="error"
                                      title={e.domainName}
                                    />
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                    noWrap
                                  >
                                    <AppWidgetSummary2
                                      color="info"
                                      title={"Day P&L : " + e.daytotalPL}
                                    />
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                    noWrap
                                  >
                                    <AppWidgetSummary2
                                      color="info"
                                      title={"Day P&L : " + e.daytotalPL}
                                    />
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    sx={{
                                      pr: 3,
                                      flexShrink: 0,
                                      color: "text.secondary",
                                    }}
                                  >
                                    <AppWidgetSummary2
                                      color="warning"
                                      title={e.updatedAt.toLocaleString()}
                                    />
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Scrollbar>
                          </Card>
                        );
                      } else if (e.domainName == "finvasia") {
                        return (
                          <Card>
                            <Scrollbar>
                              <Stack spacing={3} sx={{ p: 1 }}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Box
                                    component="img"
                                    alt={"dumy"}
                                    src={
                                      "https://shoonya.finvasia.com/NorenLogoLS.png"
                                    }
                                    sx={{
                                      width: 48,
                                      height: 48,
                                      borderRadius: 1.5,
                                      flexShrink: 0,
                                    }}
                                  />

                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                    noWrap
                                  >
                                    <AppWidgetSummary2
                                      color="error"
                                      title={e.domainName}
                                    />
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                    noWrap
                                  >
                                    <AppWidgetSummary2
                                      color="info"
                                      title={"Day P&L : " + e.urmtom}
                                    />
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                    noWrap
                                  >
                                    <AppWidgetSummary2
                                      color="info"
                                      title={"Day P&L : " + e.urmtom}
                                    />
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    sx={{
                                      pr: 3,
                                      flexShrink: 0,
                                      color: "text.secondary",
                                    }}
                                  >
                                    <AppWidgetSummary2
                                      color="warning"
                                      title={e.updatedAt.toLocaleString()}
                                    />
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Scrollbar>
                          </Card>
                        );
                      } else if (e.domainName == "aliceblueonline") {
                        return (
                          <Card>
                            <Scrollbar>
                              <Stack spacing={3} sx={{ p: 1 }}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Box
                                    component="img"
                                    alt={"dumy"}
                                    src={
                                      "https://media.glassdoor.com/sqll/1906335/alice-blue-squarelogo-1559548886348.png"
                                    }
                                    sx={{
                                      width: 48,
                                      height: 48,
                                      borderRadius: 1.5,
                                      flexShrink: 0,
                                    }}
                                  />

                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                    noWrap
                                  >
                                    <AppWidgetSummary2
                                      color="error"
                                      title={e.domainName}
                                    />
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                    noWrap
                                  >
                                    <AppWidgetSummary2
                                      color="info"
                                      title={"Day P&L : " + e.daytotalPL}
                                    />
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                    noWrap
                                  >
                                    <AppWidgetSummary2
                                      color="info"
                                      title={"Day P&L : " + e.daytotalPL}
                                    />
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    sx={{
                                      flexShrink: 0,
                                      color: "text.secondary",
                                    }}
                                  >
                                    <AppWidgetSummary2
                                      color="warning"
                                      title={e.updatedAt.toLocaleString()}
                                    />
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Scrollbar>
                          </Card>
                        );
                      } else if (e.domainName == "sensibull") {
                        return (
                          <Card>
                            <Scrollbar>
                              <Stack spacing={3} sx={{ p: 1 }}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Box
                                    component="img"
                                    alt={"dumy"}
                                    src={
                                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW1PWSSVxV7O0ikE2gjihHEBUpr4cwibgaZw&usqp=CAU"
                                    }
                                    sx={{
                                      width: 48,
                                      height: 48,
                                      borderRadius: 1.5,
                                      flexShrink: 0,
                                    }}
                                  />

                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                    noWrap
                                  >
                                    <AppWidgetSummary2
                                      color="error"
                                      title={e.domainName}
                                    />
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    sx={{
                                      flexShrink: 0,
                                      color: "text.secondary",
                                    }}
                                  >
                                    <AppWidgetSummary2
                                      color="warning"
                                      title={e.updatedAt.toLocaleString()}
                                    />
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Scrollbar>
                          </Card>
                        );
                      }
                    })}
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ p: 2, textAlign: "right" }}>
                      <Button
                        onClick={() => handleClick(theArray[i])}
                        size="small"
                        color="inherit"
                        endIcon={
                          <Iconify icon={"eva:arrow-ios-forward-fill"} />
                        }
                      >
                        View all
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Divider />
          </>
        );
      })}
    </>
  );
}

export default ExtensionData;
