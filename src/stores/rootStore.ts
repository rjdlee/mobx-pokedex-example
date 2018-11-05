import { PokemonStore } from "./pokemonStore";

export class RootStore {
  public readonly pokemonStore: PokemonStore;

  constructor() {
    this.pokemonStore = new PokemonStore(this);
  }

  public setup() {
    this.pokemonStore.setup();
  }

  public dispose() {
    this.pokemonStore.dispose();
  }
}
