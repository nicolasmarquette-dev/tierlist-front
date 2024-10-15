import { AlbumInfos } from "./album-infos.interface";

export interface ListInfos {
  id: number;
  title: string;
  items: AlbumInfos[];
}
