import { useState } from "react";
import "./App.css";
import "./assets/cover.jpg";
import { AlbumList } from "./components/album-list.component";
import { AlbumInfos } from "./interfaces/album-infos.interface";

const list: AlbumInfos[] = [
  {
    coverUrl:
      "https://cdns-images.dzcdn.net/images/cover/79ba3cd515942d1dc62f49f859a374fd/0x1900-000000-80-0-0.jpg",
    title: "Ipseité - Damso",
    position: 1,
  },
  {
    coverUrl:
      "https://davycroket.com/wp-content/uploads/nekfeu-cover-feu-album-.jpg",
    title: "Feu - Nekfeu",
    position: 2,
  },
  {
    coverUrl:
      "https://cdns-images.dzcdn.net/images/cover/d4fbedfce6a2f4b492878e8b3ba7c04d/500x500.jpg",
    title: "Ocho - SDM",
    position: 3,
  },
  {
    coverUrl:
      "https://www.radiofrance.fr/s3/cruiser-production/2020/11/4409d2c3-4f58-44de-ad64-b86d11c88b66/860_jul-cover-1.jpg",
    title: "Loin du monde - JUL",
    position: 4,
  },
];

function App() {
  const [albumInfosList, setAlbumInfosList] = useState<AlbumInfos[]>(list);

  const swapPositions = (
    firstPosition: number,
    secondPosition: number
  ): void => {
    // Vérifiez que les indices sont valides
    if (
      firstPosition < 0 ||
      firstPosition >= list.length ||
      secondPosition < 0 ||
      secondPosition >= list.length
    ) {
      console.error("Indices invalides");
      return;
    }
    const tempList = [...albumInfosList];
    // Échange des positions
    const temp = tempList[firstPosition].position;
    tempList[firstPosition].position = tempList[secondPosition].position;
    tempList[secondPosition].position = temp;
    setAlbumInfosList(tempList);
  };

  return (
    <div>
      <button onClick={() => swapPositions(0, 1)}>Changer</button>
      <AlbumList albumInfosList={albumInfosList} />
    </div>
  );
}

export default App;
