export interface HomePageData {
  type: string;
  id: string;
  attributes: Attributes;
}

export interface Attributes {
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
}

export interface MenuDatum {
  type: string;
  id: string;
  attributes: MenuAttributes;
}

export interface MenuAttributes {
  menu_id: number;
  menu_name: string;
  menu_description: string;
  menu_price: number;
  minimum_qty: number;
  menu_status: boolean;
  menu_priority: number;
  order_restriction: null;
  created_at: string;
  updated_at: string;
  stock_qty: number;
  stocks: any[];
  currency: string;
}

export interface Links {
  self: string;
  first: string;
  next: string;
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
