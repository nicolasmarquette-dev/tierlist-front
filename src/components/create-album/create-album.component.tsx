import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Album } from "../album.component";

interface CreateAlbumProps {
  setAlbumCreated: (created: boolean) => void;
  albumCreated: boolean;
}

export const CreateAlbum = (props: CreateAlbumProps) => {
  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [position, setPosition] = useState("");

  const albumIsValid = (): boolean => {
    return title.trim().length !== 0 && coverUrl.trim().length !== 0;
  };

  return (
    <div className="flex flex-col space-y-3 max-w-md mx-auto bg-gray-100 p-5 rounded-lg">
      {!props.albumCreated ? (
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
            onClick={() => props.setAlbumCreated(true)}
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
