#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const ROOT = process.cwd()
const SRC_FEATURES = path.join(ROOT, 'src', 'features')
const APP_DIR = path.join(ROOT, 'app')

const violations = []

function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, fileList)
      continue
    }

    if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      fileList.push(fullPath)
    }
  }

  return fileList
}

function getImports(source) {
  const imports = []
  const importRe = /import\s+[\s\S]*?from\s+['\"]([^'\"]+)['\"]/g
  const exportRe = /export\s+[\s\S]*?from\s+['\"]([^'\"]+)['\"]/g

  let match
  while ((match = importRe.exec(source)) !== null) imports.push(match[1])
  while ((match = exportRe.exec(source)) !== null) imports.push(match[1])

  return imports
}

function normalizeForDisplay(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, '/')
}

function resolveImport(fromFile, specifier) {
  if (!specifier.startsWith('.')) return null
  const base = path.dirname(fromFile)
  const candidate = path.resolve(base, specifier)
  return candidate
}

function checkFeatureIsolation(featureFiles) {
  for (const filePath of featureFiles) {
    const rel = normalizeForDisplay(filePath)
    const source = fs.readFileSync(filePath, 'utf8')
    const imports = getImports(source)

    const parts = rel.split('/')
    const featureIdx = parts.indexOf('features')
    const currentFeature = featureIdx >= 0 ? parts[featureIdx + 1] : null

    for (const spec of imports) {
      if (spec.startsWith('@features/')) {
        violations.push(`${rel}: import proibido entre features (${spec})`)
      }

      const resolved = resolveImport(filePath, spec)
      if (!resolved || !currentFeature) continue

      const normalized = resolved.replace(/\\/g, '/')
      const marker = '/src/features/'
      const pos = normalized.indexOf(marker)
      if (pos === -1) continue

      const rest = normalized.slice(pos + marker.length)
      const targetFeature = rest.split('/')[0]
      if (targetFeature && targetFeature !== currentFeature) {
        violations.push(
          `${rel}: import relativo atravessa boundary de feature (${spec})`
        )
      }
    }
  }
}

function checkApiAccess(files) {
  for (const filePath of files) {
    const rel = normalizeForDisplay(filePath)
    const source = fs.readFileSync(filePath, 'utf8')
    const imports = getImports(source)

    const isFeatureScreen = /^src\/features\/[^/]+\/screens\//.test(rel)
    const isAppRoute = rel.startsWith('app/')

    if (!isFeatureScreen && !isAppRoute) continue

    for (const spec of imports) {
      const directApiPath =
        spec.includes('/api/') ||
        spec.endsWith('.api') ||
        spec.endsWith('.api.ts') ||
        spec.endsWith('.api.tsx')

      if (directApiPath) {
        violations.push(`${rel}: tela/rota não pode importar api diretamente (${spec})`)
      }
    }
  }
}

const featureFiles = walk(SRC_FEATURES)
const appFiles = walk(APP_DIR)
const allFiles = [...featureFiles, ...appFiles]

checkFeatureIsolation(featureFiles)
checkApiAccess(allFiles)

if (violations.length > 0) {
  console.error('❌ Violação de arquitetura detectada:\n')
  for (const violation of violations) {
    console.error(`- ${violation}`)
  }
  process.exit(1)
}

console.log('✅ Arquitetura validada com sucesso')
