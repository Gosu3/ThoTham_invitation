module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Database not configured. Please add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.' });
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/wishes?select=id,full_name,message,guest_of,attendance,created_at&order=created_at.desc&limit=50`,
      {
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: 'Bearer ' + SUPABASE_SERVICE_ROLE_KEY
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
};
