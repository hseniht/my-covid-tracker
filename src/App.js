import React, { Component } from 'react'
import Cards, { TabContent } from './components/Cards/Cards'
import Chart from './components/Charts/Charts'

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
      newCountry:'Malaysia'
   }

   async componentDidMount() {
      //async await function
      // try {
      //    const covid_resp = await fetch(`https://api-corona.azurewebsites.net/country/${this.state.country}`)
      //    const covid_data = await covid_resp.json()
      //    console.log("tkk state on mount", this.state.country);
      //    console.log("tkk did mount async way", covid_data);
      //    let fetchedData = covid_data //just for syntatic sugar 
      //    this.setState({
      //       data: fetchedData.Summary,
      //    });

      //    if (!covid_resp.ok) {
      //       console.log("tk weatherResp:", covid_resp.statusText); //"statusText" available when on fetch request
      //       throw Error(covid_resp.statusText);
      //    }
      // } catch (error) {
      //    console.log("tk catch err ", error);
      // }
      const fetchedData = await fetchCountryData(this.state.country);
      console.log("tkk after mount new data", fetchedData.Summary);
      this.setState({data: fetchedData.Summary});
   }

   async componentDidUpdate(prevProps, prevState) {
      // Typical usage (don't forget to compare props):
      if (this.state.newCountry !== prevState.newCountry) {
         const fetchedData = await fetchCountryData(this.state.newCountry);
         console.log("tkk comp Did update ran pre", prevState.newCountry);
         console.log("tkk comp Did update ran curr", this.state.newCountry);
         if(fetchedData){
            this.setState({data: fetchedData.Summary});
         }
      }
   }

   // const [value, setValue] = React.useState(0);
   
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
      console.log("tkk covid data after fetch", this.state.data);
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
      // } = this.state.data;
      return (
         <div className="container">
            <h1>MY Covid Tracker</h1>
            {/* <WidgetWeather /> */}
            {/* <Cards data={this.state.data} /> */}
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
                     // confirmed={Confirmed}
                     // deaths={Deaths}
                     // newConfirmed={NewConfirmed}
                     // newDeaths={NewDeaths}
                     // newRecovered={NewRecovered}
                     // recovered={Recovered}
                     // lastUpdate={Last_Update}
                     onHandleChange={this.handleChange}
                     onHandleClick={this.handleSearch}
                  />
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
               {/* {NewRecovered} */}
               1S
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
               <Chart data={this.state} />
            </TabPanel>
         </div>
      )
   }
}