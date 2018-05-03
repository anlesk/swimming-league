import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div>
        {`This is ${this.constructor.name}`}
      </div>
    )
  }
}

export default Footer;