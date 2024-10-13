import "./title.styles.css";
import { IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Check from "@mui/icons-material/Check"; // Import par défaut
import Edit from "@mui/icons-material/Edit"; // Import par défaut

interface EditComponentProps {
  id: number;
  title: string;
  setValue: (title: string) => void;
}

export const TitleComponent = (props: EditComponentProps): JSX.Element => {
  const [editMode, setEditMode] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState(props.title);

  return (
    <div className="flex items-center justify-center space-x-2">
      {!editMode ? (
        <>
          <span className="text-lg font-semibold">{props.title}</span>{" "}
          <IconButton
            onClick={() => setEditMode(true)}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all duration-200"
            aria-label="edit"
            size="small"
          >
            <Edit className="w-4 h-4" />
          </IconButton>
        </>
      ) : (
        <>
          <TextField
            value={textFieldValue}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setTextFieldValue(e.target.value)}
            variant="outlined"
            size="small"
            className="flex-grow"
          />
          <IconButton
            onClick={() => {
              props.setValue(textFieldValue);
              setEditMode(false);
            }}
            color="primary"
            aria-label="validate"
          >
            <Check />
          </IconButton>
        </>
      )}
    </div>
  );
};
