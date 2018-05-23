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
import {
  getSortBy,
  getSortDirection,
  changeSortByAC,
} from '../../../Redux/Ducks/Sort';

class LeagueContainer extends React.Component {
  componentDidMount() {
    this.props.loadLeaderboardSagaAC();
  }

  handleChangeFilter = (filter, value) => {
    this.props.selectFilterAC(filter, value);
  }

  handleShowMore = () => {}

  handleStatisticsRequest = personId => this.props.loadStatisticsAC(personId);

  handleClearFilters = () => {
    //TODO: Dirty hack, think of how to clear input value without changing the component API
    this.leagueTableFilter.input.value = '';
    this.props.clearFiltersAC();
  }

  render() {
    const {
      leaderboard,
      statistics,
      filters,
      selectedFilters,
      filtersStatus,
      sortBy,
      sortDirection,
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
            ref={(el) => { this.leagueTableFilter = el; }}
            filters={filters}
            selectedFilters={selectedFilters}
            onChangeFilter={this.handleChangeFilter}
            onClearFilters={this.handleClearFilters}
            disabled={isFiltersDisabled}
          />
        </Row>

        <br/>

        <Row>
          <LeagueTable
            leaderboard={leaderboard}
            statistics={statistics}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onStatisticsRequest={this.handleStatisticsRequest}
            onShowMore={this.handleShowMore}
            onSortChange={this.props.changeSortByAC}
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
  sortBy: getSortBy(state),
  sortDirection: getSortDirection(state),
}), {
  loadLeaderboardSagaAC,
  loadStatisticsAC,
  selectFilterAC,
  clearFiltersAC,
  changeSortByAC,
})(LeagueContainer);
