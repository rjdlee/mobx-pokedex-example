import {Provider} from "mobx-react";
import * as React from 'react';
import {RootStore} from "../stores/rootStore";
import './App.css';
import {PokemonDetail} from "./PokemonDetail";

interface IState {
  rootStore: RootStore
}

export class App extends React.Component<{}, IState> {
  public readonly state: IState;

  constructor(props: {}) {
    super(props);

    this.state = {
      rootStore: new RootStore()
    };
  }

  public componentDidMount() {
    this.state.rootStore.setup();
  }

  public componentWillUnmount() {
    this.state.rootStore.dispose();
  }

  public render() {
    return (
      <Provider store={this.state.rootStore}>
        <div className="App">
          <PokemonDetail/>
        </div>
      </Provider>
    );
  }
}
