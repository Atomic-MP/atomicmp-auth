// tslint:disable: variable-name
import Item from "./Item";

class Consumable extends Item {
  public readonly Health: number = 0;
  public readonly Duration: number = 0;
  public readonly Hunger: number = 0;
  public readonly Thirst: number = 0;
  constructor(item: any) {
    super(item);
    this.Health = item.Health;
    this.Duration = item.Duration;
    this.Hunger = item.Hunger;
    this.Thirst = item.Thirst;
  }
}

export default Consumable;
