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

//per country
export async function fetchCountryData(country) {
   try {
      const covid_resp = await fetch(`https://api-corona.azurewebsites.net/country/${country}`);
      const covid_data = await covid_resp.json()
      return covid_data;

   } catch (error) {
      console.log("tk error when fetching country data", error);
   }
}

//daily
export async function fetchWeeklyData(country, day) {
   try {
      const weekly_resp = await fetch(`https://corona.lmao.ninja/v2/historical/${country}?lastdays=${day}`);
      const weekly_data = await weekly_resp.json()
      console.log("tks weekly data response", weekly_resp.ok)
      console.log("tks weekly data", weekly_data)
      if (!weekly_resp.ok) {
         console.log("tk weatherResp:", weekly_resp.statusText); //"statusText" available when on fetch request
         return {};
      }
      return weekly_data;

   } catch (error) {
      console.log("tk error when fetching weekly data", error);
   }
}