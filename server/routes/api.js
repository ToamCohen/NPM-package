const express = require("express");
const router = express.Router();
const yahooFinance = require("yahoo-finance");

router.get("/history", async function (req, res) {
	try {
		await yahooFinance.historical(
			{
				symbol: "AAPL",
				from: "2012-01-01",
				to: "2012-04-10",
				// period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
			},
			function (err, response) {
			const releventData = response.map(r => {return{date:r.date, close:r.close}})
				res.status(200).json(releventData)
				
			}
		);
	} catch (err) {
		res.status(404).json(err);
	}
});

module.exports = router;
