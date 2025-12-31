export async function before(m, { conn }) {
  if (!m.text) return false
  if (m.text.startsWith('.')) return true
  return false
}
