interface IProps {
  name: string;
}

export class PokemonType {
  public name: string;

  constructor({ name }: IProps) {
    this.name = name;
  }

  public getName() {
    if(!this.name) {
      return '';
    }

    return this.name.charAt(0).toUpperCase() + this.name.slice(1);
  }
}
