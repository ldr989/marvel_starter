import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";

import "./CharFind.scss";

const CharFind = () => {
    const [char, setChar] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const { loading, error, clearError, getCharacterByName } =
        useMarvelService();

    const onCharLoaded = (char) => {
        if (char.length === 0) {
            setNotFound(true);
        }
        setChar(char);
    };

    const updateChar = (charName) => {
        setNotFound(false);
        clearError();
        getCharacterByName(charName).then(onCharLoaded);
    };

    const errorMsg =
        error || notFound ? (
            <div className="error">
                The character was not found. Check the name and try again
            </div>
        ) : null;
    const spinner = loading ? (
        <div className="spinnerWrapper">
            <Spinner width={30} height={30} />
        </div>
    ) : null;
    const content = !(loading || error || !char.length) ? (
        <SuccessBlock char={char[0]} />
    ) : null;

    const handleSubmit = (values) => {
        updateChar(values.charName);
        document.activeElement.blur(); // Снять фокус с поля ввода
    };

    const compareValues = (e) => {
        if (char.length > 0 && e.target.value.length !== char[0].name.length) {
            setChar([]);
        }
    };

    return (
        <Formik
            initialValues={{ charName: "" }}
            validationSchema={Yup.object({
                charName: Yup.string()
                    .min(2, "Minimum 2 characters")
                    .required("This field is required"),
            })}
            onSubmit={handleSubmit}
        >
            <Form className="charFind">
                <div className="charFind__text">
                    Or find a character by name:
                </div>
                <Field
                    id="charName"
                    name="charName"
                    type="text"
                    placeholder="Enter name"
                    onFocus={(e) => {
                        if (notFound) {
                            setNotFound(false);
                        }
                        compareValues(e);
                    }}
                    onBlur={(e) => {
                        compareValues(e);
                    }}
                />
                <button type="submit" className="button button__main">
                    <div className="inner">FIND</div>
                </button>
                {errorMsg}
                {spinner}
                {content}
                <ErrorMessage
                    className="error"
                    name="charName"
                    component="div"
                />
            </Form>
        </Formik>
    );
};

const SuccessBlock = (props) => {
    return (
        <div className="successBlock">
            <div className="success">
                There is! Visit {props.char.name} page?
            </div>
            <Link
                to={`/${props.char.id}`}
                type="button"
                className="button button__secondary"
            >
                <div className="inner">TO PAGE</div>
            </Link>
        </div>
    );
};

export default CharFind;
