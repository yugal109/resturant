import { api } from './axios';

export async function getLocations() {
  const resposne = await api.get<App.Api.Pagination<App.Api.Location>>(`/locations?include=media`);

  return resposne.data;
}

export async function changeLocationStatus(
  locationId: string,
  data: Partial<App.Api.LocationStatusUpdate>
) {
  const response = await api.patch<App.Api.LocationStatusUpdate>(
    `/eatonline/locations/${locationId}`,
    data
  );
  return response.data;
}

export async function getLocationStatus(locationId: string) {
  const response = await api.get<App.Api.LocationStatusUpdate>(
    `/eatonline/locations/${locationId}`
  );
  return response.data;
}
