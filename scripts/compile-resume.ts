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
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs/promises'

const execAsync = promisify(exec)

const SRC_TEX = 'src/data/resume.tex'
const TARGET_PDF = 'public/satyam_resume.pdf'

async function compileResume() {
  try {
    console.log('Compiling resume...')

    const srcDir = path.dirname(SRC_TEX)
    const texFile = path.basename(SRC_TEX)

    // Run pdflatex in the directory of the .tex file
    await execAsync(`pdflatex -interaction=nonstopmode -halt-on-error ${texFile}`, { cwd: srcDir })

    // Move the generated PDF to public directory
    await fs.rename(path.join(srcDir, 'resume.pdf'), TARGET_PDF)
    console.log(`Successfully compiled and moved PDF to ${TARGET_PDF}`)

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
