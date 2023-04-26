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
import { List, ListItem, ListItemText } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const useStyles = styled(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function SensiBullMain() {
  const classes = useStyles();

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



  async function ParseCall() {
    console.log("ParseCall");

    const qq = new Parse.Query("Nifty");
    qq.descending("createdAt");
    qq.distinct("Strike").then((r) => {
      console.log(r, "r is");

      let resultantArray = r?.filter((e) => parseInt(e) < 30000);
      setTheArray(resultantArray);
    });
    const qq2 = new Parse.Query("bankNifty");
    qq2.descending("createdAt");
    qq2.distinct("Strike").then((r) => {
      console.log(r, "r is");

      let resultantArray = r?.filter((e) => parseInt(e) > 30000);
      setTheArrayOfvalues(resultantArray);
    });
  }



  
  const StyledList = styled(List)(({ theme }) => ({
    backgroundColor: "#f7f7f7",
    boxShadow: `0px 2px 6px 0px rgba(0,0,0,0.7)`,
  }));

  const StyledListItem = styled(ListItem)({
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "#e8e8e8",
    },
  });
  const handleClick = (url) => {
    console.log("workss");
    console.log(`/strike/${url}`);
    navigate(`/strike/${url}`, { replace: true });
  };
  console.log(theArray, "theArraytheArraytheArray");
  return (
    <>
      <UserHeader />
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid sx={{ my: 2, ml: 3, p: 2,textAlign:"center" }} item xs={5.8}>
            <StyledList>
              <ListItemText>
                <h1>Nifty</h1>
              </ListItemText>
              {theArray.map((ele) => (
                <StyledListItem>
                  <ListItemText>
                    <h3>{ele}</h3>
                  </ListItemText>
                  <Grid xs={4}>
                    <Box sx={{ p: 2, textAlign: "right" }}>
                      <LoadingButton
                        
                        size="medium"
                        type="submit"
                        variant="contained"
                        onClick={() => handleClick(ele)}
                        endIcon={
                          <Iconify icon={"eva:arrow-ios-forward-fill"} />
                        }
                      >
                        View all
                      </LoadingButton>
                    </Box>
                  </Grid>
                </StyledListItem>
              ))}
            </StyledList>
          </Grid>
          <Grid sx={{ my: 2, ml: 3, p: 2,textAlign:"center" }} item xs={5.8}>
            <StyledList>
              <ListItemText>
                <h1>BankNifty</h1>
              </ListItemText>

              {theArrayOfvalues.map((ele) => (
                <StyledListItem>
                  <ListItemText>
                    <h3>{ele}</h3>
                  </ListItemText>
                  <Grid xs={4}>
                    <Box sx={{ p: 2, textAlign: "right" }}>
                    <LoadingButton
                        
                        size="medium"
                        type="submit"
                        variant="contained"
                        onClick={() => handleClick(ele)}
                        endIcon={
                          <Iconify icon={"eva:arrow-ios-forward-fill"} />
                        }
                      >
                        View all
                      </LoadingButton>
                    </Box>
                  </Grid>
                </StyledListItem>
              ))}
              
            </StyledList>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default SensiBullMain;
