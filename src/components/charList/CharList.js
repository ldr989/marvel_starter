import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
// import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";
// import abyss from "../../resources/img/abyss.jpg";

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        this.setState({ loading: false });
    }

    onCharLoaded = (chars) => {
        this.setState({ chars, loading: false });
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    updateChar = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    render() {
        const { chars, loading } = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    <ViewChars chars={chars} num={0} loading={loading} />
                    <ViewChars chars={chars} num={1} loading={loading} />
                    <ViewChars chars={chars} num={2} loading={loading} />
                    <ViewChars chars={chars} num={3} loading={loading} />
                    <ViewChars chars={chars} num={4} loading={loading} />
                    <ViewChars chars={chars} num={5} loading={loading} />
                    <ViewChars chars={chars} num={6} loading={loading} />
                    <ViewChars chars={chars} num={7} loading={loading} />
                    <ViewChars chars={chars} num={8} loading={loading} />
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}
const ViewChars = ({ chars, num }) => {
    if (chars.length > 0) {
        return (
            <li className="char__item">
                <img
                    src={chars[num].thumbnail}
                    style={
                        chars[num].thumbnail ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                            ? { objectFit: "contain" }
                            : { objectFit: "cover" }
                    }
                    alt={chars[num].name}
                />
                <div className="char__name">{chars[num].name}</div>
            </li>
        );
    } else {
        return (
            <li
                className="char__item"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Spinner />
            </li>
        );
    }
};

export default CharList;
