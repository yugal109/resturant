import { HomePageData, Links, MenuDatum, Meta } from './homePageApiTypes';
import { Customer, Order } from './profileApiTypes';
import { UserOrderDatum } from './userOrderApiTypes';

export interface ProfileData {
  success: boolean;
  customer: Customer;
  orders: Order[];
  reviews: any[];
  message: string;
}

export interface ResturantProfilePageTopInterface {
  data: HomePageData;
}

export interface RestaurantProfileMenuInterface {
  data: MenuDatum[];
  meta: Meta;
  links: Links;
}

export interface UserOrderInterface {
  data: UserOrderDatum[];
  meta: Meta;
  links: Links;
}

export interface UserOneOrderInterface {
  data: UserOrderDatum;
}
