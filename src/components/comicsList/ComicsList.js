/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useGetList } from "../../hooks/getList.hook";

import "./comicsList.scss";

const ComicsList = () => {
    const {
        list,
        newItemLoading,
        offset,
        listEnded,
        loading,
        error,
        onRequest,
    } = useGetList(8, "comics");

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            // let imgStyle = { objectFit: "cover" };
            // if (
            //     item.thumbnail ===
            //     "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            // ) {
            //     imgStyle = { objectFit: "unset" };
            // }

            return (
                <li className="comics__item" key={i}>
                    <a href="#">
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="comics__item-img"
                        />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices}</div>
                    </a>
                </li>
            );
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return <ul className="comics__grid">{items}</ul>;
    }

    const items = renderItems(list);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: listEnded ? "none" : "block" }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
