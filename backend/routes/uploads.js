const router = require("express").Router();
const multer = require("multer");
const uploadController = require("../controllers/UploadController");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + "/../uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, "data");
	},
});

const uploads = multer({ storage: storage });

router.post("/json", uploads.single("file"), async (req, res) => {
	try {
		result = await uploadController.JSONupload();
		res.status(200).send({
			stock: {
				stockName: result.stock.stockName,
				prices: result.stock,
			},
			crypto: {
				cryptoName: result.crypto.cryptoName,
				prices: result.crypto,
			},
			startDate: result.crypto.prices[0][0],
			endDate: result.crypto.prices[result.crypto.prices.length - 1][0],
			cryptoRate: generalController.calculateReturnRate(
				result.crypto.prices[0][1],
				result.crypto.prices[result.crypto.prices.length - 1][1]
			),
			stockRate: generalController.calculateReturnRate(
				result.stock.prices[0][1],
				result.stock.prices[result.stock.prices.length - 1][1]
			),

			message: "File received succesfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal server error" });
	}
});

router.post("/xml", uploads.single("file"), async (req, res) => {
	try {
		result = await uploadController.XMLupload();
		res.status(200).send({
			stock: {
				stockName: result.stock.stockName,
				prices: result.stock,
			},
			crypto: {
				cryptoName: result.crypto.cryptoName,
				prices: result.crypto,
			},
			startDate: result.crypto.prices[0][0],
			endDate: result.crypto.prices[result.crypto.prices.length - 1][0],
			cryptoRate: generalController.calculateReturnRate(
				result.crypto.prices[0][1],
				result.crypto.prices[result.crypto.prices.length - 1][1]
			),
			stockRate: generalController.calculateReturnRate(
				result.stock.prices[0][1],
				result.stock.prices[result.stock.prices.length - 1][1]
			),
			message: "File received succesfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal server error" });
	}
});

module.exports = router;
