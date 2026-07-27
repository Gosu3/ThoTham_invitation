export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { full_name, message, guest_of, attendance } = req.body || {};

  if (!full_name || !message || !guest_of || !attendance) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Database not configured. Please add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.' });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/wishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: 'Bearer ' + SUPABASE_SERVICE_ROLE_KEY,
        Prefer: 'return=representation'
      },
      body: JSON.stringify({
        full_name,
        message,
        guest_of,
        attendance,
        created_at: new Date().toISOString()
      })
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('Supabase insert failed', details);
      return res.status(500).json({ error: 'Could not save data', details });
    }

    const result = await response.json();
    return res.status(200).json({ success: true, record: result[0] || null });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error', detail: error.message });
  }
}
