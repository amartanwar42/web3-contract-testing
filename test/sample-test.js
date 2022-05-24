/** @format */

const { expect } = require('chai');
const { ethers } = require('hardhat');
const web3 = require('web3');
const fs = require('fs');
const path = require('path');

describe('GetterSetter tests', () => {
	let getBytes;
	let getBytes32;
	let getUint256;
	let contractAddress;
	let deployerAddress;
	it('test getter setter', async () => {
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
	});

	it('write data into json', () => {
		let jsonObject = {
			'GetterSetter contract deployed to': contractAddress,
			'deployer address is': deployerAddress,
			'getBytes value is': getBytes,
			'getBytes32 value is': getBytes32,
			'getUint256 value is': getUint256,
		};
		fs.writeFileSync(path.resolve(__dirname, 'chainlink.json'), JSON.stringify(jsonObject));
	});
});
