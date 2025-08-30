// export async function getLocation(): Promise<{ lat: number; lon: number; address?: string }> {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       return reject(new Error("Geolocation not supported"));
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const lat = pos.coords.latitude;
//         const lon = pos.coords.longitude;

//         try {
//           // Reverse geocode (using OpenStreetMap Nominatim)
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
//           );
//           const data = await res.json();

//           resolve({
//             lat,
//             lon,
//             address: data.display_name,
//           });
//         } catch (err) {
//           resolve({ lat, lon }); // fallback: only lat/lon
//         }
//       },
//       (err) => reject(err)
//     );
//   });
// }
