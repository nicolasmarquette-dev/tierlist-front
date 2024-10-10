import "./album-list.styles.css";
import { AlbumInfos } from "../interfaces/album-infos.interface";
import { Album } from "./album.component";

interface AlbumListProps {
  albumInfosList: AlbumInfos[];
}

export const AlbumList = (props: AlbumListProps): JSX.Element => {
  const buildAlbumList = (): JSX.Element[] => {
    return props.albumInfosList
      .sort((a, b) => a.position - b.position)
      .map((albumInfos) => (
        <>
          <h1 className="text-3xl font-bold underline">
            Top {albumInfos.position}
          </h1>
          <Album imageUrl={albumInfos.coverUrl} title={albumInfos.title} />
        </>
      ));
  };

  return <div className="grid dir-cols">{buildAlbumList()}</div>;
};
