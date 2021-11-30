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