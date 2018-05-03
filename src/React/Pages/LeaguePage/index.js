import React from 'react';

import LeagueContainer from '../../Containers/LeagueContainer';
import Header from '../../Components/Header';

class LaguePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <LeagueContainer />
      </React.Fragment>
    )
  }
}

export default LaguePage;
