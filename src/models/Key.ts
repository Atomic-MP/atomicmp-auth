// tslint:disable: variable-name

class Key {
  public key_id: string;
  public key: string;
  public owner: string;
  public generator_discord_id: string;
  public discord_id: string;

  constructor(obj) {
    Object.assign(this, obj)
  }

}

export default Key;
