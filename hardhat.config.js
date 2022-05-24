/** @format */

require('@nomiclabs/hardhat-waffle');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: '0.8.6',
	defaultNetwork: 'kovan',
	networks: {
		hardhat: {},
		kovan: {
			url: 'https://speedy-nodes-nyc.moralis.io/6c731eae87f0af4c9eed8dc6/eth/kovan',
			accounts: ['608f631c4452b283b437fb2f65f242ea74bd09f8ab5ac138c66bd66aa15eab07'],
			gasPrice: 85000000000000000,
		},
	},
	mocha: {
		timeout: 4 * 60 * 1000,
	},
	etherscan: {
		// Your API key for Etherscan
		// Obtain one at https://etherscan.io/
		apiKey: 'etherscan apikey',
	},
};
