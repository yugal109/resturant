export interface UserOrderDatum {
  type: string;
  id: string;
  attributes: OrderAttributes;
}

export interface OrderAttributes {
  order_id: number;
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  location_id: number;
  address_id: number;
  total_items: number;
  comment: string;
  payment: string;
  order_type: string;
  created_at: string;
  updated_at: string;
  order_time: string;
  order_date: string;
  order_total: null;
  status_id: number;
  ip_address: string;
  user_agent: string;
  assignee_id: number;
  assignee_group_id: number;
  invoice_prefix: string;
  invoice_date: null;
  hash: string;
  processed: null;
  status_updated_at: string;
  assignee_updated_at: null;
  order_time_is_asap: boolean;
  delivery_comment: null;
  customer_name: string;
  order_type_name: string;
  order_date_time: string;
  formatted_address: null;
  status_name: string;
  status: Status;
  currency: string;
  order_totals: any[];
  order_menus: any[];
}

export interface Status {
  status_id: number;
  status_name: string;
  status_comment: string;
  notify_customer: boolean;
  status_for: string;
  status_color: string;
  created_at: string;
  updated_at: string;
}

export interface Links {
  self: string;
  first: string;
  last: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}
