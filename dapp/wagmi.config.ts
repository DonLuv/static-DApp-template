import { defineConfig } from '@wagmi/cli'
import { hardhat, react } from '@wagmi/cli/plugins'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Auto-discovers compiled contracts and generates per-contract output files.
 *
 * Each `evm/contracts/<Name>.sol` produces:
 *   dapp/src/lib/contracts/<name>/generated.ts
 *
 * Contracts inside `mocks/` or `test/` subdirectories are excluded.
 */
export default defineConfig(async () => {
  const artifactsDir = path.resolve(import.meta.dirname, '../evm/artifacts/contracts')

  if (!fs.existsSync(artifactsDir)) {
    console.warn('wagmi: No artifacts found — run `npm run compile` first. Skipping codegen.')
    return []
  }

  const entries = fs.readdirSync(artifactsDir, { withFileTypes: true })

  const configs = entries
    .filter(entry => entry.isDirectory() && entry.name.endsWith('.sol'))
    // Exclude mock/test contracts
    .filter(entry => {
      const parent = path.basename(path.dirname(path.join(artifactsDir, entry.name)))
      return parent === 'contracts'
    })
    .map(entry => {
      const contractName = entry.name.replace('.sol', '')
      const dirName = contractName
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        .toLowerCase()

      return {
        out: `src/lib/contracts/${dirName}/generated.ts`,
        plugins: [
          hardhat({
            project: '../evm',
            include: [`${contractName}.json`],
            commands: { build: false },
          }),
          react(),
        ],
      }
    })

  if (configs.length === 0) {
    console.warn('wagmi: No contract artifacts discovered.')
  }

  return configs
})
