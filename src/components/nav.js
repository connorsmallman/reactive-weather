import React from 'react';
import { IndexLink } from 'react-router';

const ACTIVE = { color: 'red' }

export default class extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
  	let navStyle = {
  		display: 'flex',
  		flexFlow: 'row nowrap',
  		justifyContent: 'space-around',
  	}

    return <nav style={navStyle}> {_.map(this.props.week, (day, i) => {
      return <IndexLink activeStyle={ACTIVE} key={i} to={`${day.name}`}>{day.name}</IndexLink>;
    })} </nav>
  }
}