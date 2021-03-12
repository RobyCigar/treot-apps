import { useState, useEffect } from 'react';
// Prepend `0` for one digit numbers. For that the number has to be
// converted to string, as numbers don't have length method
const padTime = (time) => {
	return String(time).length === 1 ? `0${time}` : `${time}`;
};

const format = (time) => {
	// Convert seconds into minutes and take the whole part
	const minutes = Math.floor(time / 60);

	// Get the seconds left after converting minutes
	const seconds = time % 60;

	//Return combined values as string in format mm:ss
	return `${minutes}:${padTime(seconds)}`;
};

export default function Timer({time, handleTimeout}) {
	const [counter, setCounter] = useState(60 * time);
	useEffect(() => {
		let timer;

		if (counter > 0) {
			timer = setTimeout(() => setCounter((c) => c - 1), 1000);
		}

		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, [counter]);

	if(counter === 0) {
		handleTimeout()
	}

	return (
		<div>
			{counter === 0 ? "Time over" : <div>Countdown: {format(counter)}</div>}
		</div>
	);
}
