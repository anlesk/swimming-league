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

class LeagueTableFilter extends React.Component {
  state = {
    selectedOption: '',
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.clickHandlerAddon();
    }
  };

  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }

  clickHandlerAddon = () => {
    alert('clicked');
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <React.Fragment>
        <Row style={{ textAlign: 'right' }}>
          <Button
            className={'clearFiltersButton'}
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
                  name="nameFilter"
                  type="text"
                  onChange={this.handleInputChange}
                  placeholder={'Введите имя'}
                />
                <InputGroup.Button>
                  <Button>
                    <Glyphicon glyph="search" />
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>

            <FormGroup style={{ marginLeft: 20 }}>
              <Select
                name={'city-filter'}
                value={selectedOption}
                placeholder={'Город'}
                onChange={this.handleChange}
                options={[
                  { value: 'one', label: 'One' },
                  { value: 'two', label: 'TwoTwoTwoTwoTwo aasdada asd ' },
                ]}
                style={{ minWidth: 160 }}
                menuStyle={{ minWidth: 160 }}
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: 20 }}>
              <Select
                name={'sex-filter'}
                placeholder={'Пол'}
                value={selectedOption}
                onChange={this.handleChange}
                options={[
                  { value: 'one', label: 'One' },
                  { value: 'two', label: 'Two' },
                ]}
                style={{ width: 100 }}
                menuStyle={{ minWidth: 100 }}
              />
            </FormGroup>

            <FormGroup style={{ marginLeft: 20 }}>
              <Select
                name={'age-group-filter'}
                placeholder={'Возрастная группа'}
                value={selectedOption}
                onChange={this.handleChange}
                options={[
                  { value: 'one', label: 'One' },
                  { value: 'two', label: 'Two' },
                ]}
                style={{ width: 160, height: 34 }}
                menuStyle={{ minWidth: 160 }}
              />
            </FormGroup>

            {' '}

            <FormGroup style={{ marginLeft: 20 }}>
              <Button
                bsStyle="info"
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
