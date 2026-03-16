const BASE_URL = 'https://schoolapp-backend-production.up.railway.app'

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  return res
}
