import React from 'react';
import { AutoSizer, Table, Column, SortDirection, SortIndicator } from 'react-virtualized';
import 'react-virtualized/styles.css';

import locales from './locales';
import './styles/main.css';

class LeagueTable extends React.Component {
  constructor(props) {
    super(props);

    const sortBy = 'sex';
    const sortDirection = SortDirection.ASC;
    const sortedList = props.data;

    this.state = {
      disableHeader: false,
      headerHeight: 30,
      height: 270,
      hideIndexRow: false,
      overscanRowCount: 10,
      rowHeight: 40,
      rowCount: 1000,
      scrollToIndex: undefined,
      sortBy,
      sortDirection,
      sortedList,
      useDynamicRowHeight: false,
      hoveredRowId: null,
      expanded: {},
    };
  }

  _getDatum = (list, index) => {
    return list[(index % list.length)];
  }

  _getRowHeight = ({index}) => {
    const {data: list} = this.props;

    return this._getDatum(list, index).size;
  }

  _headerRenderer = ({dataKey, sortBy, sortDirection}) => {
    console.log(dataKey, sortBy);

    return (
      <div>
        Full Name
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
      </div>
    );
  }

  _isSortEnabled = () => {
    const {data: list} = this.props;
    const {rowCount} = this.state;

    // return rowCount <= list.size;
    return true;
  }

  _noRowsRenderer = () => {
    return <div className={'noRows'}>No rows</div>;
  }

  _onRowCountChange = (event) => {
    const rowCount = parseInt(event.target.value, 10) || 0;

    this.setState({rowCount});
  }

  _onScrollToRowChange = (event) => {
    const {rowCount} = this.state;
    let scrollToIndex = Math.min(
      rowCount - 1,
      parseInt(event.target.value, 10),
    );

    if (isNaN(scrollToIndex)) {
      scrollToIndex = undefined;
    }

    this.setState({scrollToIndex});
  };

  _rowClassName = ({index}) => {
    if (index < 0) {
      return 'headerRow';
    } else {
      return index === this.state.hoveredRowId ? 'oddRow' : 'evenRow';
    }
  };

  _sort = ({sortBy, sortDirection}) => {
    // const sortedList = this._sortList({sortBy, sortDirection});
    //
    // this.setState({sortBy, sortDirection, sortedList});
  }

  _sortList = ({sortBy, sortDirection}) => {
    const {data: list} = this.props;

    // return list
    //   .sortBy(item => item[sortBy])
    //   .update(
    //     list => (sortDirection === SortDirection.DESC ? list.reverse() : list),
    //   );
  };

  _updateUseDynamicRowHeight = (value) => {
    this.setState({
      useDynamicRowHeight: value,
    });
  };

  _handleRowMouseOver = ({ event, index, rowData }) => {
    this.setState({
      hoveredRowId: index,
    });
  }

  _handleRowClick = () => alert('show detailed stats')

  render() {
    const {
      data,
    } = this.props;

    const {
      disableHeader,
      headerHeight,
      height,
      hideIndexRow,
      overscanRowCount,
      rowHeight,
      rowCount,
      scrollToIndex,
      sortBy,
      sortDirection,
      useDynamicRowHeight,
      expanded,
    } = this.state;

    const rowGetter = ({index}) => this._getDatum(data, index);
    const columns = [
      { id: 'position', flexGrow: 1 },
      { id: 'name', flexGrow: 2 },
      { id: 'city', flexGrow: 2 },
      { id: 'sex', flexGrow: 2 },
      { id: 'ageGroup', flexGrow: 2 },
      { id: 'result', flexGrow: 2 },
      { id: 'eventDate', flexGrow: 2 },
    ];

    return (
      <div className={'league-table'}>
        <AutoSizer>
          {({ width }) => (
            <Table
              disableHeader={disableHeader}
              headerClassName={'headerColumn'}
              headerHeight={headerHeight}
              height={height}
              autoHeight
              noRowsRenderer={this._noRowsRenderer}
              overscanRowCount={overscanRowCount}
              rowClassName={this._rowClassName}
              rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
              rowGetter={rowGetter}
              rowCount={rowCount}
              scrollToIndex={scrollToIndex}
              sort={this._sort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              width={width}
              expanded={expanded}

              onRowClick={this._handleRowClick}
              onRowMouseOver={this._handleRowMouseOver}
            >
              {columns.map(({ id, flexGrow = 1 }) => (
                <Column
                  dataKey={id}
                  className={'exampleColumn'}
                  label={locales[id]}
                  cellRenderer={({cellData}) => cellData}
                  width={50}
                  flexGrow={flexGrow}
                />
              ))}
            </Table>
          )}
        </AutoSizer>
      </div>
    )
  }
}

export default LeagueTable;
