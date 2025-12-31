export async function before(m, { conn }) {
  if (!m.text) return false

  const text = m.text.toLowerCase()

  if (text.startsWith('.')) return true

  if (['salut', 'bonjour', 'hello', 'bonsoir'].includes(text)) {
    await conn.sendMessage(m.chat, { text: 'Salut 👋 je suis actif. Tape .menu' })
    return false
  }

  return false
}
fix filter: allow salut messages
