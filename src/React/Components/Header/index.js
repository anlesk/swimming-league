import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Navbar inverse staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a
              href="http://ilovesupersport.com/"
              target='_blank'
              rel='noreferrer noopener'
              style={{ paddingTop: 8 }}
            >
              <img
                width={130}
                height={30}
                src='https://static.tildacdn.com/tild6466-3765-4330-a262-393037346437/Main_Logo.png'
                alt='I LOVE SUPERSPORT'
              />
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem href="tel:+74951501510">
              +7 495 150-15-10
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header;
