// tslint:disable: variable-name

import { ITEMS } from "../utils/constants";
const STARTING_COORDS = {
  x: 69449.953125,
  y: -26285.0,
  z: -5968.092285,
};

interface IIncomingInventory {
  id: string;
  quantity: number;
  mag: number;
}

interface ISaveData {
  health: number;
  hunger: number;
  thirst: number;
  x_pos: number;
  y_pos: number;
  z_pos: number;
  inventory: IIncomingInventory[];
}

class SaveData {
  public readonly health: number = 1;
  public readonly hunger: number = 0;
  public readonly thirst: number = 0;
  public readonly x_pos: number = STARTING_COORDS.x;
  public readonly y_pos: number = STARTING_COORDS.y;
  public readonly z_pos: number = STARTING_COORDS.z;
  public readonly inventory: (IIncomingInventory | undefined)[];
  constructor({
    health,
    hunger,
    thirst,
    x_pos,
    y_pos,
    z_pos,
    inventory,
  }: ISaveData) {
    /**
     * Save state transactions are **super fragile**
     * Instead of dropping a malformed payload, massage into
     * default values.
     * This *probably* won't be abused, since the default values are shite
     * ex: 0 money, 0 items, 0 food and water.
     * No one would want this.
     */
    this.health = health;
    this.hunger = hunger;
    this.thirst = thirst;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.z_pos = z_pos;

    this.inventory = inventory
      .map((item) => {
        if (item.quantity > 0 && item.id && ITEMS.has(item.id)) {
          return item;
        }
      })
      .filter(Boolean);
  }
}

export default SaveData;
export { IIncomingInventory };