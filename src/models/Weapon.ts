// tslint:disable: variable-name
import Item from "./Item";

/**
 * @class Weapon
 */
class Weapon extends Item {
  public readonly WeaponActorClass: string;
  public readonly WeaponType: string;
  public readonly AmmoType: string;
  public readonly AimedFOV: number;
  public readonly ZoomedFOV: number;
  public readonly "ZRecoilMIn/Max": [number, number];
  public readonly "YRecoilMin/Max": [number, number];
  public readonly "Up/DownSpreadMin": [number, number];
  public readonly "Right/LeftSpreadMin": [number, number];
  public readonly "AimedUp/DownSpread": [number, number];
  public readonly "AimedRight/LeftSpread": [number, number];
  public readonly DefaultMagFull: number;
  public readonly MagAmount: number;
  constructor(item: any) {
    super(item);
    this.WeaponActorClass = item.WeaponActorClass;
    this.WeaponType = item.WeaponType;
    this.AmmoType = item.AmmoType;
    this.AimedFOV = item.AimedFOV;
    this.ZoomedFOV = item.ZoomedFOV;
    this["ZRecoilMIn/Max"] = item["ZRecoilMIn/Max"];
    this["YRecoilMin/Max"] = item["YRecoilMin/Max"];
    this["Up/DownSpreadMin"] = item["Up/DownSpreadMin"];
    this["Right/LeftSpreadMin"] = item["Right/LeftSpreadMin"];
    this["AimedUp/DownSpread"] = item["AimedUp/DownSpread"];
    this["AimedRight/LeftSpread"] = item["AimedRight/LeftSpread"];
    this.DefaultMagFull = item.DefaultMagFull;
    this.MagAmount = item.MagAmount;
  }
}

export default Weapon;
