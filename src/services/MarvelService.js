import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = process.env.REACT_APP_API_KEY;
    const _baseOffset = 210;
    const _comicsOffset = 0;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`
        );
        return res.data.results.map(_transformCharacter);
    };

    const getAllComics = async (offset = _comicsOffset) => {
        const res = await request(
            `${_apiBase}comics?limit=8&offset=${offset}&apikey=${_apiKey}`
        );
        return res.data.results.map(_transformComics);
    };

    const getCharacter = async (id) => {
        const res = await request(
            `${_apiBase}characters/${id}?apikey=${_apiKey}`
        );

        return _transformCharacter(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description
                ? `${char.description.slice(0, 200)}...`
                : "There is no description for this character",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        };
    };
    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            prices: comics.prices[0].price
                ? comics.prices[0].price + "$"
                : "NOT AVAILABLE",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            urls: comics.urls.url,
        };
    };

    return {
        loading,
        error,
        clearError,
        getAllCharacters,
        getCharacter,
        getAllComics,
    };
};

export default useMarvelService;
