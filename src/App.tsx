import "./App.css";
import "./assets/cover.jpg";
import { AlbumList } from "./components/album-list.component";
import { CreateAlbum } from "./components/create-album/create-album.component";

function App() {
  return (
    <div>
      <CreateAlbum />
      <AlbumList />
    </div>
  );
}

export default App;
