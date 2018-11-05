import { observable } from "mobx";
import {fromPromise, IPromiseBasedObservable} from "mobx-utils";
import { fetchPokemon } from "../types/api";
import { Pokemon } from "../types/pokemon";
import {RootStore} from "./rootStore";

export class PokemonStore {
  private readonly rootStore: RootStore;

  // Is it Pokemon or Pokemons?
  @observable private pokemons: Map<string, IPromiseBasedObservable<Pokemon>>;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.pokemons = new Map();
  }

  public setup() {
    // Do something
  }

  public getPokemon(id: string): IPromiseBasedObservable<Pokemon> {
    const existingPokemon = this.pokemons.get(id);
    if (existingPokemon) {
      return existingPokemon;
    }

    const promise = fromPromise(this.fetchPokemon(id));
    this.pokemons.set(id, promise);

    return promise;
  }

  public dispose() {
    this.pokemons.clear();
  }

  private async fetchPokemon(id: string) {
    try {
      const json = await fetchPokemon(id);
      const pokemon = new Pokemon(json);


      return pokemon;
    } catch (e) {
      throw e;
    }
  }
}
