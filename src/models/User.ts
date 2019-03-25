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
  public readonly health: number = 100;
  public readonly hunger: number = 0;
  public readonly thirst: number = 0;
  public readonly head: number = 1;
  public readonly hair: number = 1;
  public readonly hair_color: number = 1;
  public readonly is_male: boolean = true;
  public readonly nickname: string;
  public readonly x_pos: number;
  public readonly y_pos: number;
  public readonly z_pos: number;
  public inventory: any[];
  public hash: Buffer;

  constructor(obj: IUser) {
    if (!obj.user_id) {
      throw Error("user_id required");
    }
    this.user_id = obj.user_id;

    if (!obj.username) {
      throw Error("username required");
    }
    this.username = obj.username;

    if (!obj.role) {
      throw Error("role required");
    }
    this.role = obj.role;

    if (!obj.faction) {
      throw Error("faction required");
    }
    this.faction = obj.faction;

    if (!obj.health) {
      throw Error("health required");
    }
    this.health = obj.health;

    if (!obj.hunger) {
      throw Error("hunger required");
    }
    this.hunger = obj.hunger;

    if (!obj.thirst) {
      throw Error("thirst required");
    }
    this.thirst = obj.thirst;

    if (!obj.head) {
      throw Error("head required");
    }
    this.head = obj.head;

    if (!obj.hair) {
      throw Error("hair required");
    }
    this.hair = obj.hair;

    if (!obj.hair_color) {
      throw Error("hair_color required");
    }
    this.hair_color = obj.hair_color;

    this.is_male = obj.is_male || true;

    if (!obj.nickname) {
      throw Error("nickname required");
    }
    this.nickname = obj.nickname;

    if (!obj.x_pos) {
      throw Error("x_pos required");
    }
    this.x_pos = obj.x_pos;
    if (!obj.y_pos) {
      throw Error("y_pos required");
    }
    this.y_pos = obj.y_pos;

    if (!obj.z_pos) {
      throw Error("z_pos required");
    }
    this.z_pos = obj.z_pos;

    if (!obj.inventory) {
      throw Error("inventory required");
    }
    this.inventory = obj.inventory;
  }
  public getMoney(): number {
    const heldCurrencies = this.inventory.filter((item) => item instanceof Currency);
    return 0;
  }
}
export default User;
export { IUser };
