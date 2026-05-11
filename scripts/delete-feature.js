#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

// -----------------------------
// args
// -----------------------------
const args = process.argv.slice(2)
const featureName = args[0]
const forceFlag = args.includes('--force')

if (!featureName) {
  console.log('Usage:')
  console.log('  node scripts/delete-feature.js <feature>')
  console.log('  node scripts/delete-feature.js <feature> --force')
  process.exit(1)
}

// -----------------------------
// root detect
// -----------------------------
const hasSrc = fs.existsSync(path.join(process.cwd(), 'src'))
const ROOT = hasSrc ? path.join(process.cwd(), 'src') : process.cwd()

const FEATURE_DIR = path.join(ROOT, 'features', featureName)
const ROUTE_DIR   = path.join(process.cwd(), 'app', '(app)', featureName)

// -----------------------------
// validação
// -----------------------------
if (!fs.existsSync(FEATURE_DIR)) {
  console.error(`❌ Feature "${featureName}" não existe.`)
  process.exit(1)
}

// -----------------------------
// helper
// -----------------------------
function deleteDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true })
    return true
  }
  return false
}

function run() {
  const deleted = []

  if (deleteDir(FEATURE_DIR)) deleted.push(`features/${featureName}/`)
  if (deleteDir(ROUTE_DIR))   deleted.push(`app/(app)/${featureName}/`)

  console.log('')
  console.log(`✅ Feature "${featureName}" removida com sucesso`)
  console.log('')
  console.log('Removidos:')
  deleted.forEach((d) => console.log(`  ${d}`))
  console.log('')
}

// -----------------------------
// confirmação
// -----------------------------
if (forceFlag) {
  run()
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question(
    `⚠️  Tem certeza que deseja remover a feature "${featureName}"? (s/N) `,
    (answer) => {
      rl.close()
      if (answer.toLowerCase() === 's') {
        run()
      } else {
        console.log('Operação cancelada.')
      }
    }
  )
}