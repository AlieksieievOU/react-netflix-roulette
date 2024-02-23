import './App.css';
import { Counter } from './Components/Counter/Counter';
import { SearchForm } from './Components/SearchForm/SearchForm';
import { GenreSelector } from './Components/GenreSelector/GenreSelector'

function App() {

  const onSearch = function (input) {
    console.log(input);
  }

  const onSelectGenre = function (genre) {
    console.log(genre)
  }

  const genreList = [
    { id: 0, name: 'all' },
    { id: 1, name: 'documentary' },
    { id: 2, name: 'comedy' },
    { id: 3, name: 'horror' },
    { id: 4, name: 'crime' }
  ]

  return (
    <div className="App">
      <Counter initialValue={0} />
      <SearchForm onSearch={onSearch} searchQuery='crime' />
      <GenreSelector selectedGenre={0}  genreList={genreList} onSelectGenre={onSelectGenre}  />
    </div>
  );
}

export default App;