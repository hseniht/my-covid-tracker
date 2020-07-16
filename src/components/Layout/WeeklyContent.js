import React, { useState, useEffect } from 'react'
import { fetchWeeklyData } from '../../api/api'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { LineChart } from '../../components/Charts/Charts'

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },
   selectEmpty: {
      marginTop: theme.spacing(2),
   },
}));

const WeeklyContent = (props) => {
   const [weeklyData, setWeeklyData] = useState({});
   const [inputDay, setInputDay] = useState(14);

   const classes = useStyles();
   // const [age, setAge] = React.useState('');

   const handleChange = (event) => {
      setInputDay(event.target.value);
   };

   useEffect(() => {
      //create an async function to handle fetchWeeklyData
      const fetchAPI = async () => {
         setWeeklyData(await fetchWeeklyData(props.country, inputDay));
      }
      if (props.country) {
         fetchAPI();
      }
      // console.log("tkk weekly data at chart", weeklyData);
      // console.log("tkk weekly casse", weeklyData.timeline);
   }, [props.country, inputDay]);

   //for ensuring object not empty
   let fetchedData = Object.entries(weeklyData), itsValid = false;
   if (fetchedData.length > 0) {
      console.log("tk week Labels timeline ran ", weeklyData.timeline);
      itsValid = true;
   }

   return (
      <div className="tab-body chart-weekly">
         <FormControl className={classes.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
               Last
         </InputLabel>
            <Select
               labelId="demo-simple-select-placeholder-label-label"
               id="demo-simple-select-placeholder-label"
               value={inputDay}
               onChange={handleChange}
               displayEmpty
               className={classes.selectEmpty}
            >
               <MenuItem value="" disabled>
                  <em>None</em>
               </MenuItem>
               <MenuItem value={7}>7 days</MenuItem>
               <MenuItem value={14}>14 days</MenuItem>
               <MenuItem value={21}>21 days</MenuItem>
               <MenuItem value={28}>28 days</MenuItem>
            </Select>
         </FormControl>
         {/* renderChart */}
         {itsValid ?
            <LineChart inputDay={inputDay}
               weeklyData={weeklyData}
               itsValid={itsValid}
            /> : <div>Loading...</div>
         }
      </div>
   )
}

export default WeeklyContent;