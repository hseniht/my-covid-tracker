import React, { Component } from 'react'
import Cards, { TabContent } from './components/Cards/Cards'
import Chart, { WeeklyChart } from './components/Charts/Charts'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { fetchCountryData } from './api/api'

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div className="tab-body">
         {value === index && (
            <Box p={3}> {/*padding? */}
               {/* <Typography>
               </Typography> */}
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
         console.log("tkk comp Did update ran pre", prevState.newCountry);
         console.log("tkk comp Did update ran curr", this.state.newCountry);
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
            <h1>MY Covid Tracker</h1>
            <AppBar position="static">
               <Tabs value={this.state.value} onChange={this.onSelectTabs} aria-label="simple tabs example">
                  <Tab label="Latest" />
                  <Tab label="WeekLy" />
                  <Tab label="Global" />
               </Tabs>
            </AppBar>
            <TabPanel value={this.state.value} index={0}>
               {/* {!this.state.data ? <div>Loading...</div> : */}
               <TabContent
                  data={this.state.data}
                  country={this.state.country}
                  onHandleChange={this.handleChange}
                  onHandleClick={this.handleSearch}
               />
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
               {/* {NewRecovered} */}
               <WeeklyChart country={this.state.newCountry} />
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
               <Chart data={this.state} />
            </TabPanel>
         </div>
      )
   }
}