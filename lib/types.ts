export enum Form {
  Initial,
  Loading,
  Success,
  Error,
}

export type FormState = {
  state: Form;
  message?: string;
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export enum ILinkIcon {
  github,
  visit,
}

export interface ILink {
  href: string;
  alt: string;
  text: string;
  icon: ILinkIcon | string;
  blank?: boolean;
}

export interface IProjectCard {
  title?: string;
  description?: string;
  href?: string;
  icon?: string;
  tags: object[];
  imageObject: {
    src: string;
    alt: string;
  };
  links?: ILink[];
}

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
  image: object;
};


export type TopTracks = {
  tracks: Song[];
};

export enum ReadStatus {
  HAS_READ = "HAS_READ",
  HAS_NOT_READ = "HAS_NOT_READ",
  READING = "READING"
}

export type Book = {
  id?: bigint | number;
  title: string;
  subtitle?: string;
  author: string;
  description?: string;
  num_pages?: number;
  cover_src?: string;
  publish_date?: string;
  subjects?: string;
  key?: string;
  comment?: string;
  rating?: number;
  created_at?: any;
  updated_at?: any;
  created_by: string;
  read_status: ReadStatus;
}

export type Views = {
  total: number;
};


export type Subscribers = {
  count: number;
};



export type YouTube = {
  subscriberCount: number;
  viewCount: number;
};

export type GitHub = {
  stars: number;
};

export type Gumroad = {
  sales: number;
};

export type Unsplash = {
  downloads: number;
  views: number;
};

export type Raindrop = {
  _id: number | string;
  title: string;
  excerpt?: string;
  link: string;
  tags?: string[];
  cover: string;
  created: string;
  domain: string;
};