import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CountUp from 'react-countup';
import { green, pink, red, blue } from '@material-ui/core/colors';


// const Cards = (props) => {
//    console.log("tk fetched data", props);
//    return (
//       <h1>Cards</h1>
//    )
// }

// export default Cards;

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
   root: {
      display: 'flex',
      '& > *': {
         margin: theme.spacing(1),
      },
   },
   pink: {
      color: theme.palette.getContrastText(pink[500]),
      backgroundColor: pink[500],
   },
   green: {
      color: '#fff',
      backgroundColor: green[200],
   },
   red: {
      color: '#fff',
      backgroundColor: red[200],
   },
   blue: {
      color: '#fff',
      backgroundColor: blue[200],
   }
}));


const CardInfo = ({ icon, iconClass, text, digits }) => {
   return (
      digits >= 0 ?
         <Grid container wrap="nowrap" spacing={2}>
            {icon &&
               <Grid item><Avatar className={iconClass}>{icon}</Avatar></Grid>
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

const Statistics = ({ data: { Active
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
         {/* <Grid item xs=12>

         </Grid> */}
         <Grid item xs={4}>
            <Paper className={classes.paper}>
               <CardInfo
                  icon="C"
                  iconClass={classes.blue}
                  text={"Confirmed"}
                  digits={NewConfirmed}
               />
            </Paper>
         </Grid>
         <Grid item xs={4}>
            <Paper className={classes.paper}>
               <CardInfo
                  icon="R"
                  iconClass={classes.green}
                  text={"Recovered"}
                  digits={NewRecovered}
               />
            </Paper>
         </Grid>
         <Grid item xs={4}>
            <Paper className={classes.paper}>
               <CardInfo
                  icon="D"
                  iconClass={classes.red}
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

const DailyContent = ({ country, data, onHandleChange, onHandleClick }) => {
   const classes = useStyles();
   return (
      <Grid container spacing={3}>
         <Typography component="div">
            <Box fontSize="h5.fontSize" fontWeight="fontWeightMedium" m={1}>Daily Reported Stats</Box>
         </Typography>
         {/* <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs align='left'>
               <Typography variant="h6">{"Last Updated"}</Typography>
               <Typography variant="caption">{"test"}</Typography>
            </Grid>
            </Grid> */}
         {!data ? <div>Loading...</div> :
            <Statistics data={data} classes={classes} />
         }
      </Grid>
   )
}

export default DailyContent;