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
        const { chars } = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    <ViewChars chars={chars} />
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}
const ViewChars = ({ chars }) => {
    function cloneEmptyWrapper(num) {
        let result = [];
        for (let i = 0; i < num; i++) {
            result.push(
                <li
                    className="char__item"
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    key={i}
                >
                    <Spinner />
                </li>
            );
        }
        return result;
    }

    if (chars.length > 0) {
        const stub =
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

        return chars.map((char, i) => {
            return (
                <li className="char__item" key={i}>
                    <img
                        src={char.thumbnail}
                        style={
                            char.thumbnail === stub
                                ? { objectFit: "contain" }
                                : { objectFit: "cover" }
                        }
                        alt={char.name}
                    />
                    <div className="char__name">{char.name}</div>
                </li>
            );
        });
    } else {
        return <>{cloneEmptyWrapper(9)}</>;
    }
};

export default CharList;
