import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Album } from "../album.component";
import { AlbumInfos } from "../../interfaces/album-infos.interface";

interface CreateAlbumProps {
  setAlbumCreated: (created: AlbumInfos[]) => void;
  albumCreated: AlbumInfos[];
  listId: number;
  items: AlbumInfos[];
}

export const CreateAlbum = (props: CreateAlbumProps) => {
  const [title, setTitle] = useState("");
  const [coverURL, setCoverUrl] = useState("");
  const [position, setPosition] = useState(-1);

  useEffect(() => {
    if (props.albumCreated.length === 0) {
      setTitle("");
      setCoverUrl("");
      setPosition(props.items?.length + 1);
    }
  }, [props.albumCreated]);

  const albumIsValid = (): boolean => {
    return title.trim().length !== 0 && coverURL.trim().length !== 0;
  };

  const handleAlbumCreation = async () => {
    const token = localStorage.getItem("token");
    const album = {
      title,
      coverURL,
      position,
    };

    const response = await fetch(
      `http://localhost:8080/v1/api/lists/${props.listId}/item`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(album),
      }
    );

    props.setAlbumCreated([
      {
        coverURL,
        title,
        position,
      },
    ]);
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
            value={coverURL}
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
            ) => setPosition(e.target.value as unknown as number)}
            variant="outlined"
            size="small"
            className="w-full"
          />
          <Button
            disabled={!albumIsValid()}
            onClick={() => handleAlbumCreation()}
          >
            Créer l'album
          </Button>
        </>
      ) : (
        <Album
          albumInfos={{
            coverURL,
            title,
            position,
          }}
        />
      )}
    </div>
  );
};
