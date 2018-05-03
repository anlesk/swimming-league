import React from 'react';
import { Grid, Row } from 'react-bootstrap';

import LeagueTable from '../../Components/LeagueTable2';
import LeagueTableFilter from '../../Components/LeagueTableFilter';
import Status from '../../Utils/Status';

const loadData = async ({ sortBy, sortDirection, size, offset } = {}) => await ([
  { position: 1, name: '123', sex: 333, phone: 12345 },
  { position: 2, name: 321, sex: 542, phone: 12346 },
  { position: 3, name: 321, sex: 4321, phone: 12347 },
])

const loadGroupedData = async id => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { position: 4, name: 'Ivanov', sex: 'M', phone: 12346, result: 1000, eventDate: 10 },
    { position: 4, name: 'Ivanov', sex: 'M', phone: 12346, result: 1111, eventDate: 11 },
    { position: 4, name: 'Ivanov', sex: 'M', phone: 12346, result: 1234, eventDate: 12 },
  ]
};

class LeagueContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      groupedData: {},
    }
  }

  componentDidMount() {
   this.updateData();
  }

  updateData = params => loadData(params)
    .then(result => this.setState({ data: { items: result, status: Status.SUCCESS } }));

  getGroupedData = id => {
    const { groupedData } = this.state;
    const newGroupedData = { ...groupedData, [id]: { items: [], status: Status.LOADING } }
    this.setState({ groupedData: newGroupedData });

    loadGroupedData(id)
      .then(result => this.setState({ groupedData: { ...groupedData, [id]: { items: result, status: Status.SUCCESS } } }))
  }

  getData = (params) => {
    this.setState();
    this.updateData(params)
  }

  render() {
    const {
      groupedData,
      data,
    } = this.state;

    return (
      <Grid>
        <Row>
          <h1 style={{ color: '#46b8da' }}>SWIMMING</h1>
          <h1><b>League</b> 1 km</h1>
        </Row>

        <hr/>

        <Row>
          <LeagueTableFilter />
        </Row>

        <br/>

        <Row>
          <LeagueTable
            data={data}
            groupedData={groupedData}
            getGroupedData={this.getGroupedData}
            getData={this.getData}
          />
        </Row>
      </Grid>
    );
  }
}

export default LeagueContainer;
