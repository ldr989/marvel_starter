import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import AppBanner from "../appBanner/AppBanner";
import "./singleItemPage.scss";

const SingleComicPage = (prop) => {
    const { whatItem } = prop;
    const { comicId, charId } = useParams();

    const [item, setItem] = useState(null);
    const { loading, error, clearError, getComic, getCharacter } =
        useMarvelService();

    const itemId = whatItem === "comic" ? comicId : charId;
    const getItemFunc = whatItem === "comic" ? getComic : getCharacter;

    useEffect(() => {
        updateItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemId]);

    const updateItem = () => {
        clearError();
        getItemFunc(itemId, false).then(onItemLoaded);
    };

    const onItemLoaded = (item) => {
        setItem(item);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner width={200} height={200} /> : null;
    const shownItem =
        whatItem === "comic" ? (
            <ViewComic item={item} />
        ) : (
            <ViewChar item={item} />
        );
    const content = !(loading || error || !item) ? shownItem : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

const ViewComic = ({ item }) => {
    const { title, description, pageCount, thumbnail, language, price } = item;

    return (
        <div className="single-item">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-item__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
};

const ViewChar = ({ item }) => {
    const { name, description, thumbnail } = item;

    return (
        <div className="single-item">
            <img src={thumbnail} alt={name} className="single-char__img" />
            <div className="single-item__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
        </div>
    );
};

export default SingleComicPage;
