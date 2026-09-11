const cache = new Map();

function cacheKey(lat, lng) {
  return `${lat.toFixed(5)},${lng.toFixed(5)}`;
}

function haversineMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
const GEOAPIFY_URL = 'https://api.geoapify.com/v2/places';
const SEARCH_RADIUS_M = 500;

const LANDMARK_CATEGORIES = [
  'healthcare.hospital',
  'education.school',
  'public_transport.bus',
  'public_transport.train',
  'service.vehicle.fuel',
].join(',');

const FAILURE_COOLDOWN_MS = 60000;
const failureTimestamps = new Map();

// Finds the nearest named landmark to a coordinate within SEARCH_RADIUS_M
// using the Geoapify Places API. Returns { name, distanceMeters } or null.
export async function findNearestLandmark(lat, lng) {
  const key = cacheKey(lat, lng);
  if (cache.has(key)) return cache.get(key);

  if (!GEOAPIFY_API_KEY) {
    console.warn('Missing VITE_GEOAPIFY_API_KEY - skipping landmark lookup.');
    return null;
  }

  const lastFailure = failureTimestamps.get(key);
  if (lastFailure && Date.now() - lastFailure < FAILURE_COOLDOWN_MS) {
    return null;
  }

  try {
    const url = `${GEOAPIFY_URL}?categories=${LANDMARK_CATEGORIES}&filter=circle:${lng},${lat},${SEARCH_RADIUS_M}&bias=proximity:${lng},${lat}&limit=10&apiKey=${GEOAPIFY_API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Geoapify request failed (${res.status})`);
    const data = await res.json();

    const named = (data.features ?? []).filter((f) => f.properties?.name);
    if (named.length === 0) {
      cache.set(key, null);
      return null;
    }

    let nearest = null;
    let nearestDist = Infinity;
    for (const f of named) {
      const [flng, flat] = f.geometry.coordinates;
      const dist = haversineMeters(lat, lng, flat, flng);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = f;
      }
    }

    const result = { name: nearest.properties.name, distanceMeters: Math.round(nearestDist) };
    cache.set(key, result);
    return result;
  } catch (err) {
    console.warn('Geoapify lookup error:', err.message);
    failureTimestamps.set(key, Date.now());
    return null;
  }
}

// Formats a landmark result as "40m from City Hospital".
export function formatLandmark(landmark) {
  if (!landmark) return null;
  return `${landmark.distanceMeters}m from ${landmark.name}`;
}

// Sequential batch lookup, spaced out gently (Geoapify's free tier is
// generous - 3000 requests/day - so this is mostly just being courteous).
export async function findNearestLandmarkBatch(coords, delayMs = 400) {
  const results = [];
  for (const { lat, lng } of coords) {
    const key = cacheKey(lat, lng);
    if (cache.has(key)) {
      results.push(cache.get(key));
      continue;
    }
    const landmark = await findNearestLandmark(lat, lng);
    results.push(landmark);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return results;
}