import './App.css';
import Counter from './Components/Counter/Counter';
import SearchForm from './Components/SearchForm/SearchForm';
import GenreSelector from './Components/GenreSelector/GenreSelector';
import { GenreListArray } from './data';

function App() {

  const onSearch = function (input) {
    console.log(input);
  }

  const onSelectGenre = function (genre) {
    console.log(genre)
  }

  return (
    <div className="App">
      <Counter initialValue={0} />
      <SearchForm onSearch={onSearch} searchQuery='crime' />
      <GenreSelector defaultSelectedGenre={0}  genreList={GenreListArray} onSelectGenre={onSelectGenre}  />
    </div>
  );
}

export default App;