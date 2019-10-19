import { currency } from "../utils/constants/items";

// tslint:disable: variable-name
class User {
  public readonly user_id: number;
  public readonly discord_id: string;
  public readonly username: string;
  public readonly role: number;
  public readonly faction?: number;
  public readonly health: number = 100;
  public readonly hunger: number = 0;
  public readonly thirst: number = 0;
  public readonly head: number = 1;
  public readonly hair: number = 1;
  public readonly hair_color: number = 1;
  public readonly is_male: boolean = true;
  public readonly nickname: string;
  public readonly created_at: Date;
  public readonly last_seen: Date;
  public readonly x_pos: number;
  public readonly y_pos: number;
  public readonly z_pos: number;
  public readonly rotation: number;
  public readonly xp: number;
  public inventory: IIncomingInventory[];
  public hash: Buffer;

  constructor(obj: IUser) {
    if (obj.user_id === undefined) {
      throw Error("user_id required");
    }
    this.user_id = obj.user_id;

    if (obj.username === undefined) {
      throw Error("username required");
    }
    this.username = obj.username;

    if (obj.role === undefined) {
      throw Error("role required");
    }
    this.role = obj.role;

    if (obj.faction === undefined) {
      throw Error("faction required");
    }
    this.faction = obj.faction;

    if (obj.health === undefined) {
      throw Error("health required");
    }
    this.health = obj.health;

    if (obj.hunger === undefined) {
      throw Error("hunger required");
    }
    this.hunger = obj.hunger;

    if (obj.thirst === undefined) {
      throw Error("thirst required");
    }
    this.thirst = obj.thirst;

    if (obj.head === undefined) {
      throw Error("head required");
    }
    this.head = obj.head;

    if (obj.hair === undefined) {
      throw Error("hair required");
    }
    this.hair = obj.hair;

    if (obj.hair_color === undefined) {
      throw Error("hair_color required");
    }
    this.hair_color = obj.hair_color;

    this.is_male = (obj.is_male !== undefined) ? obj.is_male : true;

    if (obj.nickname === undefined) {
      throw Error("nickname required");
    }
    this.nickname = obj.nickname;

    if (obj.x_pos === undefined) {
      throw Error("x_pos required");
    }
    this.x_pos = obj.x_pos;
    if (obj.y_pos === undefined) {
      throw Error("y_pos required");
    }
    this.y_pos = obj.y_pos;

    if (obj.z_pos === undefined) {
      throw Error("z_pos required");
    }
    this.z_pos = obj.z_pos;

    if (obj.rotation === undefined) {
      throw Error("rotation required");
    }
    this.rotation = obj.rotation;
    
    if (obj.xp === undefined) {
      throw Error("xp required");
    }
    this.xp = obj.xp;

    if (obj.inventory === undefined) {
      throw Error("inventory required");
    }
      if (obj.xp === undefined) {
      throw Error("xp required");
    }
    this.xp = obj.xp;
    
    this.inventory = obj.inventory;
    if (obj.created_at === undefined) {
      throw Error("created_at required");
    }
    this.created_at = obj.created_at;
    if (obj.last_seen === undefined) {
      throw Error("last_seen required");
    }
    this.last_seen = obj.last_seen;
    if (obj.discord_id === undefined) {
      throw Error("discord_id required");
    }
    this.discord_id = obj.discord_id;
  }
  /**
   * @returns Total value of held Currencies
   */
  public getMoney(): number {
    return this.inventory.reduce((total, item) => {
      const lookup = currency.get(item.id);
      if (lookup) {
        return total += (item.quantity * lookup.Value);
      } else {
        return total;
      }
    }, 0);
  }

  public secureData(): IUserSecureData {
    return {
      ...this.insecureData(),
      health: this.health,
      hunger: this.hunger,
      inventory: this.inventory,
      rotation: this.rotation,
      thirst: this.thirst,
      x_pos: this.x_pos,
      y_pos: this.y_pos,
      z_pos: this.z_pos,
      xp: this.xp,
    };
  }

  public insecureData(): IUserInsecureData {
    return {
      created_at: this.created_at,
      discord_id: this.discord_id,
      faction: this.faction,
      hair: this.hair,
      hair_color: this.hair_color,
      head: this.head,
      is_male: this.is_male,
      last_seen: this.last_seen,
      nickname: this.nickname,
      role: this.role,
      user_id: this.user_id,
      username: this.username,
    };
  }
}
export default User;
