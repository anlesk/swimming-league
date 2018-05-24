import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import LeagueTable from '../../Components/LeagueTable';
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
  showStatisticsAC,
  hideStatisticsAC,
} from '../../../Redux/Ducks/Statistics';
import {
  getSortBy,
  getSortDirection,
  changeSortByAC,
} from '../../../Redux/Ducks/Sort';
import './styles/main.css';

class LeagueContainer extends React.Component {
  componentDidMount() {
    this.props.loadLeaderboardSagaAC();
  }

  handleChangeFilter = (filter, value) => {
    this.props.selectFilterAC(filter, value);
    this.props.loadLeaderboardSagaAC();
    this.props.hideStatisticsAC();
  }

  handleChangeSort = (sortBy) => {
    this.props.changeSortByAC(sortBy);
    this.props.loadLeaderboardSagaAC();
    this.props.hideStatisticsAC();
  }

  handleShowMore = () => this.props.loadLeaderboardSagaAC(true);

  handleStatisticsRequest = (personId, rowId) => {
    const { statistics: { statisticsShownForId } } = this.props;
    if (statisticsShownForId === rowId) {
      this.props.hideStatisticsAC();
    } else {
      this.props.showStatisticsAC(rowId);
      this.props.loadStatisticsAC(personId);
    }
  }

  handleClearFilters = () => {
    this.clearNameFilter();
    this.props.clearFiltersAC();
    this.props.loadLeaderboardSagaAC();
    this.props.hideStatisticsAC();
  }

  clearNameFilter = () => {
    //TODO: Dirty hack, think of how to clear input value without changing the component API
    this.leagueTableFilter.input.value = '';
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
    const statisticsShownForId = statistics.statisticsShownForId;

    return (
      <Grid>
        <Row>
          <h1 className={'swimming-header'}>SWIMMING</h1>
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
            statisticsShownForId={statisticsShownForId}
            onStatisticsRequest={this.handleStatisticsRequest}
            onShowMore={this.handleShowMore}
            onSortChange={this.handleChangeSort}
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
  showStatisticsAC,
  hideStatisticsAC,
  selectFilterAC,
  clearFiltersAC,
  changeSortByAC,
})(LeagueContainer);
