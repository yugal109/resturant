export type LoginResposne = {
  status: string;
  token: string;
};

export type UserLoginResposne = {
  status: string;
  message: string;
  token: string;
};

export type Pagination<T> = {
  data: T[];
  meta: {
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    };
  };
  links: {
    self: string;
    first: string;
    last: string;
  };
};

export interface User {
  id: string;
  type: 'users';
  attributes: {
    user_id: string;
  };
}

export interface LocationStatusUpdate {
  offer_delivery: boolean;
  offer_collection: boolean;
}

export interface SaleReportData {
  orders_from: string;
  orders_to: string;
  total_amount: number;
  count_by_order_type: { orders_count: number; order_type: 'collection' | 'delivery' }[];
  by_payment_methods: {
    total_amount: number;
    code: string;
    name: string;
  }[];
  by_order_type: {
    total_amount: number;
    order_type: 'collection' | 'delivery';
  }[];
}

export interface Location {
  id: string;
  type: 'locations';
  attributes: {
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
    created_at: Date;
    updated_at: Date;
    media?: {
      id: string;
      disk: string;
      name: string;
      file_name: string;
      mime_type: string;
      size: string;
      tag: 'thumb' | 'unknown';
      custom_properties: [];
      priority: number;
      created_at: string;
      updated_at: string;
      path: string;
      extension: string;
    }[];
  };
}

export interface MenuWiseLocationInterface {
  name: string;
  description: string;
  rate: number;
  following: boolean;
}

export interface Order {
  id: string;
  type: 'orders';
  attributes: {
    order_id: string;
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
    order_type: 'collection' | 'delivery';
    created_at: Date;
    updated_at: Date;
    order_time: string;
    order_date: Date;
    order_total: number;
    status_id: number;
    ip_address: string;
    user_agent: string;
    assignee_id: null;
    assignee_group_id: null;
    invoice_prefix: string;
    invoice_date: Date;
    hash: string;
    processed: boolean;
    status_updated_at: Date;
    assignee_updated_at: null;
    order_time_is_asap: boolean;
    customer_name: string;
    order_type_name: string;
    order_date_time: string;
    formatted_address: null | string;
    status_name: string;
    status: OrderStatus;
    currency: string;
    order_totals: OrderTotal[];
    order_menus: OrderMenu[];
  };
}

export interface Menu {
  type: 'menus';
  id: '256';
  attributes: {
    menu_id: 256;
    menu_name: 'Sake Tataki';
    menu_description: '(Met sla & panzu saus)';
    menu_price: 6;
    minimum_qty: 1;
    menu_status: true;
    menu_priority: 0;
    order_restriction: null;
    created_at: '2023-05-19T12:00:08.000000Z';
    updated_at: '2023-05-19T12:00:08.000000Z';
    stock_qty: 0;
    stocks: [];
    currency: 'EUR';
  };
}

export type OrderType = Order['attributes']['order_type'];

export interface OrderMenu {
  order_menu_id: number;
  order_id: number;
  menu_id: number;
  name: string;
  quantity: number;
  price: string;
  subtotal: number;
  comment: null | string;
  menu_options: MenuOption[];
}

export interface MenuOption {
  order_option_id: number;
  order_id: number;
  menu_id: number;
  order_option_name: string;
  order_option_price: string;
  order_menu_id: number;
  order_menu_option_id: number;
  menu_option_value_id: number;
  quantity: number;
  order_option_category: string;
}

export interface OrderTotal {
  order_total_id: number;
  order_id: number;
  code: string;
  title: string;
  value: number;
  priority: number;
  is_summable: number;
}

export interface OrderStatus {
  status_id: number;
  status_name: string;
  status_comment: string;
  notify_customer: boolean;
  status_for: string;
  status_color: string;
  created_at: Date;
  updated_at: Date;
}

// export
export type ProfilePageResponse = {
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
};
