import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { useNavigate, useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { AppWidgetSummary, AppWidgetSummary2 } from 'src/sections/@dashboard/app';
import {
  Card,
  CardHeader,
  Divider,
  Stack,
  Link,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TableFooter,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import Iconify from 'src/components/iconify/Iconify';
import UserHeader from 'src/layouts/dashboard/header/UserHeader';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function IndividualUser() {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem('googleUsername'));
  const [theArray, setTheArray] = useState([]);
  const [theArrayOfvalues, setTheArrayOfvalues] = useState([]);
  const [userID, setuserID] = useState(null);
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
  const handleClick = (id) => {
    navigate(`/users/${id}`, { replace: true });
  };

  function ParseCall() {
    const query2 = new Parse.Query('WebUrlDom2');
    query2.descending('createdAt');
    query2.find().then((res) => {
      let resultantArray = res.map((val) => {
        console.log('the val is ', val);
        const person = new Object();
        if (val.get('domainName') == 'zerodha') {
          let arr3 = JSON.parse(val.get('ZerodhapositionsTab1'));
          arr3.pop();
          console.log(arr3, '/////\\\\\\\\');
          let rv = arr3.map((e) => parseFloat(e['P&L'].replace(/,/g, '')));
          console.log('zeroArr', rv);
          person.daytotalPL = rv.reduce((a, b) => {
            if (a != NaN) {
              return a + b;
            }
          }, 0);
          person.id = val.id;
          person.createdAt = val.createdAt;
          person.updatedAt = val.updatedAt;
          person.domainName = val.get('domainName');
          person.userId = JSON.parse(val.get('userId'));
          person.weburl = val.get('weburl');
          person.HoldingsTab = JSON.parse(val.get('ZerodhaHoldingsTab'));
          person.totalInvestment = JSON.parse(val.get('ZerodhatotalInvestment'));
          person.currentValue = JSON.parse(val.get('ZerodhacurrentValue'));
          person.DayPL = JSON.parse(val.get('ZerodhaDayPL'));
          person.TotalPL = JSON.parse(val.get('ZerodhaTotalPL'));
          let temp = JSON.parse(val.get('ZerodhapositionsTab1'));
          temp.pop();
          person.positionsTab1 = temp;
          return person;
        } else if (val.get('domainName') == 'finvasia') {
          let arr3 = val.get('ShoonyaPositionBook');
          console.log('finArr', arr3);
          let rv = arr3.map((e) => parseFloat(e.rpnl.replace(/,/g, '')));
          person.daytotalPL = rv.reduce((a, b) => a + b, 0);
          person.id = val.id;
          person.createdAt = val.createdAt;
          person.updatedAt = val.updatedAt;
          person.domainName = val.get('domainName');
          person.userId = JSON.parse(val.get('userId'));
          person.weburl = val.get('weburl');
          person.Holdings = val.get('ShoonyaHoldings');
          person.OrderBook = val.get('ShoonyaOrderBook');
          person.Limits = val.get('ShoonyaLimits');
          person.PositionBook = val.get('ShoonyaPositionBook');
          return person;
        } else if (val.get('domainName') == 'aliceblueonline') {
          let arr3 = val.get('AlicePosition');
          console.log('AliceArr', arr3);

          let rv = arr3.map((e) => parseFloat(e.DayPL));
          person.daytotalPL = rv.reduce((a, b) => a + b, 0);
          person.id = val.id;
          person.createdAt = val.createdAt;
          person.updatedAt = val.updatedAt;
          person.domainName = val.get('domainName');
          person.userId = JSON.parse(val.get('userId'));
          person.weburl = val.get('weburl');
          person.AliceHolding = val.get('AliceHolding');
          person.AlicePosition = val.get('AlicePosition');
          person.AliceOrders = val.get('ALiceOrders');
          person.AliceInvestment = val.get('AliceInvestment');
          person.AliceCurVal = val.get('AliceCurVal');
          person.AliceOverallPL = val.get('AliceOverallPL');
          person.AliceDayPL = val.get('AliceDayPL');
          return person;
        }else if(val.get('domainName') == 'sensibull'){
          person.id = val.id;
          person.createdAt = val.createdAt;
          person.updatedAt = val.updatedAt;
          person.weburl = val.get('weburl');
          person.userId = JSON.parse(val.get('userId'));
          person.domainName = val.get('domainName');

          person.sensiNifty = JSON.parse(val.get('niftyArray'));
          person.sensiBank = JSON.parse(val.get('bankniftyArray'));
          return person
        }
      });
      let newArray = groupBy(resultantArray, 'userId');

      setTheArray(Object.keys(newArray));
      setTheArrayOfvalues(Object.values(newArray));
    });
  }

  async function raj() {
    ParseCall();
    const p = await new Parse.Query('WebUrlDom2');
    const q = p.subscribe();
    (await q).on('create', (obj) => {
      console.log('object Created....' + obj);
      ParseCall();
    });
    (await q).on('update', (obj) => {
      console.log('object Updated....' + obj);
      ParseCall();
    });
  }
  console.log(theArray, theArrayOfvalues, 'the array ');
  const signout = () => {
    navigate(`/`, { replace: true });
  };
  function ProfilePage() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    let dump = useParams();
    return (
      <div>
        {theArrayOfvalues
          ?.filter((ev, i) => {
            return theArray[i] == dump.id;
          })
          .map((ev, i) => {
            return (
              <div key={i}>
                {ev?.map((e, i) => {
                  if (e.domainName == 'zerodha') {
                    return (
                      // <Accordion key={e.id} sx={{ backgroundColor: '#E9E9E9' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                      //   <AccordionSummary
                      //   aria-controls="panel1d-content" id="panel1d-header"
                      //   >
                      //     <Typography variant="h3" sx={{ opacity: 0.72 }}>
                      //       zerodha
                      //     </Typography>
                      //   </AccordionSummary>
                      //   <AccordionDetails>
                          <Box sx={{ width: '100%' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                              <Grid item xs={6}>
                                <Typography variant="h5" sx={{ opacity: 0.82 }}>
                                  Holdings - {e.HoldingsTab.length}
                                </Typography>
                                <TableContainer style={{ maxHeight: 350 }} component={Paper}>
                                  <Table stickyHeader sx={{ minWidth: 650 }}>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Instrument</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell align="right">Profit and Loss</TableCell>
                                        <TableCell align="right">LTP</TableCell>
                                        <TableCell align="right">Average Cost</TableCell>
                                        <TableCell align="right">Current Value</TableCell>
                                        <TableCell align="right">Day Change</TableCell>
                                        <TableCell align="right">Net Change</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {e.HoldingsTab?.map((row, i) => (
                                        <TableRow
                                          key={row.Instrument}
                                          sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                          }}
                                        >
                                          <TableCell component="th" scope="row">
                                            {row.Instrument}
                                          </TableCell>
                                          <TableCell align="right">{row['Qty.']}</TableCell>
                                          <TableCell align="right">{row['P&L']}</TableCell>
                                          <TableCell align="right">{row.LTP}</TableCell>
                                          <TableCell align="right">{row['Avg. cost']}</TableCell>
                                          <TableCell align="right">{row['Cur. val']}</TableCell>
                                          <TableCell align="right">{row['Day chg.']}</TableCell>
                                          <TableCell align="right">{row['Net chg.']}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                    <TableFooter>
                                      <TableRow>
                                        <TableCell>{e.DayPL}</TableCell>
                                        <TableCell>{e.TotalPL}</TableCell>
                                        <TableCell>{e.totalInvestment}</TableCell>
                                        <TableCell>{e.currentValue}</TableCell>
                                      </TableRow>
                                    </TableFooter>
                                  </Table>
                                </TableContainer>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="h5" sx={{ opacity: 0.82 }}>
                                  PositionBook - {e.positionsTab1.length}
                                </Typography>
                                <TableContainer style={{ maxHeight: 350 }} component={Paper}>
                                  <Table stickyHeader sx={{ minWidth: 650 }}>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Instrument</TableCell>
                                        <TableCell align="right">Qty</TableCell>
                                        <TableCell align="right">P&L</TableCell>
                                        <TableCell align="right">LTP</TableCell>
                                        <TableCell align="right">Avg</TableCell>
                                        <TableCell align="right">Chng</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {e.positionsTab1?.map((row, i) => (
                                        <TableRow
                                          key={i}
                                          sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                          }}
                                        >
                                          <TableCell component="th" scope="row">
                                            {row.Instrument}
                                          </TableCell>
                                          <TableCell align="right">{row['Qty.']}</TableCell>
                                          <TableCell align="right">{row['P&L']}</TableCell>
                                          <TableCell align="right">{row.LTP}</TableCell>
                                          <TableCell align="right">{row['Avg.']}</TableCell>
                                          <TableCell align="right">{row['Chg.']}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Grid>
                            </Grid>
                          </Box>
                      //   </AccordionDetails>
                      // </Accordion>
                    );
                  } else if (e.domainName == 'finvasia') {
                    return (
                      // <Accordion key={e.id} sx={{ backgroundColor: '#E9E9E9' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                      // <AccordionSummary
                      // aria-controls="panel1d-content" id="panel1d-header"
                      // >
                      //     <Typography variant="h3" sx={{ opacity: 0.72 }}>
                      //       finvasia
                      //     </Typography>
                      //   </AccordionSummary>
                      //   <AccordionDetails>
                          <Box sx={{ width: '100%' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                              <Grid item xs={6}>
                              <Typography variant="h5" sx={{ opacity: 0.82 }}>
                                  OrderBook - {e.OrderBook.length}
                                </Typography>
                                <TableContainer style={{ maxHeight: 350 }} component={Paper}>
                                  <Table stickyHeader sx={{ minWidth: 650 }}>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Instrument</TableCell>
                                        <TableCell align="right">Qty</TableCell>
                                        <TableCell align="right">Type</TableCell>
                                        <TableCell align="right">Product</TableCell>
                                        <TableCell align="right">Avg Price</TableCell>
                                        <TableCell align="right">orderTime</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {e.OrderBook?.map((row, i) => (
                                        <TableRow
                                          key={i}
                                          sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                          }}
                                        >
                                          <TableCell component="th" scope="row">
                                            {row.dname}
                                          </TableCell>
                                          <TableCell align="right">{row.rqty}</TableCell>
                                          <TableCell align="right">
                                            {/* {row.netqty} */}
                                            {row.trantype == 'S' ? 'Sell' : 'Buy'}
                                          </TableCell>
                                          <TableCell align="right">NRML</TableCell>
                                          <TableCell align="right">{row.avgprc}</TableCell>
                                          <TableCell align="right">{row.exch_tm}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                                <Typography variant="h5" sx={{ opacity: 0.82 }}>
                                  Holdings - {e.Holdings.length}
                                </Typography>
                                <TableContainer component={Paper}>
                                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Exchange</TableCell>
                                        <TableCell align="right">Qty</TableCell>
                                        <TableCell align="right">Saleable</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {e.Holdings?.map((row, i) => (
                                        <TableRow
                                          key={i}
                                          sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                          }}
                                        >
                                          <TableCell component="th" scope="row">
                                            {row.exch_tsym[0].tsym}
                                          </TableCell>
                                          <TableCell align="right">{row.holdqty}</TableCell>
                                          <TableCell align="right">{row.colqty}</TableCell>
                                          <TableCell align="right">{row.upldprc}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                         
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="h5" sx={{ opacity: 0.82 }}>
                                  PositionBook - {e.PositionBook.length}
                                </Typography>
                                <TableContainer style={{ maxHeight: 350 }} component={Paper}>
                                  <Table stickyHeader sx={{ minWidth: 650 }}>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Instrument</TableCell>
                                        <TableCell align="right">buy qty</TableCell>
                                        <TableCell align="right">sell qty</TableCell>
                                        <TableCell align="right">buy amount</TableCell>
                                        <TableCell align="right">sell amount</TableCell>
                                        <TableCell align="right">DayMTM</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {e.PositionBook?.map((row) => (
                                        <TableRow
                                          key={row.dname}
                                          sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                          }}
                                        >
                                          <TableCell component="th" scope="row">
                                            {row.dname}
                                          </TableCell>
                                          <TableCell align="right">{row.daybuyqty}</TableCell>
                                          <TableCell align="right">{row.daysellqty}</TableCell>
                                          <TableCell align="right">{row.daybuyamt}</TableCell>
                                          <TableCell align="right">{row.daysellamt}</TableCell>
                                          <TableCell align="right">{row.rpnl}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Grid>
                              <Grid item xs={6}></Grid>
                            </Grid>
                          </Box>
                      //   </AccordionDetails>
                      // </Accordion>
                    );
                  } else if (e.domainName == 'aliceblueonline') {
                    return (
                      // <Accordion key={e.id} sx={{ backgroundColor: '#E9E9E9' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                      // <AccordionSummary
                      // aria-controls="panel1d-content" id="panel1d-header"
                      // >
                      //     <Typography variant="h3" sx={{ opacity: 0.72 }}>
                      //       aliceblueonline
                      //     </Typography>
                      //   </AccordionSummary>
                      //   <AccordionDetails>
                          <Box sx={{ width: '100%' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                              <Grid item xs={6}>
                              <Typography variant="h5" sx={{ opacity: 0.82 }}>
                                  OrderBook - {e.AliceOrders.length}
                                </Typography>
                                <TableContainer style={{ maxHeight: 350 }} component={Paper}>
                                  <Table stickyHeader sx={{ minWidth: 650 }}>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Instrument</TableCell>
                                        <TableCell align="right">Qty</TableCell>
                                        <TableCell align="right">Type</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">OrderTime</TableCell>
                                        <TableCell align="right">Product</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {e.AliceOrders?.map((row, i) => (
                                        <TableRow
                                          key={i}
                                          sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                          }}
                                        >
                                          <TableCell component="th" scope="row">
                                            {row.Instrument}
                                          </TableCell>
                                          <TableCell align="right">{row.Qty}</TableCell>
                                          <TableCell align="right">{row.Type}</TableCell>
                                          <TableCell align="right">{row.Status}</TableCell>
                                          <TableCell align="right">{row.Price}</TableCell>
                                          <TableCell align="right">{row.Time}</TableCell>
                                          <TableCell align="right">{row.Product}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                                <Typography variant="h5" sx={{ opacity: 0.82 }}>
                                  Holdings - {e.AliceHolding.length}
                                </Typography>
                                <TableContainer style={{ maxHeight: 350 }} component={Paper}>
                                  <Table stickyHeader sx={{ minWidth: 650 }}>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Instrument</TableCell>
                                        <TableCell align="right">Qty</TableCell>
                                        <TableCell align="right">Profit and Loss</TableCell>
                                        <TableCell align="right">LTP</TableCell>
                                        <TableCell align="right">Buy Value</TableCell>
                                        <TableCell align="right">Buy Average</TableCell>
                                        <TableCell align="right">Net Change</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {e.AliceHolding?.map((row, i) => (
                                        <TableRow
                                          key={row.Instrument}
                                          sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                          }}
                                        >
                                          <TableCell component="th" scope="row">
                                            {row.Instrument}
                                          </TableCell>
                                          <TableCell align="right">{row.Qty}</TableCell>
                                          <TableCell align="right">{row.PL}</TableCell>
                                          <TableCell align="right">{row.Ltp}</TableCell>
                                          <TableCell align="right">{row.BuyAvg}</TableCell>
                                          <TableCell align="right">{row.BuyValue}</TableCell>
                                          <TableCell align="right">{row.NetChg}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="h5" sx={{ opacity: 0.82 }}>
                                  PositionBook - {e.AlicePosition.length}
                                </Typography>
                                <TableContainer style={{ maxHeight: 350 }} component={Paper}>
                                  <Table stickyHeader sx={{ minWidth: 650 }}>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Instrument</TableCell>
                                        <TableCell align="right">Qty</TableCell>
                                        <TableCell align="right">P&L</TableCell>
                                        <TableCell align="right">LTP</TableCell>
                                        <TableCell align="right">Buy Avg</TableCell>
                                        <TableCell align="right">Sell Avg</TableCell>
                                        <TableCell align="right">Net P&L</TableCell>
                                        <TableCell align="right">Type</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {e.AlicePosition?.map((row) => (
                                        <TableRow
                                          key={row.Instrument}
                                          sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                          }}
                                        >
                                          <TableCell component="th" scope="row">
                                            {row.Instrument}
                                          </TableCell>
                                          <TableCell align="right">{row.Qty}</TableCell>
                                          <TableCell align="right">{row.DayPL}</TableCell>
                                          <TableCell align="right">{row.Ltp}</TableCell>
                                          <TableCell align="right">{row.BuyAvg}</TableCell>
                                          <TableCell align="right">{row.SellAvg}</TableCell>
                                          <TableCell align="right">{row.NetPL}</TableCell>
                                          <TableCell align="right">{row.Type}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Grid>
                            </Grid>
                          </Box>
                      //   </AccordionDetails>
                      // </Accordion>
                    );
                  }else if (e.domainName == 'sensibull') {
                    return(
                      // <Accordion key={e.id} sx={{ backgroundColor: '#E9E9E9' }}>
                      // <AccordionSummary
                      //   expandIcon={<ExpandMoreIcon />}
                      //   aria-controls="panel1a-content"
                      //   id="panel1a-header"
                      // >
                      //   <Typography variant="h3" sx={{ opacity: 0.72 }}>
                      //   Sensibull
                      //   </Typography>
                      // </AccordionSummary>
                      // <AccordionDetails>
                        <Box sx={{ width: '100%' }}>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                              <Typography variant="h5" sx={{ opacity: 0.82 }}>
                                nifty - {e.sensiNifty.length}
                              </Typography>
                              <TableContainer style={{ maxHeight: 650 }} component={Paper}>
                                <Table stickyHeader sx={{ minWidth: 650 }}>
                                  <TableHead>
                                    <TableRow>

                                      <TableCell>Strike</TableCell>
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
                                    {e.sensiNifty?.map((row, i) => (
                                      <TableRow
                                        key={row.Instrument}
                                        sx={{
                                          '&:last-child td, &:last-child th': { border: 0 },
                                        }}
                                      >
                                        <TableCell>{row.Strike}</TableCell>
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
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="h5" sx={{ opacity: 0.82 }}>
                                banknifty - {e.sensiBank.length}
                              </Typography>
                              <TableContainer style={{ maxHeight: 650 }} component={Paper}>
                                <Table stickyHeader sx={{ minWidth: 650 }}>
                                  <TableHead>
                                    <TableRow>

                                      <TableCell>Strike</TableCell>
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
                                    {e.sensiBank?.map((row, i) => (
                                      <TableRow
                                        key={row.Instrument}
                                        sx={{
                                          '&:last-child td, &:last-child th': { border: 0 },
                                        }}
                                      >
                                        <TableCell>{row.Strike}</TableCell>
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
                            </Grid>
                          </Grid>
                        </Box>
                    //   </AccordionDetails>
                    // </Accordion>
                    )
                  }
                })}
              </div>
            );
          })}
      </div>
    );
  }
  // console.log(props);
  // console.log(props.match.params);
  console.log(localStorage.getItem('googleUsername'));
  console.log(localStorage.getItem('googleUserEmail'));
  console.log(localStorage.getItem('googleUserpicture'));
  return (
    <>
      {isSignedIn && (
        <>
          <Grid >
            <UserHeader />
            <Grid container>

            <Grid textAlign="right" sx={{ paddingX: 5, marginY: 1 }}>
              <Button size="medium" color="warning" variant="outlined" onClick={signout}>
                back
              </Button>
            </Grid>
            </Grid>
            <Card sx={{ m: 2, boxShadow: 5 }}>
              <ProfilePage />
            </Card>
          </Grid>
        </>
      )}
    </>
  );
}
