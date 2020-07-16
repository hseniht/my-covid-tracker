import React, { Component, useState, useEffect } from 'react'
import { fetchWeeklyData } from '../../api/api'
import { Bar, Line, Pie } from 'react-chartjs-2'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class Chart extends Component {
   state = {
      data: {
         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
         datasets: [{
            label: '# of Count',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
         }]
      }
   }
   render() {
      return (
         <div className="chart">
            <Bar
               data={this.state.data}
               width={100}
               height={250}
               options={{ maintainAspectRatio: false }}
            />
         </div>
      )
   }
}

export default Chart;

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },
   selectEmpty: {
      marginTop: theme.spacing(2),
   },
}));

export const WeeklyChart = (props) => {
   const [weeklyData, setWeeklyData] = useState({});
   const [inputDay, setInputDay] = useState(16);

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

   let fetchedData = Object.entries(weeklyData), itsValid = false;

   if (fetchedData.length > 0) {
      console.log("tk week Labels timeline ran ", weeklyData.timeline);
      itsValid = true;
   }
   const renderChart = (
      itsValid ? (
         <Bar
            data={{
               // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
               labels: Object.keys(weeklyData.timeline.cases), //x-axis
               // labels: weeklyData.map(({timeline}) => timeline),
               // datasets: [{
               //    label: '# of Votes',
               //    data: [12, 19, 3, 5, 2, 3, 10],
               //    backgroundColor: [
               //       'rgba(255, 99, 132, 0.2)', //red
               //       'rgba(54, 162, 235, 0.2)', //blue
               //       'rgba(255, 206, 86, 0.2)', //yellow
               //       'rgba(75, 192, 192, 0.2)', //green
               //       'rgba(153, 102, 255, 0.2)', //purple
               //       'rgba(255, 159, 64, 0.2)', //orange
               //       'rgba(0, 0, 0, 0.1)'
               //    ],
               //    borderColor: [
               //       'rgba(255, 99, 132, 1)',
               //       'rgba(54, 162, 235, 1)',
               //       'rgba(255, 206, 86, 1)',
               //       'rgba(75, 192, 192, 1)',
               //       'rgba(153, 102, 255, 1)',
               //       'rgba(255, 159, 64, 1)',
               //       'rgba(0, 0, 0, 0.1)'
               //    ],
               //    borderWidth: 1
               // }]
               datasets: [
                  {
                     label: "Cases",
                     backgroundColor: "rgba(54, 162, 235, 1)",
                     data: Object.values(weeklyData.timeline.cases)
                  }, {
                     label: "Recovered",
                     backgroundColor: "rgba(75, 192, 192, 1)",
                     data: Object.values(weeklyData.timeline.recovered)
                  }, {
                     label: "Deaths",
                     backgroundColor: "rgba(255, 99, 132, 1)",
                     data: Object.values(weeklyData.timeline.deaths)
                  }
               ]
            }}
            options={{
               title: {
                  display: true,
                  text: `Last ${inputDay} day for ${weeklyData.country}`
               }
            }}
         />) : <div>Loading chart... </div>
   )
   return (
      <div className="chart-weekly">
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
         {renderChart}
      </div>
   )
}