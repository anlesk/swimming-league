import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Col,
} from 'react-bootstrap';
import SortAscIcon from 'react-icons/lib/md/arrow-drop-up';
import SortDescIcon from 'react-icons/lib/md/arrow-drop-down';
import classnames from 'classnames';
import { get } from 'lodash';
import { PulseLoader } from 'react-spinners';

import Status from '../../../Enums/Status';
import SortDirection from '../../../Enums/SortDirection';
import locales from '../LeagueTable/locales';
import './styles/style.css';

const cols = {
  position: {
    width: '8%',
  },
  name: {
    width: '20%',
  },
  city: {
    width: '19%',
  },
  sex: {
    width: '5%',
  },
  ageGroup: {
    width: '16%',
  },
  result: {
    width: '10%',
  },
  eventDate: {
    width: '10%',
  },
  sub20: {
    width: '7%',
  },
}

const loadingElement = (
  <div className='loading-row'>
    <PulseLoader
      color={'#46b8da'}
      loading
    />
  </div>
);

class LeagueTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredRowId: null,
      sortBy: 'position',
      sortDirection: SortDirection.ASC,
    }
  }

  getData = () => {
    const { sortBy, sortDirection } = this.state;
    this.props.getData({ sortBy, sortDirection });
  }

  renderDataRow = (rowData, idx) => {
    const { expanded } = this.state;
    const { statistics = {} } = this.props;
    const statisticsRow = get(statistics, `${rowData.phone}.items`, []);
    const statisticsStatus = get(statistics, `${rowData.phone}.status`);
    const isRowExpanded = expanded === idx;
    const basicRow = (
      <ListGroupItem
        key={rowData.phone}
        onMouseOver={() => this.hoverRow(idx)}
        onClick={() => this.expandRow(rowData, idx)}
        className={classnames('data-row', isRowExpanded && 'expanded-data-row')}
      >
        {Object.keys(cols).map((id) => {
          const { width } = cols[id];

          return (
            <Col
              key={id}
              style={{ width }}
            >
              {rowData[id]}
            </Col>
          )
        })}
      </ListGroupItem>
    );

    const getExpandedRows = () => statisticsRow.map(data => {
      const { position, name, city, ...shortenData } = data;

      return (
        <ListGroupItem
          key={`${data.eventDate}_${data.result}`}
          className='expanded-data-row'
        >
          {Object.keys(cols).map((id) => {
            const { width } = cols[id];

            return (
              <Col
                key={id}
                style={{ width }}
              >
                {shortenData[id]}
              </Col>
            )
          })}
        </ListGroupItem>
      );
    });

    return (
      <React.Fragment key={rowData.phone}>
        {basicRow}
        {
          statisticsStatus === Status.LOADING
            ? loadingElement
            : isRowExpanded && getExpandedRows()
        }
      </React.Fragment>
    )
  }

  renderHeaderCol = id => {
    const { sortBy, sortDirection } = this.state;
    const SortDirectionIcon = sortDirection === SortDirection.DESC ? SortDescIcon : SortAscIcon;

    return (
    <React.Fragment key={id}>
      <span>{locales[id]}</span>
      {id === sortBy && <SortDirectionIcon />}
    </React.Fragment>
  )}

  renderHeader = () => {
    return (
      <ListGroupItem
        className='header-row'
      >
        {Object.keys(cols).map((id) => {
          const { width } = cols[id];

          return (
            <Col
              key={id}
              style={{ width }}
              onClick={() => this.sort(id)}
            >
              {this.renderHeaderCol(id)}
            </Col>
          )
        })}
      </ListGroupItem>
    )
  }

  expandRow = (rowData, idx) => {
    const { expanded: currentlyExpanded } = this.state;
    this.setState({ expanded: currentlyExpanded === idx ? null : idx });
    this.props.onStatisticsRequest(rowData.phone);
  }

  hoverRow = idx => {
    const { hovered } = this.state;

    if (hovered === idx) return;

    this.setState({ hovered: idx });
  }

  sort = id => {
    const { sortBy, sortDirection: oldSD } = this.state;
    const sortDirection = sortBy === id && oldSD === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    this.setState({ sortBy: id, sortDirection });
  }

  render() {
    const {
      leaderboard: {
        status: dataStatus,
        items: dataItems = [],
      },
    } = this.props;

    console.log(this.props);

    return (
      <ListGroup>
        {this.renderHeader()}
        <hr style={{ margin: '1px 0px 1px 0px' }} />
        {
          dataStatus === Status.LOADING
            ? loadingElement
            : dataItems.map((rowData, idx) => this.renderDataRow(rowData, idx))
        }
      </ListGroup>
    );
  }
}

export default LeagueTable;
