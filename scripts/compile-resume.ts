/**
 * Prerequisites for compiling the LaTeX resume:
 *
 * 1. Install BasicTeX (or MacTeX):
 *    brew install --cask basictex
 *
 * 2. Update tlmgr and install required LaTeX packages:
 *    sudo tlmgr update --self
 *    sudo tlmgr install titlesec marvosym enumitem fancyhdr fontawesome5 xcolor lm babel-english
 */
import { execFile } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const execFileAsync = promisify(execFile)

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcTex = path.join(projectRoot, 'src/data/resume.tex')
const targetPdf = path.join(projectRoot, 'public/satyam_resume.pdf')

async function compileResume() {
  try {
    console.log('Compiling resume...')

    const srcDir = path.dirname(srcTex)
    const texFile = path.basename(srcTex)

    // Run pdflatex in the directory of the .tex file
    await execFileAsync('pdflatex', ['-interaction=nonstopmode', '-halt-on-error', texFile], { cwd: srcDir })

    // Move the generated PDF to public directory
    await fs.rename(path.join(srcDir, 'resume.pdf'), targetPdf)
    console.log(`Successfully compiled and moved PDF to ${path.relative(projectRoot, targetPdf)}`)

    // Clean up auxiliary files silently
    const exts = ['.aux', '.log', '.out', '.toc', '.fls', '.fdb_latexmk', '.synctex.gz']
    await Promise.all(exts.map((ext) => fs.unlink(path.join(srcDir, `resume${ext}`)).catch(() => {})))
  } catch (error: unknown) {
    console.error('Failed to compile resume:\n')
    const err = error as Error & { stdout?: string; stderr?: string }
    console.error(err.stdout || err.stderr || err.message)
    process.exit(1)
  }
}

compileResume()
