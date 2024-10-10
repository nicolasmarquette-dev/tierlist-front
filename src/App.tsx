import "./App.css";
import "./assets/cover.jpg";
import { AlbumList } from "./components/album-list.component";
function App() {
  const list = [
    {
      coverUrl:
        "https://cdns-images.dzcdn.net/images/cover/79ba3cd515942d1dc62f49f859a374fd/0x1900-000000-80-0-0.jpg",
      title: "Ipseité - Damso",
    },
    {
      coverUrl:
        "https://cdns-images.dzcdn.net/images/cover/79ba3cd515942d1dc62f49f859a374fd/0x1900-000000-80-0-0.jpg",
      title: "Ipseité - Damso",
    },
    {
      coverUrl:
        "https://cdns-images.dzcdn.net/images/cover/79ba3cd515942d1dc62f49f859a374fd/0x1900-000000-80-0-0.jpg",
      title: "Ipseité - Damso",
    },
    {
      coverUrl:
        "https://cdns-images.dzcdn.net/images/cover/79ba3cd515942d1dc62f49f859a374fd/0x1900-000000-80-0-0.jpg",
      title: "Ipseité - Damso",
    },
  ];

  return (
    <div>
      <AlbumList albumInfosList={list} />
    </div>
  );
}

export default App;
