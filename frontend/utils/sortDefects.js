export function sortByBusId(defects) {
  return [...defects].sort((a, b) => {
    if (a.bus_id < b.bus_id) return -1;
    if (a.bus_id > b.bus_id) return 1;
    // within same bus, most recent first
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
}
