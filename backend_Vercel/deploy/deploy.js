const { ethers, network, run } = require('hardhat');
const fs = require('fs');
const path = require('path');
const { getNetworkConfig } = require('./config');

async function main() {
  console.log(`Starting deployment to ${network.name}...`);
  
  // Get network configuration
  const networkConfig = getNetworkConfig(network.name);
  
  // Deploy Election contract
  console.log('Deploying Election contract...');
  const Election = await ethers.getContractFactory('Election');
  const election = await Election.deploy();
  await election.waitForDeployment();
  
  const contractAddress = await election.getAddress();
  console.log(`Election contract deployed to: ${contractAddress}`);
  
  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId: networkConfig.chainId,
    contract: {
      name: 'Election',
      address: contractAddress,
      deployer: election.runner.address,
      deployTx: election.deploymentTransaction().hash,
      timestamp: new Date().toISOString(),
      abi: JSON.parse(election.interface.formatJson())
    },
    verification: {
      status: 'pending',
      explorerUrl: ''
    }
  };
  
  // Save deployment info to file
  const deploymentsDir = path.join(__dirname, '../deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  const deploymentFile = path.join(deploymentsDir, `deployment-${network.name}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log(`Deployment info saved to: ${deploymentFile}`);
  
  // Verify on Etherscan if on a supported network
  if (networkConfig.verify?.etherscan?.apiKey) {
    console.log('Waiting for block confirmations before verification...');
    await election.deploymentTransaction().wait(6); // Wait for 6 confirmations
    
    console.log('Verifying contract on Etherscan...');
    try {
      await run('verify:verify', {
        address: contractAddress,
        constructorArguments: [],
      });
      
      // Update deployment info with verification status
      deploymentInfo.verification.status = 'verified';
      deploymentInfo.verification.explorerUrl = `https://${network.name === 'mainnet' ? '' : `${network.name}.`}etherscan.io/address/${contractAddress}`;
      fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
      
      console.log('Contract verified on Etherscan!');
    } catch (error) {
      console.error('Verification failed:', error.message);
      deploymentInfo.verification.status = 'failed';
      deploymentInfo.verification.error = error.message;
      fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
    }
  }
  
  return deploymentInfo;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
