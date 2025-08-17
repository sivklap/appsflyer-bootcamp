export async function registerUser(type, data) {
  const res = await fetch('/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, role: type })
  });

  if (!res.ok) {
    throw new Error('שגיאה בהרשמה');
  }

  return await res.json();
}
