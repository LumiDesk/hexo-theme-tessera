import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const requiredPaths = [
  '_config.yml',
  'layout/index.pug',
  'layout/post.pug',
  'source/css',
  'source/js'
]

const missing = requiredPaths.filter((path) => !existsSync(join(root, path)))
if (missing.length > 0) {
  console.error(`Tessera smoke check failed; missing: ${missing.join(', ')}`)
  process.exit(1)
}

for (const dependency of ['hexo-renderer-pug', 'hexo-renderer-stylus', 'hexo-util']) {
  if (!packageJson.dependencies?.[dependency]) {
    console.error(`Tessera smoke check failed; missing dependency declaration: ${dependency}`)
    process.exit(1)
  }
}

console.log('Tessera smoke check passed: package metadata and theme entry points are present.')
