import { format } from 'date-fns';

import { api } from './axios';

export async function getReports(startAt: Date, endAt: Date, locationId: string) {
  const formatStr = 'dd-MM-yyyy';

  const startDate = format(startAt, formatStr);
  const endDate = format(endAt, formatStr);

  const params: any = {
    orders_from: startDate,
    orders_to: endDate,
  };

  const resposne = await api.get<App.Api.SaleReportData>(`/eatonline/reports/${locationId}`, {
    params,
  });

  return resposne.data;
}
