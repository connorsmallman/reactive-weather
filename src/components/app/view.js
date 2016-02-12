import React from 'react';
import qwest from 'qwest';
import _ from 'lodash';
import getDayName from '../../helpers/dayName';
import Nav from '../nav/view';
import Flash from '../flash/view';
import ReactInterval from 'react-interval';

let apiKey = 'c1d1917fdef73bdc3e62cab32be1dc30';

export default class extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = { week: null, city: null, country: null };
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

      return qwest.get(url, null, {cache: true}).then((xhr, response) => {
        response.list.map(day => {
          day.name = getDayName(day.dt);
          return day;
        });

        response.date = new Date();

        localStorage.setItem('weather', JSON.stringify(response));

        return response;
      });
    }).catch((e, xhr, response) => {
      //if failed check for cache
      let weather = localStorage.getItem('weather');

      if (!weather) throw new Error('Offline and no cache');
      
      return JSON.stringify(weather);
    }).then((weather) => {
      //always
      this.setState({ 
        city: weather.city.name, 
        country: weather.city.country, 
        week: weather.list,
      }, () => {
        this.props.history.pushState(null, 'Today');
      });
    });
  }

  render() {
    return <section>
      <ReactInterval timeout={10000} enabled={true} callback={this.getWeather.bind(this)} /> 
      <header>{this.state.city}</header>
      <Flash flash={this.state.flash} />
      {this.props.children && React.cloneElement(this.props.children, {
        week: this.state.week,
      })}
      <footer>
        <Nav week={this.state.week} />
      </footer>
    </section>
  }
};