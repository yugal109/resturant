export interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  address_id: null;
  newsletter: null;
  customer_group_id: number;
  ip_address: string;
  created_at: string;
  status: boolean;
  reset_code: null;
  reset_time: null;
  activation_code: null;
  remember_token: null;
  is_activated: boolean;
  date_activated: string;
  last_login: null;
  last_seen: string;
  updated_at: string;
  last_location_area: string;
  full_name: string;
}

export interface Order {
  order_id: number;
  customer_id: null;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  location_id: number;
  address_id: number | null;
  total_items: number;
  comment: string;
  payment: string;
  order_type: string;
  created_at: string;
  updated_at: string;
  order_time: string;
  order_date: string;
  order_total: number;
  status_id: number;
  ip_address: string;
  user_agent: string;
  assignee_id: null;
  assignee_group_id: null;
  invoice_prefix: null | string;
  invoice_date: null | string;
  hash: string;
  processed: boolean | null;
  status_updated_at: string;
  assignee_updated_at: null;
  order_time_is_asap: boolean;
  delivery_comment: null;
  customer_name: string;
  order_type_name: string;
  order_date_time: string;
  formatted_address: null | string;
  status_name: string;
  location: Location;
  address: Address | null;
  status: Status;
}

export interface Address {
  address_id: number;
  customer_id: null;
  address_1: string;
  address_2: string;
  city: string;
  state: null | string;
  postcode: null | string;
  country_id: number;
  created_at: null;
  updated_at: null;
}

export interface Location {
  location_id: number;
  location_name: string;
  location_email: string;
  description: string;
  location_address_1: string;
  location_address_2: string;
  location_city: string;
  location_state: string;
  location_postcode: string;
  location_country_id: number;
  location_telephone: string;
  location_lat: number;
  location_lng: number;
  location_radius: null;
  location_status: boolean;
  permalink_slug: string;
  created_at: string;
  updated_at: string;
  location_thumb: string;
  media: Media[];
}

export interface Media {
  id: number;
  disk: string;
  name: string;
  file_name: string;
  mime_type: string;
  size: number;
  tag: string;
  custom_properties: any[];
  priority: number;
  created_at: string;
  updated_at: string;
  path: string;
  extension: string;
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
