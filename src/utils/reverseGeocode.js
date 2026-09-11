// In-memory cache so repeated lat/lng pairs don't trigger repeated
// network calls (e.g. across polling intervals).
const cache = new Map();

function cacheKey(lat, lng) {
  return `${lat.toFixed(5)},${lng.toFixed(5)}`;
}

// Reverse geocodes a single coordinate using OpenStreetMap's free
// Nominatim API. Returns a short human-readable string, or null on failure.
export async function reverseGeocode(lat, lng) {
  const key = cacheKey(lat, lng);
  if (cache.has(key)) return cache.get(key);

  try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=16`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Reverse geocode failed (${res.status})`);
        const data = await res.json();

        const addr = data.address ?? {};

        const road = addr.road || data.name || null;
        const area =
            addr.suburb || addr.neighbourhood || addr.quarter || addr.residential || null;
        const city =
            addr.city || addr.town || addr.village || addr.municipality || addr.county || null;
        const pincode = addr.postcode || null;


        const label =
            [road, area, city].filter(Boolean).join(', ') + (pincode ? ` - ${pincode}` : '');

        const result = label || data.display_name?.split(',').slice(0, 2).join(',') || null;

        cache.set(key, result);
        return result;
    } 
    catch (err) {
        console.warn('Reverse geocode error:', err.message);
        return null;
    }
}

export async function reverseGeocodeBatch(coords, delayMs = 1100) {
  const results = [];
  for (const { lat, lng } of coords) {
    const key = cacheKey(lat, lng);
    if (cache.has(key)) {
      results.push(cache.get(key));
      continue;
    }
    const label = await reverseGeocode(lat, lng);
    results.push(label);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return results;
}