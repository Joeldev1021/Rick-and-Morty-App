import ListCharacters from "../listCharacteres/ListCharacters";
import useFetch from "../../hooks/useFetch";
import "./character.css";
import Loading from "../loadingSpiner/Loading";

import { useEffect, useRef, useState } from "react";
import useNearScreen from "../../hooks/useNearScreen";

const URL = "https://rickandmortyapi.com/api/character?page=";

const Character = ({ handleFavs, likes }) => {
    const [page, setPage] = useState(1);
    const element = useRef(null);
    const { characters, isLoading } = useFetch(`${URL}${page}`);
    const { entries } = useNearScreen(element);
    const [charactersResult, setCharactersResult] = useState([]);
    const auxArr = [];

    useEffect(() => {
        if (entries.isIntersecting) {
            setPage(page + 1);
        }
    }, [entries.isIntersecting]);

    useEffect(() => {
        if (characters.results) {
            characters.results.map(item => auxArr.push(item));
            setCharactersResult([...charactersResult, ...auxArr]);
        }
    }, [characters]);

    return (
        <>
            {
                !charactersResult.length > 0
                    ? (<div className="container-loading">
                        <Loading />
                    </div>)
                    : (<div className="container">
                        <ListCharacters likes={likes} characters={charactersResult} handleFavs={handleFavs}/>
                    </div>)
            }
            {
                isLoading && <Loading />
            }
            <div ref={element}></div>
        </>
    );
};

export default Character;
