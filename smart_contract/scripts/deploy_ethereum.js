const main = async () => {
  const ExchangeEthereum = await hre.ethers.getContractFactory("ExchangeEthereum");
  const exchange = await ExchangeEthereum.deploy();

  await exchange.deployed();

  console.log("Exchange (ethereum) smart contract deployed to:", exchange.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();
