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

import './styles/main.css'
import Filter from '../../../Enums/Filter';

class LeagueTableFilter extends React.Component {
  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.handleInputSubmit();
    }
  };

  handleInputSubmit = () => {
    this.selectFilter(Filter.NAME, this.input.value);
  };

  selectFilter = (filter, value) => this.props.onChangeFilter(filter, value);

  render() {
    const {
      filters = {},
      selectedFilters = {},
      onClearFilters,
      disabled,
    } = this.props;


    return (
      <React.Fragment>
        <Row style={{ textAlign: 'right' }}>
          <Button
            className={'clearFiltersButton'}
            onClick={onClearFilters}
            disabled={disabled}
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
                  inputRef={(ref) => {this.input = ref}}
                  placeholder='Введите имя'
                  disabled={disabled}
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
                noResultsText={'Нет данных'}
                labelKey={'name'}
                valueKey={'id'}
                clearable={false}
                onChange={(val) => this.selectFilter(Filter.CITY, val)}
                options={filters[Filter.CITY]}
                style={{ minWidth: 160 }}
                menuStyle={{ minWidth: 160 }}
                disabled={disabled}
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: 20 }}>
              <Select
                name={Filter.SEX}
                placeholder='Пол'
                labelKey={'name'}
                valueKey={'id'}
                noResultsText={'Нет данных'}
                clearable={false}
                value={selectedFilters[Filter.SEX]}
                onChange={(val) => this.selectFilter(Filter.SEX, val)}
                options={filters[Filter.SEX]}
                style={{ width: 100 }}
                menuStyle={{ minWidth: 100 }}
                disabled={disabled}
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: 20 }}>
              <Select
                name={Filter.AGE_GROUP}
                placeholder={'Возрастная группа'}
                labelKey={'name'}
                valueKey={'id'}
                noResultsText={'Нет данных'}
                clearable={false}
                value={selectedFilters[Filter.AGE_GROUP]}
                onChange={(val) => this.selectFilter(Filter.AGE_GROUP, val)}
                options={filters[Filter.AGE_GROUP]}
                style={{ width: 160, height: 34 }}
                menuStyle={{ minWidth: 160 }}
                disabled={disabled}
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: 20 }}>
              <Button
                bsStyle={selectedFilters[Filter.SUB20] === true ? "selected-sub20-button" : 'default'}
                onClick={() => this.selectFilter(Filter.SUB20, !selectedFilters[Filter.SUB20])}
                disabled={disabled}
              >
                SUB20
              </Button>
              <span
                className={'x-button'}
                onClick={() => this.selectFilter(Filter.SUB20, !selectedFilters[Filter.SUB20])}
              >
                x
              </span>
            </FormGroup>
          </Form>
        </Row>
      </React.Fragment>
    )
  }
}

export default LeagueTableFilter;
