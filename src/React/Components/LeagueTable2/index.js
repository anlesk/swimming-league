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
    width: '8%',
    getValue: ({ rating, ratingInAgeGroup }) => `${rating}/${ratingInAgeGroup}`,
    hideIfExpanded: true,
  },
  name: {
    width: '20%',
    getValue: ({ student: { name } = {} }) => name,
    hideIfExpanded: true,
  },
  city: {
    width: '19%',
    getValue: ({ city }) => city,
    hideIfExpanded: true,
  },
  sex: {
    width: '5%',
    getValue: ({ sex }) => sex,
  },
  ageGroup: {
    width: '16%',
    getValue: ({ ageGroup }) => ageGroup,
  },
  result: {
    width: '10%',
    getValue: ({ totalTime }) => moment(totalTime).format('HH:mm:ss'),
  },
  eventDate: {
    width: '10%',
    getValue: ({ controlLesson: { date } = {} }) => date,
  },
  sub20: {
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
      sortBy: 'position',
      sortDirection: SortDirection.ASC,
    }
  }

  getData = () => {
    const { sortBy, sortDirection } = this.state;
    this.props.getData({ sortBy, sortDirection });
  }

  renderDataRow = (node, idx) => {
    const { expanded } = this.state;
    const { statistics = {} } = this.props;
    const statisticsRow = get(statistics, `${node.phone}.items`, []);
    const statisticsStatus = get(statistics, `${node.phone}.status`);
    const isRowExpanded = expanded === idx;

    const basicRow = (
      <ListGroupItem
        key={node.phone}
        onMouseOver={() => this.hoverRow(idx)}
        onClick={() => this.expandRow(node, idx)}
        className={classnames('data-row', isRowExpanded && 'expanded-data-row')}
      >
        {Object.keys(cols).map((id) => {
          const { width, getValue } = cols[id];

          return (
            <Col
              key={id}
              style={{ width }}
            >
              {getValue(node)}
            </Col>
          )
        })}
      </ListGroupItem>
    );

    const getExpandedRows = () => statisticsRow.map(data => {

      return (
        <ListGroupItem
          key={`${data.eventDate}_${data.result}`}
          className='expanded-data-row'
        >
          {Object.keys(cols).map((id) => {
            const { width, getValue, hideIfExpanded } = cols[id];

            return (
              <Col
                key={id}
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
      <React.Fragment key={node.phone}>
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
    const { sortBy, sortDirection: oldSD } = this.state;
    const sortDirection = sortBy === id && oldSD === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    this.setState({ sortBy: id, sortDirection });
  }

  render() {
    const {
      leaderboard: {
        status: dataStatus,
        edges: dataItems = [],
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
            : dataItems.map(({ node }, idx) => this.renderDataRow(node, idx))
        }
      </ListGroup>
    );
  }
}

export default LeagueTable;
