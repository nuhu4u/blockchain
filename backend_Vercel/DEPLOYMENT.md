# Deployment Guide

This guide provides instructions for deploying the Election smart contract and related services to different environments.

## Prerequisites

1. Node.js (v16+)
2. npm or yarn
3. Hardhat
4. MetaMask or other Web3 wallet
5. Environment variables set up (see `.env.example`)

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Blockchain Network
BLOCKCHAIN_NETWORK=http://localhost:8545
CONTRACT_ADDRESS=

# Wallet Configuration
PRIVATE_KEY= # Admin private key (keep secure!)
ADMIN_ADDRESS= # Corresponding address

# For testnet/mainnet deployment
SEPOLIA_RPC_URL= # Infura/Alchemy URL for Sepolia
MAINNET_RPC_URL= # Infura/Alchemy URL for Mainnet
ETHERSCAN_API_KEY= # For contract verification

# Encryption
ENCRYPTION_KEY= # 32-byte encryption key for private key encryption

# Database
DATABASE_URL= # PostgreSQL connection string
```

## Local Development Deployment

1. Start a local Hardhat node:
   ```bash
   npx hardhat node
   ```

2. In a new terminal, deploy the contract:
   ```bash
   npx hardhat run --network localhost deploy/deploy.js
   ```

3. Update environment variables:
   ```bash
   node scripts/update-env-after-deploy.js localhost <deployed-contract-address>
   ```

## Testnet Deployment (Sepolia)

1. Ensure you have Sepolia ETH in your wallet for gas fees

2. Deploy to Sepolia:
   ```bash
   npx hardhat run --network sepolia deploy/deploy.js
   ```

3. Update environment variables:
   ```bash
   node scripts/update-env-after-deploy.js sepolia <deployed-contract-address>
   ```

4. The contract will be automatically verified on Etherscan if `ETHERSCAN_API_KEY` is set.

## Mainnet Deployment

> ⚠️ **Warning**: Deploying to mainnet involves real funds. Double-check all configurations.

1. Ensure you have sufficient ETH for gas fees

2. Deploy to Mainnet:
   ```bash
   npx hardhat run --network mainnet deploy/deploy.js
   ```

3. Update environment variables:
   ```bash
   node scripts/update-env-after-deploy.js mainnet <deployed-contract-address>
   ```

## Verifying Contracts

Contracts are automatically verified during deployment if the Etherscan API key is provided. To manually verify:

```bash
npx hardhat verify --network <network> <contract-address> <constructor-args>
```

## Post-Deployment Steps

1. **Register Voters**: Use the admin interface to register voter addresses
2. **Initialize Election**: Set up candidates and configure election parameters
3. **Monitor**: Set up monitoring for contract events and transactions
4. **Backup**: Save deployment artifacts in `deployments/` directory

## Security Considerations

- Never commit `.env` files or private keys to version control
- Use hardware wallets for production deployments
- Consider multi-signature wallets for contract ownership
- Regularly audit contract permissions and access controls

## Troubleshooting

- **Deployment Fails**: Check gas limits and ensure the account has sufficient funds
- **Verification Issues**: Ensure constructor arguments match exactly
- **Connection Issues**: Verify RPC URLs and network configurations

## Rollback Plan

1. Pause the contract using the `emergencyPause()` function
2. Deploy a new version with fixes
3. Migrate necessary state if applicable
4. Update frontend to point to the new contract

## Support

For assistance, please contact the development team or open an issue in the repository.
