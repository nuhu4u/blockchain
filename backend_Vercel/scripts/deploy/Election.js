const hre = require("hardhat");
const { ethers } = hre;
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Deploying Election contract...");
  
  // Get the contract factory
  const Election = await hre.ethers.getContractFactory("Election");
  
  // Deploy the contract
  const election = await Election.deploy();
  
  // Wait for deployment to complete
  await election.waitForDeployment();
  
  // Get the contract address
  const contractAddress = await election.getAddress();
  console.log(`Election contract deployed to: ${contractAddress}`);
  
  // Prepare contract data to save
  const contractData = {
    address: contractAddress,
    abi: JSON.parse(election.interface.formatJson()),
    network: hre.network.name,
    deployer: (await hre.ethers.provider.getSigner()).address,
    deployTx: election.deploymentTransaction().hash,
    timestamp: new Date().toISOString()
  };
  
  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, "../../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  // Save deployment info to a JSON file
  const deploymentFile = path.join(deploymentsDir, `Election-${hre.network.name}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(contractData, null, 2));
  
  console.log(`Deployment info saved to: ${deploymentFile}`);
  
  return contractAddress;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
