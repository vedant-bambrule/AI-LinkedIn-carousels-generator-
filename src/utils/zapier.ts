import axios from 'axios';
import { FormData } from '../types';

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/27281969/ujr5b0a/';

/**
 * Sends form data to the Zapier webhook.
 * Zapier is configured to generate the carousel content and potentially return it.
 */
export async function sendToZapier(formData: FormData) {
  try {
    console.log('Sending data to Zapier...', formData);
    
    const response = await axios.post(ZAPIER_WEBHOOK_URL, {
      niche: formData.businessNiche,
      audience: formData.targetAudience,
      timestamp: new Date().toISOString()
    });

    console.log('Zapier response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending data to Zapier:', error);
    throw error;
  }
}
