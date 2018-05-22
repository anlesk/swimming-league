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
import moment from 'moment';

import Status from '../../../Enums/Status';
import SortDirection from '../../../Enums/SortDirection';
import locales from '../LeagueTable/locales';
import './styles/style.css';

const cols = {
  position: {
    id: 'rating',
    width: '8%',
    getValue: ({ rating, ratingInAgeGroup }) => `${rating}/${ratingInAgeGroup}`,
    hideIfExpanded: true,
    sortable: true,
  },
  name: {
    id: 'name',
    width: '20%',
    getValue: ({ student: { name } = {} }) => name,
    hideIfExpanded: true,
    sortable: true,
  },
  city: {
    id: 'city',
    width: '19%',
    getValue: ({ city }) => city,
    hideIfExpanded: true,
    sortable: true,
  },
  sex: {
    id: 'sex',
    width: '5%',
    getValue: ({ sex }) => sex,
    sortable: true,
  },
  ageGroup: {
    id: 'ageGroup',
    width: '16%',
    getValue: ({ ageGroup }) => ageGroup,
    sortable: true,
  },
  result: {
    id: 'totalTime',
    width: '10%',
    getValue: ({ totalTime }) => moment(totalTime).format('HH:mm:ss'),
    sortable: true,
  },
  eventDate: {
    id: 'date',
    width: '10%',
    getValue: ({ controlLesson: { date } = {} }) => date,
    sortable: true,
  },
  sub20: {
    id: 'sub20',
    width: '7%',
    getValue: ({ totalTime }) => totalTime < 20 * 60 * 60,
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
    }
  }

  renderDataRow = (node, idx) => {
    const { expanded } = this.state;
    const { statistics = {} } = this.props;
    const { phone, rating } = node;
    const statisticsRow = get(statistics, `${node.phone}.items`, []);
    const statisticsStatus = get(statistics, `${node.phone}.status`);
    const isRowExpanded = expanded === idx;
    const key = phone || rating;

    const basicRow = (
      <ListGroupItem
        onMouseOver={() => this.hoverRow(idx)}
        onClick={() => this.expandRow(node, idx)}
        className={classnames('data-row', isRowExpanded && 'expanded-data-row')}
      >
        {Object.keys(cols).map((colName) => {
          const { width, getValue } = cols[colName];

          return (
            <Col
              key={colName}
              style={{ width }}
            >
              {getValue(node)}
            </Col>
          )
        })}
      </ListGroupItem>
    );

    const getExpandedRows = () => statisticsRow.map(data => {
      const {
        controlLesson: { date } = {},
        totalTime,
      } = data;

      return (
        <ListGroupItem
          key={`${date}_${totalTime}`}
          className='expanded-data-row'
        >
          {Object.keys(cols).map((colName) => {
            const { width, getValue, hideIfExpanded } = cols[colName];

            return (
              <Col
                key={colName}
                style={{ width }}
              >
                {!hideIfExpanded && getValue(data)}
              </Col>
            )
          })}
        </ListGroupItem>
      );
    });

    return (
      <React.Fragment key={key}>
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
    const { sortBy, sortDirection } = this.props;
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
        {Object.keys(cols).map((colName) => {
          const { width, id, sortable } = cols[colName];

          return (
            <Col
              key={colName}
              style={{ width }}
              onClick={sortable && (() => this.sort(id))}
            >
              {this.renderHeaderCol(colName)}
            </Col>
          )
        })}
      </ListGroupItem>
    )
  }

  expandRow = (node, idx) => {
    const { expanded: currentlyExpanded } = this.state;
    this.setState({ expanded: currentlyExpanded === idx ? null : idx });
    this.props.onStatisticsRequest(node.phone);
  }

  hoverRow = idx => {
    const { hovered } = this.state;

    if (hovered === idx) return;

    this.setState({ hovered: idx });
  }

  sort = id => {
    this.props.onSortChange(id);
  }

  render() {
    const {
      leaderboard: {
        status: dataStatus,
        edges: dataItems = [],
      },
    } = this.props;

    return (
      <ListGroup>
        {this.renderHeader()}
        <hr style={{ margin: '1px 0px 1px 0px' }} />
        {
          dataStatus === Status.LOADING
            ? loadingElement
            : dataItems.map(({ node }, idx) => this.renderDataRow(node, idx))
        }
      </ListGroup>
    );
  }
}

export default LeagueTable;
