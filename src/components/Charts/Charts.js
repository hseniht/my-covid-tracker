import React, { Component } from 'react'
// import { fetchWeeklyData } from '../../api/api'
import { Bar, Line } from 'react-chartjs-2'

// import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';


//sample Chart
class SampleChart extends Component {
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

export default SampleChart;

//single chart

export const LineChart = ({ inputDay, weeklyData, itsValid }) => {
   return (
      <Line
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
                  // backgroundColor: "rgba(54, 162, 235, 1)",
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  data: Object.values(weeklyData.timeline.cases)
               }, {
                  label: "Recovered",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  data: Object.values(weeklyData.timeline.recovered)
               }, {
                  label: "Deaths",
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  borderColor: "rgba(255, 99, 132, 1)",
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
      />
   )
}
