import React from 'react';
import Select from 'react-select';
import {
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Glyphicon,
  Button,
  Row,
} from 'react-bootstrap';
import 'react-select/dist/react-select.css';

import Status from '../../../Enums/Status';
import './styles/main.css'

const Filter = {
  NAME: 'name',
  SEX: 'sex',
  AGE_GROUP: 'ageGroup',
  CITY: 'city',
  SUB20: 'sub20',
}

class LeagueTableFilter extends React.Component {
  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.handleInputSubmit();
    }
  };

  handleInputSubmit = () => {
    this.selectFilter(Filter.NAME, this.input.value);
  };

  selectFilter = (filter, value) => this.props.onChangeFilter(filter, value)

  render() {
    const {
      filters = {},
      selectedFilters = {},
      onClearFilters,
    } = this.props;


    return (
      <React.Fragment>
        <Row style={{ textAlign: 'right' }}>
          <Button
            className={'clearFiltersButton'}
            onClick={onClearFilters}
          >
            <span style={{ color: 'red' }}>x</span> Сбросить фильтры
          </Button>
        </Row>
        <Row>
          <Form inline>
            <FormGroup style={{ marginLeft: 20 }}>
              <InputGroup>
                <FormControl
                  onKeyDown={this.handleKeyDown}
                  name={Filter.NAME}
                  type='text'
                  defaultValue={selectedFilters[Filter.NAME]}
                  inputRef={(ref) => {this.input = ref}}
                  placeholder='Введите имя'
                />
                <InputGroup.Button>
                  <Button
                    onClick={this.handleInputSubmit}
                  >
                    <Glyphicon glyph="search" />
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>

            <FormGroup style={{ marginLeft: 20 }}>
              <Select
                name={Filter.CITY}
                value={selectedFilters[Filter.CITY]}
                placeholder={'Город'}
                onChange={(val) => this.selectFilter(Filter.CITY, val)}
                options={filters[Filter.CITY]}
                style={{ minWidth: 160 }}
                menuStyle={{ minWidth: 160 }}
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: 20 }}>
              <Select
                name={Filter.SEX}
                placeholder='Пол'
                value={selectedFilters[Filter.SEX]}
                onChange={(val) => this.selectFilter(Filter.SEX, val)}
                options={filters[Filter.SEX]}
                style={{ width: 100 }}
                menuStyle={{ minWidth: 100 }}
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: 20 }}>
              <Select
                name={Filter.AGE_GROUP}
                placeholder={'Возрастная группа'}
                value={selectedFilters[Filter.AGE_GROUP]}
                onChange={(val) => this.selectFilter(Filter.AGE_GROUP, val)}
                options={filters[Filter.AGE_GROUP]}
                style={{ width: 160, height: 34 }}
                menuStyle={{ minWidth: 160 }}
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: 20 }}>
              <Button
                bsStyle={selectedFilters[Filter.SUB20] === true ? "info" : 'default'}
                onClick={() => this.selectFilter(Filter.CITY, !selectedFilters[Filter.SUB20])}
              >
                SUB20
              </Button>
            </FormGroup>
          </Form>
        </Row>
      </React.Fragment>
    )
  }
}

export default LeagueTableFilter;
