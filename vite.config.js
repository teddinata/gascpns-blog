import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const git = (cmd) => {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return ''
  }
}

// Served as /version.json so a deploy can be checked from the admin panel.
const release = {
  app: 'blog',
  version: JSON.parse(readFileSync(new URL('./package.json', import.meta.url))).version,
  commit: git('git rev-parse --short HEAD') || 'dev',
  built_at: new Date().toISOString(),
}

const versionJson = {
  name: 'version-json',
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'version.json', source: JSON.stringify(release, null, 2) })
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), versionJson],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
