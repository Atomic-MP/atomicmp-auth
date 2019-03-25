import Currency from "./Currency";

// tslint:disable: variable-name
// tslint:disable-next-line: interface-name

interface IUser {
  user_id: number;
  username: string;
  role: number;
  faction: number;
  health: number;
  hunger: number;
  thirst: number;
  head: number;
  hair: number;
  hair_color: number;
  is_male: boolean;
  nickname: string;
  x_pos: number;
  y_pos: number;
  z_pos: number;
  inventory: any[];
  hash: Buffer;
}
class User {
  public readonly user_id: number;
  public readonly username: string;
  public readonly role: number;
  public readonly faction: number;
  public readonly health: number;
  public readonly hunger: number;
  public readonly thirst: number;
  public readonly head: number;
  public readonly hair: number;
  public readonly hair_color: number;
  public readonly is_male: boolean;
  public readonly nickname: string;
  public readonly x_pos: number;
  public readonly y_pos: number;
  public readonly z_pos: number;
  public inventory: any[];
  public hash: Buffer;

  constructor(obj: IUser) {
    this.user_id = obj.user_id;
    this.username = obj.username;
    this.role = obj.role;
    this.faction = obj.faction;
    this.health = obj.health;
    this.hunger = obj.hunger;
    this.thirst = obj.thirst;
    this.head = obj.head;
    this.hair = obj.hair;
    this.hair_color = obj.hair_color;
    this.is_male = obj.is_male;
    this.nickname = obj.nickname;
    this.x_pos = obj.x_pos;
    this.y_pos = obj.y_pos;
    this.z_pos = obj.z_pos;
    this.inventory = obj.inventory;
    this.hash = obj.hash;
  }
  public getMoney(): number {
    const heldCurrencies = this.inventory.filter((item) => item instanceof Currency);
    return 0;
  }
}
export default User;
