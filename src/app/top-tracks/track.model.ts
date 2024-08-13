export interface Track{
  name: string;
  duration: number;
  playcount: number;
  listeners:number;
  mbid: string | null;
  url: string;
  streamable:{
    '#text': string;
    fulltrack:string;
  };
  artist:{
    name: string;
    mbid:string | null;
    url: string;
  };
  image: Image[];
}
export interface Image{
  '#text': string;
  size:string;
}

export interface Headers {
  status: string;
  code: number;
  error_message: string;
  warnings: string;
  results_count: number;
  next: string;
}


export interface TrackList {
  id: number;
  name: string;
  duration: number;
  artist_id: number;
  artist_name: string;
  artist_idstr: string;
  album_name: string;
  album_id: string;
  license_ccurl: string;
  position: number;
  releasedate: string;
  album_image: string;
  audio: string;
  audiodownload: string;
  prourl: string;
  shorturl: string;
  shareurl: string;
  waveform: string;
  image: string;
  audiodownload_allowed: boolean;
}
