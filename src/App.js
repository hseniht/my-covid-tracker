import React, { Component } from 'react'
import DailyContent from './components/Layout/DailyContent'
import SampleChart from './components/Charts/Charts'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import { fetchCountryData } from './api/api'
import WeeklyContent from './components/Layout/WeeklyContent';

function TabPanel(props) {
   const { children, value, index } = props;
   return (
      <div className="tab-body">
         {value === index && (
            <Box p={3}>
               {children}
            </Box>
         )}
      </div>
   );
}

export default class App extends Component {

   state = {
      data: {},
      value: 0,
      country: 'Malaysia',
      newCountry: 'Malaysia'
   }

   async componentDidMount() {
      const fetchedData = await fetchCountryData(this.state.country);
      console.log("tkk after mount new data", fetchedData.Summary);
      this.setState({ data: fetchedData.Summary });
   }

   async componentDidUpdate(prevProps, prevState) {
      if (this.state.newCountry !== prevState.newCountry) {
         const fetchedData = await fetchCountryData(this.state.newCountry);
         // console.log("tkk comp Did update ran pre", prevState.newCountry);
         // console.log("tkk comp Did update ran curr", this.state.newCountry);
         if (fetchedData) {
            this.setState({ data: fetchedData.Summary });
         }
      }
   }

   handleChange = (e) => {
      this.setState({ country: e.target.value })
   }

   handleSearch = (e) => {
      this.setState({ newCountry: this.state.country })
   }

   onSelectTabs = (event, newValue) => {
      this.setState({
         value: newValue
      })
   };

   render() {
      return (
         <div className="container">
            <Typography component="div">
               <Box fontSize="h2.fontSize" fontWeight="fontWeightMedium" m={1}>MY Covid Tracker</Box>
            </Typography>
            <Box m={2} xs={12}>
               <TextField
                  id={this.state.country}
                  label="Country"
                  defaultValue={this.state.country}
                  helperText={"e.g. \"Malaysia\", \"MY\", \"my\" "}
                  onChange={this.handleChange}
               />
               <Button variant="contained" color="primary" onClick={this.handleSearch}>
                  Search
               </Button>
            </Box>
            {/*Tab Box Component */}
            <AppBar position="static">
               <Tabs value={this.state.value} onChange={this.onSelectTabs} aria-label="simple tabs example">
                  <Tab label="Latest" />
                  <Tab label="WeekLy" />
                  <Tab label="Global" />
               </Tabs>
            </AppBar>
            <TabPanel value={this.state.value} index={0}>
               <DailyContent data={this.state.data} />
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
               {/* <WeeklyChart country={this.state.newCountry} /> */}
               <WeeklyContent country={this.state.newCountry} />
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
               <SampleChart data={this.state} />
            </TabPanel>
         </div>
      )
   }
}