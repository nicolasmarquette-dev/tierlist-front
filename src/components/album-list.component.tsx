import "./album-list.styles.css";
import { AlbumInfos } from "../interfaces/album-infos.interface";
import { Album } from "./album.component";
import { useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";

const list: AlbumInfos[] = [
  {
    id: 1,
    coverUrl:
      "https://cdns-images.dzcdn.net/images/cover/79ba3cd515942d1dc62f49f859a374fd/0x1900-000000-80-0-0.jpg",
    title: "Ipseité - Damso",
    position: 1,
  },
  {
    id: 2,
    coverUrl:
      "https://davycroket.com/wp-content/uploads/nekfeu-cover-feu-album-.jpg",
    title: "Feu - Nekfeu",
    position: 2,
  },
  {
    id: 3,
    coverUrl:
      "https://cdns-images.dzcdn.net/images/cover/d4fbedfce6a2f4b492878e8b3ba7c04d/500x500.jpg",
    title: "Ocho - SDM",
    position: 3,
  },
  {
    id: 4,
    coverUrl:
      "https://www.radiofrance.fr/s3/cruiser-production/2020/11/4409d2c3-4f58-44de-ad64-b86d11c88b66/860_jul-cover-1.jpg",
    title: "Loin du monde - JUL",
    position: 4,
  },
];

export const AlbumList = (): JSX.Element => {
  const [items, setItems] = useState<AlbumInfos[]>(list);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    const positionUpdated = newItems.map((item, index) => {
      return { ...item, position: index + 1 };
    });
    setItems(positionUpdated);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg ">
        <h1 className="text-2xl font-bold mb-4">Exemple de Drag and Drop</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable droppableId="list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
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
                        <h1>{item.position}</h1>
                        <Album imageUrl={item.coverUrl} title={item.title} />
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
