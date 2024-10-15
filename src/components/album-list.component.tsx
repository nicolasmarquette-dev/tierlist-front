import "./album-list.styles.css";
import { AlbumInfos } from "../interfaces/album-infos.interface";
import { Album } from "./album.component";
import { useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { CreateAlbum } from "./create-album/create-album.component";

interface AlbumListProps {
  items: AlbumInfos[];
  setItems: (items: AlbumInfos[]) => void;
}

export const AlbumList = (props: AlbumListProps): JSX.Element => {
  //const [items, setItems] = useState<AlbumInfos[]>(props.items);
  const [albumCreated, setAlbumCreated] = useState<AlbumInfos[]>([]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (
      result.source.droppableId === "create" &&
      result.destination.droppableId === "list"
    ) {
      const newItem = albumCreated[0];
      const newItems = Array.from(props.items);
      setAlbumCreated([]);
      newItems.splice(result.destination.index, 0, {
        ...newItem,
        position: result.destination.index + 1,
      });
      const positionUpdated = newItems.map((item, index) => ({
        ...item,
        position: index + 1,
      }));

      props.setItems(positionUpdated);
    } else if (
      result.source.droppableId === "list" &&
      result.destination.droppableId === "list"
    ) {
      const newItems = Array.from(props.items);
      const [reorderedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, reorderedItem);
      const positionUpdated = newItems.map((item, index) => {
        return { ...item, position: index + 1 };
      });
      props.setItems(positionUpdated);
    }
  };

  const updateItem = (itemUpdated: AlbumInfos): void => {
    const itemsCopy = [...props.items].map((item) =>
      itemUpdated.id === item.id ? itemUpdated : item
    );
    props.setItems(itemsCopy);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg ">
        <h1 className="text-2xl font-bold mb-4">TierList</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="create">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Draggable
                  key={"created"}
                  draggableId={`created`}
                  index={0}
                  isDragDisabled={!albumCreated.length}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CreateAlbum
                        setAlbumCreated={setAlbumCreated}
                        albumCreated={albumCreated}
                      />
                    </div>
                  )}
                </Draggable>
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
          <StrictModeDroppable droppableId="list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {props.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h1>TOP {item.position}</h1>
                        <Album albumInfos={item} updateItem={updateItem} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </div>
    </div>
  );
};
