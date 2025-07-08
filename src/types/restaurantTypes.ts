type RestaurantLocation = {
  address: string;
  locality: string;
  region: string;
  postcode: string;
  country: string;
  formatted_address: string;
};

type RestaurantSocialMedia = {
  facebook_id?: string;
  twitter?: string;
  instagram?: string;
};

type RestaurantExtendedLocation = {
  dma: string;
  census_block_id: string;
};

type RestaurantCategory = {
  fsq_category_id: string;
  name: string;
  short_name: string;
  plural_name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
};

export type FoursquareRestaurantVenue = {
  fsq_place_id: string;
  latitude: number;
  longitude: number;
  categories: RestaurantCategory[];
  date_created: string;
  date_refreshed: string;
  distance: number;
  email: string;
  extended_location: RestaurantExtendedLocation;
  link: string;
  location: RestaurantLocation;
  name: string;
  price: number;
  rating: number;
  hours: RestaurantHoursVenue;
  placemaker_url: string;
  related_places: Array<FoursquareRestaurantVenue>;
  social_media: RestaurantSocialMedia;
  tel: string;
  website: string;
};

type RestaurantHoursVenue = {
  display: string;
  is_local_holiday: boolean;
  open_now: boolean;
  regular: {
    close: string;
    day: number;
    open: string;
  };
};

export type RestaurantResult = {
  id: string;
  name: string;
  address: string;
  cuisine: string;
  rating?: number | null;
  price_level?: number | null;
  operating_hours?: RestaurantHoursVenue | null;
  distance: number;
};

export interface RatingFilter {
  min?: number;
  max?: number;
  operator?: Operator;
}

export interface RestaurantSearchParams {
  query?: string;
  near?: string;
  price?: string;
  open_at?: string;
  open_now?: boolean;
  rating?: RatingFilter;
  limit?: number;
}

export enum Operator {
  GTE = "gte",
  LTE = "lte",
  EQ = "eq",
  BETWEEN = "between",
}
