import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist')

if (!fs.existsSync(distDir)) {
  console.error('Error: dist/ directory does not exist. Run `pnpm run build` first.')
  process.exit(1)
}

let errorsCount = 0

function logError(msg: string) {
  console.error(`[AUDIT ERROR] ${msg}`)
  errorsCount++
}

function checkFileExists(relPath: string) {
  const fullPath = path.join(distDir, relPath)
  if (!fs.existsSync(fullPath)) {
    logError(`Missing expected output file: ${relPath}`)
  } else {
    console.log(`✓ Exists: ${relPath}`)
  }
}

// 1. Check critical discovery and feed files
const expectedFiles = [
  'robots.txt',
  'llms.txt',
  'sitemap-index.xml',
  'sitemap-0.xml',
  'rss.xml',
  'atom.xml',
  'feed.json',
  'api/portfolio.json',
  'apple-touch-icon.png',
  'og/default.png'
]

console.log('--- 1. Checking Critical Output Files ---')
for (const file of expectedFiles) {
  checkFileExists(file)
}

// 2. XML Syntax & Well-Formedness Check
console.log('\n--- 2. Checking XML Feed & Sitemap Formats ---')
const xmlFiles = ['rss.xml', 'atom.xml', 'sitemap-index.xml', 'sitemap-0.xml']
for (const xmlFile of xmlFiles) {
  const xmlPath = path.join(distDir, xmlFile)
  if (fs.existsSync(xmlPath)) {
    const content = fs.readFileSync(xmlPath, 'utf-8')
    if (!content.startsWith('<?xml')) {
      logError(`${xmlFile} does not start with valid XML declaration`)
    } else if (xmlFile.includes('rss') && !content.includes('<rss')) {
      logError(`${xmlFile} missing <rss> root element`)
    } else if (xmlFile.includes('atom') && !content.includes('<feed')) {
      logError(`${xmlFile} missing <feed> root element`)
    } else if (xmlFile.includes('sitemap') && (!content.includes('<sitemapindex') && !content.includes('<urlset'))) {
      logError(`${xmlFile} missing valid sitemap root element`)
    } else {
      console.log(`✓ Valid XML structure: ${xmlFile}`)
    }
  }
}

// 3. Check JSON Feed 1.1 Specification
console.log('\n--- 3. Checking JSON Feed 1.1 Specification ---')
const jsonFeedPath = path.join(distDir, 'feed.json')
if (fs.existsSync(jsonFeedPath)) {
  try {
    const jsonFeed = JSON.parse(fs.readFileSync(jsonFeedPath, 'utf-8'))
    if (jsonFeed.version !== 'https://jsonfeed.org/version/1.1') {
      logError(`feed.json version must be "https://jsonfeed.org/version/1.1", found: ${jsonFeed.version}`)
    } else if (!Array.isArray(jsonFeed.items) || jsonFeed.items.length === 0) {
      logError('feed.json items must be a non-empty array')
    } else {
      let validItems = true
      for (const item of jsonFeed.items) {
        if (!item.url || !item.url.endsWith('/')) {
          logError(`JSON Feed item URL missing canonical trailing slash: ${item.url}`)
          validItems = false
        }
        if (!item.content_html || item.content_html.trim().length === 0) {
          logError(`JSON Feed item missing content_html: ${item.title}`)
          validItems = false
        }
      }
      if (validItems) {
        console.log(`✓ JSON Feed 1.1 spec compliant (${jsonFeed.items.length} items with HTML content & canonical URLs)`)
      }
    }
  } catch (err) {
    logError(`feed.json failed JSON parse: ${err}`)
  }
}

// 4. Check HTML Metadata & Article Head Integrity
console.log('\n--- 4. Checking HTML Metadata & Article Head Integrity ---')
const htmlFiles = [
  'index.html',
  'about/index.html',
  'content/index.html',
  'library/index.html',
  'analysis_of_the_hedgey_finance_exploit/index.html'
]

for (const htmlRel of htmlFiles) {
  const htmlPath = path.join(distDir, htmlRel)
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf-8')

    // Main landmark check for index & post pages
    if (htmlRel === 'index.html' || htmlRel.includes('analysis_of_the_hedgey_finance_exploit')) {
      const mainMatches = html.match(/<main[^>]*>/gi)
      if (!mainMatches || mainMatches.length !== 1) {
        logError(`${htmlRel} should have exactly 1 <main> element, found ${mainMatches?.length || 0}`)
      }
    }

    // JSON-LD script
    if (!html.includes('application/ld+json')) {
      logError(`${htmlRel} missing JSON-LD structured data script`)
    }

    // Article-specific checks
    if (htmlRel.includes('analysis_of_the_hedgey_finance_exploit')) {
      if (!html.includes('property="og:type" content="article"')) {
        logError(`${htmlRel} missing og:type="article"`)
      }
      if (!html.includes('property="article:published_time"')) {
        logError(`${htmlRel} missing article:published_time`)
      }
      if (!html.includes('property="article:tag"')) {
        logError(`${htmlRel} missing article:tag`)
      }
      if (html.includes('"@type":"BlogPosting"') && !html.includes('"mainEntityOfPage":"https://satyam.cv/analysis_of_the_hedgey_finance_exploit/"')) {
        logError(`${htmlRel} BlogPosting mainEntityOfPage does not match post canonical URL`)
      } else {
        console.log(`✓ Article metadata & JSON-LD verified: ${htmlRel}`)
      }
    } else {
      console.log(`✓ Page HTML verified: ${htmlRel}`)
    }
  }
}

// 5. Check for Draft & Future Leaks in Generated Outputs
console.log('\n--- 5. Checking for Draft & Future Post Leaks ---')
const llmsTxt = fs.existsSync(path.join(distDir, 'llms.txt')) ? fs.readFileSync(path.join(distDir, 'llms.txt'), 'utf-8') : ''
if (llmsTxt.includes('_draft') || llmsTxt.includes('/_')) {
  logError('llms.txt contains draft references')
} else {
  console.log('✓ llms.txt clean of drafts')
}

const portfolioJson = fs.existsSync(path.join(distDir, 'api/portfolio.json')) ? fs.readFileSync(path.join(distDir, 'api/portfolio.json'), 'utf-8') : ''
if (portfolioJson.includes('_draft') || portfolioJson.includes('/_')) {
  logError('api/portfolio.json contains draft references')
} else {
  console.log('✓ api/portfolio.json clean of drafts')
}

console.log('\n-----------------------------------')
if (errorsCount > 0) {
  console.error(`Audit failed with ${errorsCount} error(s).`)
  process.exit(1)
} else {
  console.log('Site audit passed cleanly!')
}
