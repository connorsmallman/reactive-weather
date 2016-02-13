import React from 'react';
import qwest from 'qwest';
import _ from 'lodash';
import moment from 'moment';
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

  componentWillMount() {
    this.getWeather();
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(position.coords);
      }, err => {
        console.log(err.code);
        reject();
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

        response.lastUpdated = moment().format('MMM Do, h:mm:ss a');

        console.log(response.lastUpdated);

        localStorage.setItem('weather', JSON.stringify(response));

        return response;
      });
    }).catch(() => {
      let weather = localStorage.getItem('weather');

      if (!weather) throw new Error('No offline cache');

      return JSON.parse(weather);
    }).then((weather) => {
      //always
      this.setState({ 
        city: weather.city.name, 
        country: weather.city.country, 
        week: weather.list,
        lastUpdated: weather.lastUpdated,
      }, () => {
        this.props.history.pushState(null, 'Today');
      });
    });
  }

  render() {
    return <section className='app'>
      <ReactInterval timeout={600000} enabled={true} callback={this.getWeather.bind(this)} /> 
      <header><h1>{this.state.city}</h1></header>
      <Flash flash={this.state.flash} />
      {this.props.children && React.cloneElement(this.props.children, {
        week: this.state.week,
      })}
      <footer>
        <Nav week={this.state.week} />
        <div className='last-updated'><small>Last updated: {this.state.lastUpdated}</small></div>
      </footer>
    </section>
  }
};