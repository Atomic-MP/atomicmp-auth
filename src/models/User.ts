
  // tslint:disable: variable-name
class User {
  public user_id: number;
  public username: string;
  public role: number;
  public faction: number;
  public health: number;
  public hunger: number;
  public thirst: number;
  public head: number;
  public hair: number;
  public hair_color: number;
  public is_male: boolean;
  public nickname: string;
  public x_pos: number;
  public y_pos: number;
  public z_pos: number;
  public inventory: any[];
  public money: number;
  public hash: Buffer;
  constructor(obj: any) {
    Object.assign(this, obj);
  }
}

export default User;
