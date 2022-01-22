const main = async () => {
  const Exchange = await hre.ethers.getContractFactory("Exchange");
  const exchange = await Exchange.deploy();

  await exchange.deployed();

  console.log("Exchange smart contract deployed to:", exchange.address);
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
