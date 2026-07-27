export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const readKey = SUPABASE_ANON_KEY || SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !readKey) {
    return res.status(500).json({ error: 'Database not configured. Please add SUPABASE_URL and optionally SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY.' });
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/wishes?select=id,full_name,message,guest_of,attendance,created_at&order=created_at.desc&limit=50`,
      {
        headers: {
          apikey: readKey,
          Authorization: 'Bearer ' + readKey
        }
      }
    );

    if (!response.ok) {
      const details = await response.text();
      console.error('Supabase query failed', details);
      return res.status(500).json({ error: 'Could not fetch entries', details });
    }

    const entries = await response.json();
    return res.status(200).json({ success: true, entries });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error', detail: error.message });
  }
}
