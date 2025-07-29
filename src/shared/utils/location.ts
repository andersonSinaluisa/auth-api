import axios from 'axios';

export async function getUserLocation(ip: string) {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const data = response.data; // Contiene país, región, ciudad, etc.
    if (response.status !== 200 || data.status !== 'success') {
      return 'location not found';
    }
    return (
      data.country +
      ', ' +
      data.regionName +
      ', ' +
      data.city +
      ', ' +
      data.zip +
      ', ' +
      data.lat +
      ', ' +
      data.lon
    );
  } catch (error) {
    console.error('Error obteniendo ubicación:', error);
    return null;
  }
}
