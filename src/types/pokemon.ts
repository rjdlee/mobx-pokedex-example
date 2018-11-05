import {PokemonType} from "./pokemonType";

interface IProps {
  id: string;
  name: string;
  types?: any;
  height: string;
  weight: string;
}

export class Pokemon {
  public id: string;
  public name: string;
  public types: any;
  public height: string;
  public weight: string;

  constructor({ id, name, types, height, weight }: IProps) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;

    this.types = types.map(t => new PokemonType(t.type));
  }

  public getName() {
    if(!this.name) {
      return '';
    }

    return this.name.charAt(0).toUpperCase() + this.name.slice(1);
  }

  public getImageURL() {
    const name = this.getName();
    return `https://rjdlee.com/projects/dubemon/img/${name}.jpg`
  }
}
