export async function GetCurrentLocation(): Promise<{
  lat?: number;
  lon?: number;
  address?: string;
}> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation not supported"));
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

          const res = await fetch(url, {
            headers: {
              "User-Agent": "nextjs-app", // Nominatim requires this
            },
          });

          const data = await res.json();

          resolve({
            lat,
            lon,
            address: data.display_name || "Address not found",
          });
        } catch (e) {
          console.error("Reverse geocoding failed:", e);
          resolve({ lat, lon }); // fallback if reverse geocode fails
        }
      },
      (err) => reject(err),
      { enableHighAccuracy: true }
    );
  });
}
