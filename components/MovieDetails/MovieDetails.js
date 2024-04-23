"use client"
import styles from './MovieDetails.module.scss';
import Logo from "../Logo/Logo";
import SearchButton from "../SearchButton/SearchButton";
import Image from "next/image";
import  {useState} from "react";

export default function MovieDetails(props) {
    // let selectedMovie = {
    //     name: "",
    //     releaseYear: "",
    //     imdbRating: "",
    //     genres: "",
    //     duration: "",
    //     description: "",
    //     imageUrl: ""
    // };



    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);
  //  const navigate = useNavigate();
  //   const controllerRef = useRef(null);
  //

    // const fetchMovie = useCallback(async (props.movieId) => {
    //
    //     const url = `http://localhost:4000/movies/${movieId}`;
    //
    //     controllerRef.current?.abort();
    //     setIsLoading(true);
    //     const newController = new AbortController();
    //     controllerRef.current = newController;
    //     const signal = newController.signal;
    //
    //     signal.addEventListener("abort", () => {
    //         console.log("aborted!")
    //     });
    //
    //     try {
    //         const response = await fetch(url, {
    //             signal,
    //         });
    //
    //         const data = await response.json();
    //         setSelectedMovie({
    //             title: data?.title,
    //             release_date: data?.release_date.split('-')[0],
    //             vote_average: data?.vote_average,
    //             genres: data?.genres.join(', '),
    //             runtime: data?.runtime,
    //             overview: data?.overview,
    //             poster_path: data?.poster_path
    //         });
    //
    //     } catch (e) {
    //         setError(e.message);
    //     } finally {
    //         setIsLoading(false);
    //         controllerRef.current = null;
    //     }
    // }, []);

    const searchButtonClick = () => {
    //    navigate('/');
    };

   // let { movieId } = useParams();

    // useEffect(() => {
    //     fetchMovie(movieId);
    // }, [movieId]);



    const selectedMovie = props.selectedMovie;
    const [src, setSrc] = useState("" + selectedMovie?.poster_path);

    return (
        <header className={styles.movieHeader}>
            <div className={styles.topWrapper}>
                <Logo/>
                <SearchButton/>
            </div>

            <div data-testid="movie-details" className={styles.movieInfoPanel}>
                <div className={styles.movieInfoImg}>
                    <Image priority={1} className={'img'}  data-testid="imgPoster" quality={75} width={0} height={0} style={{width: "319px", height: "auto" }} src={src} alt={selectedMovie?.title} unoptimized={true}
                           onError={() => setSrc('https://placehold.co/319x450')}/>
                </div>
                <div>
                    <div className={styles.nameRow}><span>{selectedMovie?.title}</span> <span>{selectedMovie?.vote_average}</span>
                    </div>
                    <div className={styles.genres}>{selectedMovie?.genres}</div>
                    <div className={styles.releaseDurationRow}>
                        <span>{selectedMovie?.release_date}</span>
                        <span>{selectedMovie?.runtime + ' min'}</span>
                    </div>
                    <div className={styles.description}>{selectedMovie?.overview}</div>
                </div>
            </div>
        </header>
    );
}

