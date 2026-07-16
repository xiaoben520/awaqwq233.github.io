// Extract favorites from Netscape bookmark file
import fs from 'node:fs'
import path from 'node:path'

const input = fs.readFileSync('docs/materials/favorites_2026_7_16.html', 'utf8')
const stripped = input.replace(/ICON="data:image\/png;base64,[^"]*"/g, '')
const lines = stripped.split('\n')

let current = null
const rows = []
for (const line of lines) {
  const h3 = line.match(/<DT><H3[^>]*>([^<]+)<\/H3>/)
  if (h3) {
    current = h3[1].trim()
    continue
  }
  const a = line.match(/<DT><A HREF="([^"]+)"[^>]*>([^<]+)<\/A>/)
  if (a) {
    rows.push({ category: current || '未分类', title: a[2].trim(), url: a[1] })
  }
}

const map = new Map()
for (const r of rows) {
  if (!map.has(r.category)) map.set(r.category, [])
  map.get(r.category).push({ name: r.title, url: r.url })
}

const grouped = [...map.entries()].map(([category, items]) => ({ category, items }))
fs.writeFileSync('public/materials/favorites.json', JSON.stringify(grouped, null, 2))
console.log(`Categories: ${grouped.length}, items: ${rows.length}`)
