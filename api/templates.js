async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch (error) {
      return {};
    }
  }

  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        resolve({});
      }
    });
  });
}

module.exports = async (req, res) => {
  const method = req.method || 'GET';

  if (method === 'GET') {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const readKey = SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !readKey) {
      return res.status(200).json({ success: true, projects: [] });
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/template_projects?select=id,project_name,template_id,payload,created_at&order=created_at.desc&limit=20`, {
        headers: {
          apikey: readKey,
          Authorization: `Bearer ${readKey}`
        }
      });

      if (!response.ok) {
        const details = await response.text();
        console.error('Supabase template fetch failed', details);
        return res.status(500).json({ success: false, error: 'Could not fetch projects', details });
      }

      const projects = await response.json();
      return res.status(200).json({ success: true, projects });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Server error', detail: error.message });
    }
  }

  if (method === 'POST') {
    const body = await readJsonBody(req);
    const { project_name, template_id, payload } = body || {};

    if (!project_name || !payload) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(200).json({ success: true, stored: false, project: payload });
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/template_projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          Prefer: 'return=representation'
        },
        body: JSON.stringify({
          project_name,
          template_id: template_id || 'classic',
          payload,
          created_at: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const details = await response.text();
        console.error('Supabase template save failed', details);
        return res.status(500).json({ success: false, error: 'Could not save project', details });
      }

      const result = await response.json();
      return res.status(200).json({ success: true, stored: true, project: result[0] || null });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Server error', detail: error.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
};
