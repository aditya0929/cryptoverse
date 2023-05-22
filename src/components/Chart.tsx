import React from 'react';
import { Line } from 'react-chartjs-2';

import 'chart.js/auto';

function Chart(props: ChartProps) {
	const { timestamp, price } = props.history.reduce(
		(
			prev: { timestamp: number[]; price: string[] },
			current: HistoryTimestamp
		) => ({
			timestamp: [...prev.timestamp, current.timestamp],
			price: [...prev.price, current.price],
		}),
		{ timestamp: [], price: [] }
	);

	const data = {
		labels: timestamp,
		datasets: [
			{
				label: 'Price In USD',
				data: price,
				fill: false,
				backgroundColor: '#0071bd',
				borderColor: '#0071bd',
			},
		],
	};

	return <Line data={data} />;
}

export default Chart;
