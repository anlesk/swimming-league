import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import LeagueTable from '../../Components/LeagueTable2';
import LeagueTableFilter from '../../Components/LeagueTableFilter';

import {
  loadLeaderboardAC,
  getLeaderboard,
} from '../../../Redux/Ducks/Leaderboard';
import {
  getFiltersAll,
  getSelectedFilters,
  selectFilterAC,
} from '../../../Redux/Ducks/Filters';
import {
  getStatistics,
  loadStatisticsAC,
} from '../../../Redux/Ducks/Statistics';

const loadData = async ({ sortBy, sortDirection, size, offset } = {}) => await ([
  { position: 1, name: '123', sex: 333, phone: 12345 },
  { position: 2, name: 321, sex: 542, phone: 12346 },
  { position: 3, name: 321, sex: 4321, phone: 12347 },
]);

const loadGroupedData = async id => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { position: 4, name: 'Ivanov', sex: 'M', phone: 12346, result: 1000, eventDate: 10 },
    { position: 4, name: 'Ivanov', sex: 'M', phone: 12346, result: 1111, eventDate: 11 },
    { position: 4, name: 'Ivanov', sex: 'M', phone: 12346, result: 1234, eventDate: 12 },
  ]
};

class LeagueContainer extends React.Component {
  componentDidMount() {
   this.props.loadLeaderboardAC();
  }

  handleChangeFilter = (filter, value) => {
    this.props.selectFilterAC(filter, value);
  }

  handleShowMore = () => {}

  handleStatisticsRequest = personId => this.props.loadStatisticsAC(personId);

  render() {
    const {
      leaderboard,
      statistics,
      filters,
      selectedFilters,
    } = this.props;

    return (
      <Grid>
        <Row>
          <h1 style={{ color: '#46b8da' }}>SWIMMING</h1>
          <h1><b>League</b> 1 km</h1>
        </Row>

        <hr/>

        <Row>
          <LeagueTableFilter
            filter={filters}
            selectedFilters={selectedFilters}
            onChangeFilter={this.handleChangeFilter}
          />
        </Row>

        <br/>

        <Row>
          <LeagueTable
            data={leaderboard}
            groupedData={statistics}
            onStatisticsRequest={this.handleStatisticsRequest}
            onShowMore={this.handleShowMore}
          />
        </Row>
      </Grid>
    );
  }
}

export default connect(state => ({
  leaderboard: getLeaderboard(state),
  statistics: getStatistics(state),
  filters: getFiltersAll(state),
  selectedFilters: getSelectedFilters(state),
}), {
  loadLeaderboardAC,
  loadStatisticsAC,
  selectFilterAC,
})(LeagueContainer);