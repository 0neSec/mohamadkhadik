// pages/api/contact.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const MAILTRAP_CONFIG = {
    inboxId: 1723439585,
    apiToken: "c2d65b1d9e644cb264bf9fd82484737e"
  };

  try {
    const response = await fetch(`https://mailtrap.io/api/send/${MAILTRAP_CONFIG.inboxId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': MAILTRAP_CONFIG.apiToken
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Mailtrap error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}