import { DETECTIONS_ENDPOINT } from '../config';

export async function saveCitizenComplaint(complaintData) {
  const response = await fetch(DETECTIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true' // Preserves compatibility with ngrok endpoints
    },
    body: JSON.stringify({
      bus_id: complaintData.bus_id, // e.g. "Citizen Report ([Aadhaar Redacted])"
      type: complaintData.type,
      latitude: complaintData.lat,
      longitude: complaintData.lng,
      location: complaintData.location,
      created_at: new Date().toISOString(),
      img_url: complaintData.img_url // Alternatively uploaded via S3/Cloudinary first
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to submit complaint: ${response.status}`);
  }

  return await response.json();
}