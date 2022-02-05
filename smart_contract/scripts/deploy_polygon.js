const main = async () => {
    const ExchangePolygon = await hre.ethers.getContractFactory("ExchangePolygon");
    const exchange = await ExchangePolygon.deploy();
  
    await exchange.deployed();
  
    console.log("Exchange (polygon) smart contract deployed to:", exchange.address);
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
  