const cryptoParser = require("../parsers/cryptoDataParser");

const getCryptoData = async () => {
	try {
		const res = await fetch(
			`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max`
		);
		json = await res.json();
		return await cryptoParser(json);
	} catch (error) {
		console.error(error);
	}
};

module.exports = getCryptoData;