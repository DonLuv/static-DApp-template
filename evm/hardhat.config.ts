import { defineConfig, configVariable } from 'hardhat/config'
import hardhatToolboxViem from '@nomicfoundation/hardhat-toolbox-viem'

export default defineConfig({
  plugins: [hardhatToolboxViem],
  solidity: {
    version: '0.8.27',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      type: 'http',
      url: configVariable('SEPOLIA_RPC_URL'),
      chainId: 11155111,
      accounts: [configVariable('DEPLOYER_PRIVATE_KEY')],
    },
  },
})
