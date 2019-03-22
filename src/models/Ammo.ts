import Item from "./Item";

/**
 * @class Ammo
 */
class Ammo extends Item {
  public readonly AmmoType: string;

  constructor(item) {
    super(item);
    this.AmmoType = item.AmmoType;
  }
}

export default Ammo;
