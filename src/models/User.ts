
// tslint:disable: variable-name
// tslint:disable-next-line: interface-name

interface User {
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

export default User;
