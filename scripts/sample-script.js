/** @format */

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');
const fs = require('fs');
const path = require('path');

async function main() {
	let getBytes;
	let getBytes32;
	let getUint256;
	let contractAddress;
	let deployerAddress;

	const GetterSetter = await hre.ethers.getContractFactory('GetterSetter');
	const getterSetter = await GetterSetter.deploy();

	await getterSetter.deployed();
	contractAddress = getterSetter.address;
	let signers = await ethers.getSigners();
	deployerAddress = signers[0].address;

	console.log('GetterSetter contract deployed to :', contractAddress);
	console.log('Deployer address is :', deployerAddress);

	await getterSetter.setBytes('0x60');
	await getterSetter.setBytes32('0x6d6168616d000000000000000000000000000000000000000000000000000000');
	await getterSetter.setUint256(450);

	getBytes = await getterSetter.getBytes();
	getBytes32 = await getterSetter.getBytes32();
	getUint256 = await getterSetter.getUint256();

	console.log('getBytes value is :', getBytes);
	console.log('getBytes32 value is :', getBytes32);
	console.log('getUint256 value is :', getUint256);

	console.log('writing data to JSON file started');
	//write to JSON file
	let jsonObject = {
		'GetterSetter contract deployed to': contractAddress,
		'deployer address is': deployerAddress,
		'getBytes value is': getBytes,
		'getBytes32 value is': getBytes32,
		'getUint256 value is': getUint256,
	};
	fs.writeFileSync(path.resolve(__dirname, 'chainlink.json'), JSON.stringify(jsonObject));
	console.log('JSON file generated and its path is ', path.join(__dirname, 'chainlink.json'));
}

writeToJSON = (contractAddress, deployerAddress, getBytes, getBytes32, getUint256) => {
	let jsonObject = {
		'GetterSetter contract deployed to': contractAddress,
		'deployer address is': deployerAddress,
		'getBytes value is': getBytes,
		'getBytes32 value is': getBytes32,
		'getUint256 value is': getUint256,
	};
	fs.writeFileSync(path.resolve(__dirname, 'chainlink.json'), JSON.stringify(jsonObject));
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
