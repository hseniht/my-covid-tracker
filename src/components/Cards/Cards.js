import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CountUp from 'react-countup';


const Cards = (props) => {
   console.log("tk fetched data", props);
   return (
      <h1>Cards</h1>
   )
}

export default Cards;

const useStyles = makeStyles((theme) => ({
   container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
   },
   paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      display: 'flex'
   },
   divider: {
      margin: theme.spacing(2, 0),
   },
}));


const CardInfo = ({ icon, text, digits }) => {
   return (
      digits >= 0 ?
      <Grid container wrap="nowrap" spacing={2}>
         {icon &&
            <Grid item><Avatar>{icon}</Avatar></Grid>
         }
         <Grid item xs align='left'>
            <Typography variant="caption">{text}</Typography>
            <Typography variant="h6">
               <CountUp
                  start={0}
                  end={digits}
                  duration={1.5}
               />
            </Typography>
         </Grid>
      </Grid> : null
   )
}

const StatsPage = ({ data: { Active
   , Code
   , Confirmed
   , Country_Region
   , Deaths
   , Last_Update
   , NewConfirmed
   , NewDeaths
   , NewRecovered
   , Recovered }
   , classes }) => {
   // const { Active
   //    , Code
   //    , Confirmed
   //    , Country_Region
   //    , Deaths
   //    , Last_Update
   //    , NewConfirmed
   //    , NewDeaths
   //    , NewRecovered
   //    , Recovered
   // } = data;
   return (
      <Grid container spacing={3} className="stats-container">
         <Grid item xs={4}>
            <Paper className={classes.paper}>
               <CardInfo
                  icon="C"
                  text={"Confirmed"}
                  digits={NewConfirmed}
               />
            </Paper>
         </Grid>
         <Grid item xs={4}>
            <Paper className={classes.paper}>
               <CardInfo
                  icon="R"
                  text={"Recovered"}
                  digits={NewRecovered}
               />
            </Paper>
         </Grid>
         <Grid item xs={4}>
            <Paper className={classes.paper}>
               <CardInfo
                  icon="D"
                  text={"Death"}
                  digits={NewDeaths}
               />
            </Paper>
         </Grid>
         <Grid item xs={6}>
            <Paper className={classes.paper} display="flex">
               <CardInfo
                  text={"Total Confirmed"}
                  digits={Confirmed}
               />
               <CardInfo
                  text={"Total Recoverd"}
                  digits={Recovered}
               />
               <CardInfo
                  text={"Total death"}
                  digits={Deaths}
               />
            </Paper>
         </Grid>
         <Grid item xs={6}>
            <Paper className={classes.paper}>
               <Grid container wrap="nowrap" spacing={2}>
                  <Grid item xs align='left'>
                     <Typography variant="caption">{"Last Updated"}</Typography>
                     <Typography variant="h6">{new Date(Last_Update).toDateString()}</Typography>
                  </Grid>
               </Grid>
            </Paper>
         </Grid>
      </Grid>
   )
}

export const TabContent = ({ country, data, onHandleChange, onHandleClick }) => {
   const classes = useStyles();
   return (
      <Grid container spacing={3}>
         <Grid item xs={12}>
            <TextField
               id={country}
               label="Country"
               defaultValue={country}
               helperText={"e.g. \"Malaysia\", \"MY\", \"my\" "}
               onChange={onHandleChange}
            />
            <Button variant="contained" color="primary" onClick={onHandleClick}>
               Search
            </Button>
         </Grid>
         {!data ? <div>Loading...</div> :
            <StatsPage data={data} classes={classes} />
         }
      </Grid>
   )
} 