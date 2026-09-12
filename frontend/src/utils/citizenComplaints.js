import { DETECTIONS_ENDPOINT } from '../config';

export async function saveCitizenComplaint(complaintData) {
  const response = await fetch(DETECTIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true' // Preserves compatibility with ngrok endpoints
    },
    body: JSON.stringify({
    bus_id: complaintData.bus_id,
    latitude: complaintData.lat,
    longitude: complaintData.lng,
    location: complaintData.location,
    created_at: new Date().toISOString(),
    image_base64: complaintData.img_url.split(',')[1] ?? complaintData.img_url
  })
  });

  if (!response.ok) {
    throw new Error(`Failed to submit complaint: ${response.status}`);
  }

  return await response.json();
}