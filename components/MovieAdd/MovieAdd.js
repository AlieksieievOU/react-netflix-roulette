"use client"
import { useRouter } from 'next/navigation'
import styles from './MovieAdd.module.scss';
//import {useNavigate} from "react-router-dom";
//import {SearchContext} from "../../pages/MovieListPage/MovieListPage";

const MovieAdd = () => {
   // const navigate = useNavigate();
  //  const searchContextValues = useContext(SearchContext);
    const router = useRouter();
    const handleClick = () => {
        // const queryParams = new URLSearchParams(window.location.search);
        // let url = `/new`;
        //
        // if (queryParams.toString() !== '') {
        //     url = `/new` + "?" + queryParams.toString();
        // }
        //
        // searchContextValues.onSetActiveComponent('movie-form');
        // searchContextValues.onSetAction('add');
        // searchContextValues.onSetShowModal(true);

      //  navigate(url);

        router.push('movie/new')
    };

    return (
        <div data-testid="add-movie" className={styles.MovieAddWrapper} onClick={() => handleClick()}>+ add movie</div>
    );
};

export default MovieAdd;
