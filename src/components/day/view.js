import React from 'react';
import icons from '../../helpers/icons';
import Skycons from '../skycons/view';

export default class extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		let day = this.props.week.filter(day => {
			return day.name === this.props.params.day;
		})[0];
		
		let name = day.name;
		let timestamp = day.dt;
    let temperature = day.temp.max;
    let description = day.weather[0].description;
    let main = day.weather[0].main;
    let icon = day.weather[0].icon;
    let humidity = day.humidity;
    let pressure = day.pressure;
    let wind = day.speed;

    return <article>
    	<header>
    		<hgroup>
    			<h1>{name}</h1>
    			<h2>{main}</h2>
    		</hgroup>
    	</header>
    	<section className='summary'>
    		<Skycons color='black' icon={icons[icon]()} />
    		<div>{temperature}&deg;C</div>
    		<div>{description}</div>
    	</section>
    	<footer>
    		<div>
    			<p><strong>Humidity: </strong>{humidity}</p>
    		</div>
    		<div>
    			<p><strong>Pressure: </strong>{pressure}</p>
    		</div>
    		<div>
    			<p><strong>Wind: </strong>{wind}</p>
    		</div>
    	</footer>
    </article>
	}
}