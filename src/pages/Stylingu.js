import React from 'react'
import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Grid";


  const useStyles = styled(() => ({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

function Stylingu() {
    const classes = useStyles();
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  
    return (
      <Grid container className={classes.container}>
        {items.map((item) => (
          <Grid key={item} item>
            {item}
          </Grid>
        ))}
      </Grid>
    );
}

export default Stylingu