class Model {
	constructor() {
		this.stockData = {
			closePricesHistory: [],
			dates: [],
		};
	}

	async getHistoryData() {
		let history = await $.get("/history");
		for (let i in history) {
			this.stockData.closePricesHistory.push(history[i].close);
			this.stockData.dates.push(history[i].date);
		}
		return this.stockData;
	}
}

const model = new Model();
const chartIt = async function () {
	await model.getHistoryData();
	const ctx = document.getElementById("myChart").getContext("2d");
	const myChart = await new Chart(ctx, {
		type: "line",
		data: {
			labels: model.stockData.dates,
			datasets: [
				{
					label: "Stock Name",
					data: model.stockData.closePricesHistory,
					backgroundColor: "rgba(255, 99, 132, 0.2)",
					borderColor: "rgba(255, 99, 132, 1)",

					borderWidth: 1,
				},
			],
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: "Toam & Idan-Stock",
				fontSize: 20,
				fontFamily: "sans-serif",
			},
			legend: {
				display: true,
			},
			scales: {
				responsive: true,
				xAxes: [
					{
						gridLines: {},
						ticks: {
							// maxTicksLimit: 6,
							maxRotation: 0,
							minRotation: 0,
						},
					},
				],
				yAxes: [
					{
						ticks: {
							maxTicksLimit: 100,
							beginAtZero: true,
							autoSkip: true,
							maxRotation: 0,
							minRotation: 0,
						},
					},
				],
			},
		},
	});
};

chartIt();
