import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import LeagueTable from '../../Components/LeagueTable2';
import LeagueTableFilter from '../../Components/LeagueTableFilter';
import Status from '../../../Enums/Status';

import {
  loadLeaderboardSagaAC,
  getLeaderboard,
} from '../../../Redux/Ducks/Leaderboard';
import {
  getFiltersAll,
  getSelectedFilters,
  selectFilterAC,
  clearFiltersAC,
  getFiltersStatus,
} from '../../../Redux/Ducks/Filters';
import {
  getStatistics,
  loadStatisticsAC,
} from '../../../Redux/Ducks/Statistics';

import { run, runFetch } from '../../../Services/GraphQLService'


class LeagueContainer extends React.Component {
  componentDidMount() {
    this.props.loadLeaderboardSagaAC();
    // run();
    runFetch();
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
      filtersStatus,
    } = this.props;

    const isFiltersDisabled = filtersStatus === Status.LOADING;

    return (
      <Grid>
        <Row>
          <h1 style={{ color: '#46b8da' }}>SWIMMING</h1>
          <h1><b>League</b> 1 km</h1>
        </Row>

        <hr/>

        <Row>
          <LeagueTableFilter
            filters={filters}
            selectedFilters={selectedFilters}
            onChangeFilter={this.handleChangeFilter}
            onClearFilters={this.props.clearFiltersAC}
            disabled={isFiltersDisabled}
          />
        </Row>

        <br/>

        <Row>
          <LeagueTable
            leaderboard={leaderboard}
            statistics={statistics}
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
  filtersStatus: getFiltersStatus(state),
}), {
  loadLeaderboardSagaAC,
  loadStatisticsAC,
  selectFilterAC,
  clearFiltersAC
})(LeagueContainer);
