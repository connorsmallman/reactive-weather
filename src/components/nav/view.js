import React from 'react';
import { IndexLink } from 'react-router';

const ACTIVE = { color: 'red' }

export default class extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return <nav> {_.map(this.props.week, (day, i) => {
      return <IndexLink activeStyle={ACTIVE} key={i} to={`${day.name}`}>{day.name}</IndexLink>;
    })} </nav>
  }
}