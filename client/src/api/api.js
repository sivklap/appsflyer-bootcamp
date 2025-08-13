//#######################

export async function registerUser(type, data) {
  const res = await fetch(`/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, type })
  });

  if (!res.ok) {
    throw new Error('שגיאה בהרשמה');
  }

  return await res.json();
}
