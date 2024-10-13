import { useState } from "react";
import { motion } from "framer-motion";
import { TitleComponent } from "./title.component";
import { AlbumInfos } from "../interfaces/album-infos.interface";

interface AlbumCardProps {
  albumInfos: AlbumInfos;
  updateItem?: (itemUpdated: AlbumInfos) => void;
}

export const Album = (props: AlbumCardProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  const updateTitle = (newTitle: string) => {
    const itemUpdated = { ...props.albumInfos };
    itemUpdated.title = newTitle;
    if (props.updateItem) {
      props.updateItem(itemUpdated);
    }
  };

  return (
    <motion.div
      className="max-w-xs mx-auto bg-white rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl m-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={props.albumInfos.coverUrl}
          alt={props.albumInfos.title}
          className="w-full h-64 object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300"
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>
      </div>
      <div className="px-6 py-4">
        <motion.h3
          className="text-xl font-semibold text-gray-800 text-center"
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {props.updateItem && props.albumInfos.id && (
            <TitleComponent
              id={props.albumInfos.id}
              title={props.albumInfos.title}
              setValue={updateTitle}
            />
          )}
        </motion.h3>
      </div>
    </motion.div>
  );
};
