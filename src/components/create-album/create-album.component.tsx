import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Album } from "../album.component";
import { AlbumInfos } from "../../interfaces/album-infos.interface";

interface CreateAlbumProps {
  setAlbumCreated: (created: AlbumInfos[]) => void;
  albumCreated: AlbumInfos[];
}

export const CreateAlbum = (props: CreateAlbumProps) => {
  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    if (props.albumCreated.length === 0) {
      setTitle("");
      setCoverUrl("");
      setPosition("");
    }
  }, [props.albumCreated]);

  const albumIsValid = (): boolean => {
    return title.trim().length !== 0 && coverUrl.trim().length !== 0;
  };

  return (
    <div className="flex flex-col space-y-3 max-w-md mx-auto bg-gray-100 p-5 rounded-lg">
      {!props.albumCreated.length ? (
        <>
          <TextField
            value={title}
            label="Nom de l'album"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setTitle(e.target.value)}
            variant="outlined"
            size="small"
            className="w-full"
          />
          <TextField
            value={coverUrl}
            label="URL de l'image"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setCoverUrl(e.target.value)}
            variant="outlined"
            size="small"
            className="w-full"
          />
          <TextField
            value={position}
            label="Position par défaut"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setPosition(e.target.value)}
            variant="outlined"
            size="small"
            className="w-full"
          />
          <Button
            disabled={!albumIsValid()}
            onClick={() =>
              props.setAlbumCreated([
                {
                  id: 5,
                  coverUrl,
                  title,
                  position: 5,
                },
              ])
            }
          >
            Créer l'album
          </Button>
        </>
      ) : (
        <Album
          albumInfos={{
            coverUrl,
            title,
          }}
        />
      )}
    </div>
  );
};
