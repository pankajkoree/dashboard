import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { api } = req.body; // Get the api key from the request body

      // Send the request to the external API
      const response = await axios.post('https://testd5-img.azurewebsites.net/api/imgdownload', {
        api: api
      });

      // Return the data from the external API to the client
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ error: 'Failed to fetch image' });
    }
  } else {
    // Method Not Allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
