// About.js
import React from 'react';
import ExampleChart from '../charts/ExampleChart';
import ETHChart from '../charts/ETHChart';

function About() {
	return (
  		<section>
			<h2>About Page</h2>
			<div className="w-1/3 "><ETHChart /></div>
			<div className="w-1/3 "><ExampleChart /></div>
		</section>
	);
}

export default About;