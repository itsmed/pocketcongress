# PoktCongress

*Giving users an easy way to track their Senators' and Congress Person's voting record.*

<img src="./src/images/screenshots/specific_bill_not_votes.png" height="400px" />

### Users are able to vote on bills and nominations, and are given an easy to read pie chart showing how often they agree or disagree with their elected reps.

<img src="./src/images/screenshots/fake_profile_disagree_agree.png" height="400px" />

### Users can also view the items that are voted on each day in either chamber of Congress

<img src="./src/images/screenshots/floor_items_house.png" height="400px" />

## Technology
This project was bootstrapped using [Create React App](https://github.com/facebookincubator/create-react-app) and uses [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/) and [Firebase](http://firebase.google.com/).

There is a separate [Node](https://nodejs.org) server used to communicate with external API's.

## Resources
This app gets data on congressional items from [Propublica](www.propublica.org). <br />
Data on congressional districts and representatives comes from [Google Civic API](https://developers.google.com/civic-information/) as well as [Geocodio](geocod.io).