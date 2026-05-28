const fs = require('fs')
const os = require('os')
const path = require('path')
const { execFileSync } = require('child_process')

const SCRIPT_PATH = path.resolve(__dirname, '..', 'create-feature.js')

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

describe('create-feature script', () => {
  let tmpDir

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'feature-gen-'))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  test('generates full feature with --all', () => {
    execFileSync('node', [SCRIPT_PATH, 'supplier', '--all'], {
      cwd: tmpDir,
      stdio: 'pipe',
    })

    const expectedPaths = [
      'src/features/supplier/api/supplier.api.ts',
      'src/features/supplier/hooks/supplier.keys.ts',
      'src/features/supplier/hooks/useSupplier.ts',
      'src/features/supplier/schema/supplier.schema.ts',
      'src/features/supplier/store/supplier.store.ts',
      'src/features/supplier/screens/SupplierListScreen.tsx',
      'src/features/supplier/screens/SupplierDetailScreen.tsx',
      'src/features/supplier/screens/SupplierFormScreen.tsx',
      'src/features/supplier/index.ts',
      'app/(app)/supplier/index.tsx',
      'app/(app)/supplier/[id].tsx',
      'app/(app)/supplier/create.tsx',
    ]

    for (const relPath of expectedPaths) {
      expect(fs.existsSync(path.join(tmpDir, relPath))).toBe(true)
    }

    const hooksContent = read(
      path.join(tmpDir, 'src/features/supplier/hooks/useSupplier.ts')
    )
    const apiContent = read(
      path.join(tmpDir, 'src/features/supplier/api/supplier.api.ts')
    )

    expect(hooksContent).toContain('useQuery')
    expect(hooksContent).toContain('useCreateSupplier')
    expect(apiContent).toContain("http.get<Supplier[]>('/suppliers')")
  })

  test('fails when feature already exists', () => {
    execFileSync('node', [SCRIPT_PATH, 'auth'], { cwd: tmpDir, stdio: 'pipe' })

    let failed = false
    try {
      execFileSync('node', [SCRIPT_PATH, 'auth'], { cwd: tmpDir, stdio: 'pipe' })
    } catch (error) {
      failed = true
      const output = `${error.stdout || ''}${error.stderr || ''}`
      expect(output).toContain('já existe')
    }

    expect(failed).toBe(true)
  })
})
