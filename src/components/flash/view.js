import React from 'react';

export default class extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.flash) {
      return <div class="alert alert-{this.props.flash.type}">{this.props.flash.message}</div>;
    }
    return null;
  }
}