import React from 'react';
import qwest from 'qwest';
import _ from "lodash";
import getDayName from '../../helpers/dayName';
import Nav from '../nav/view';

let apiKey = 'c1d1917fdef73bdc3e62cab32be1dc30';

export default class extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = { week: null, city: null, country: null };
  }

  componentWillMount() {
    this.getWeather();
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position.coords);
      });
    });
  }

  getWeather() {
    this.getLocation().then(location => {
      let url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${location.latitude}&lon=${location.longitude}&cnt=5&mode=json&appid=${apiKey}&units=metric`;
      
      qwest.get(url, null, {cache: true}).then((xhr, response) => {
        let week = response.list.map(day => {
          day.name = getDayName(day.dt);
          return day;
        });

        this.setState({ 
          city: response.city.name, 
          country: response.country, 
          week,
        }, () => {
          this.props.history.pushState(null, 'Today');
        });
      });
    });
  }

  render() {
    return <section>
      <header>{this.state.city}</header>
      {this.props.children && React.cloneElement(this.props.children, {
        week: this.state.week,
      })}
      <footer>
        <Nav week={this.state.week} />
      </footer>
    </section>
  }
};