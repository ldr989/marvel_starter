/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";
import useMarvelService from "../services/MarvelService";

export const useGetList = (numOfLoadedItems, type = "char") => {
    const [list, setList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(type === "comics" ? 0 : 210);
    const [listEnded, setListEnded] = useState(false);

    const { loading, error, getAllComics, getAllCharacters } =
        useMarvelService();

    const onRequest = useCallback((offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        if (type === "comics") {
            getAllComics(offset).then(onComicsListLoaded);
        } else {
            getAllCharacters(offset).then(onComicsListLoaded);
        }
    }, []);

    const onComicsListLoaded = useCallback((newList) => {
        let ended = false;
        if (newList.length < numOfLoadedItems) {
            ended = true;
        }

        setList((list) => [...list, ...newList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + numOfLoadedItems);
        setListEnded(ended);
    }, []);

    return {
        list,
        newItemLoading,
        offset,
        listEnded,
        loading,
        error,
        onRequest,
    };
};
