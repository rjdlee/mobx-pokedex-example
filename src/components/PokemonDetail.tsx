import debounce from "lodash/debounce";
import {inject, observer} from "mobx-react";
import {IPromiseBasedObservable} from "mobx-utils";
import * as React from "react";
import {RootStore} from "../stores/rootStore";
import {Pokemon} from "../types/pokemon";
import {ErrorDetail} from "./ErrorDetail";
import {Loading} from "./Loading";
import "./PokemonDetail.css";

interface IProps {
  store?: RootStore;
}

interface IState {
  currentPokemon: IPromiseBasedObservable<Pokemon> | null;
}

// Allow our React component to observe our Store's state
@inject(({store}) => ({store}))
@observer
export class PokemonDetail extends React.Component<IProps, IState> {
  public readonly props: IProps;
  public readonly state: IState;

  private debounceHandleIDChange = debounce((id: string) => {
    this.setCurrentPokemon(id);
  }, 500);

  constructor(props: IProps) {
    super(props);

    this.state = {
      currentPokemon: null,
    };
  }

  public componentDidMount() {
    this.setCurrentPokemon('1');
  }

  public render() {
    return (
      <div>
        <div className="pokemon-detail-search">
          <h2>Pokemon Name Or Number</h2>
          <input type="text" onChange={this.handleIDChange} defaultValue="bulbasaur"/>
        </div>
        {this.renderPokemon()}
      </div>
    );
  }

  private renderPokemon() {
    const {currentPokemon} = this.state;
    if (!currentPokemon) {
      return <Loading/>;
    }

    // We can display the promise's current state
    switch (currentPokemon.state) {
      case "pending":
        return <Loading/>;
      case "rejected":
        return <ErrorDetail error={currentPokemon.value}/>;
      case "fulfilled":
        return <div>
          <div className="pokemon-detail-name">
            <h1>{currentPokemon.value.getName()}&nbsp;
              <bdi>#{currentPokemon.value.id}</bdi>
            </h1>
          </div>
          <div className="pokemon-detail-main">
            <img src={currentPokemon.value.getImageURL()} alt="Pokemon Image"/>
            <div className="pokemon-detail-size">
              <h2>Height</h2>
              <p>{currentPokemon.value.height}</p>
              <h2>Weight</h2>
              <p>{currentPokemon.value.weight}</p>
              <h2>Types</h2>
              <div>
                {currentPokemon.value.types.map(t => <div className="pokemon-detail-type"
                                                          key={t.name}>{t.getName()}</div>)}
              </div>
            </div>
          </div>
        </div>;
      default:
        return <Loading/>;
    }
  }

  private handleIDChange = (e) => {
    const id = e.target.value;
    this.debounceHandleIDChange(id);
  };

  private setCurrentPokemon(id: string) {
    if (!this.props.store) {
      return;
    }

    const currentPokemon = this.props.store.pokemonStore.getPokemon(id);
    this.setState({
      currentPokemon,
    });
  }
}