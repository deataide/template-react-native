#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// -----------------------------
// args
// -----------------------------
const args = process.argv.slice(2)
const verbose = args.includes('--verbose')

// -----------------------------
// root detect
// -----------------------------
const hasSrc = fs.existsSync(path.join(process.cwd(), 'src'))
const ROOT = hasSrc ? path.join(process.cwd(), 'src') : process.cwd()
const FEATURES_DIR = path.join(ROOT, 'features')

if (!fs.existsSync(FEATURES_DIR)) {
  console.log('❌ Nenhuma pasta "features" encontrada.')
  process.exit(1)
}

const features = fs
  .readdirSync(FEATURES_DIR)
  .filter((file) =>
    fs.statSync(path.join(FEATURES_DIR, file)).isDirectory()
  )

if (features.length === 0) {
  console.log('⚠️ Nenhuma feature encontrada.')
  process.exit(0)
}

console.log('')
console.log('📦 Features encontradas:')
console.log('')

features.forEach((feature) => {
  const featurePath = path.join(FEATURES_DIR, feature)

  const hasApi    = fs.existsSync(path.join(featurePath, 'api'))
  const hasStore  = fs.existsSync(path.join(featurePath, 'store'))
  const hasSchema = fs.existsSync(path.join(featurePath, 'schema'))

  console.log(`• ${feature}`)
  console.log(
    `   ${hasApi ? '🟢 api' : '⚪ api'} | ` +
    `${hasSchema ? '🟢 schema' : '⚪ schema'} | ` +
    `${hasStore ? '🟢 store' : '⚪ store'}`
  )

  if (verbose) {
    const files = fs.readdirSync(featurePath)
    files.forEach((file) => {
      console.log(`     └── ${file}`)
    })
  }

  console.log('')
})

console.log(`Total: ${features.length} feature(s)`)
console.log('')