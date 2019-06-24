import faker from "faker";
import User from "../../models/User";

export default function(args?: Partial<IUser>) {
  const defaults: any = {
    created_at: faker.date.past(),
    discord_id: faker.random.word(),
    faction: faker.random.number(),
    getMoney: () => {/** */ },
    hair: faker.random.number(),
    hair_color: faker.random.number(),
    head: faker.random.number(),
    health: faker.random.number(),
    hunger: faker.random.number(),
    insecureData: () => {/** */ },
    inventory: [],
    is_male: faker.random.boolean(),
    last_seen: faker.date.past(),
    nickname: faker.name.firstName(),
    role: faker.random.number(),
    rotation: faker.random.number(360),
    secureData: () => {/** */ },
    thirst: faker.random.number(),
    user_id: faker.random.number(),
    username: faker.name.firstName(),
    x_pos: faker.random.number(),
    y_pos: faker.random.number(),
    z_pos: faker.random.number(),
  };

  const config = Object.assign(defaults, args);

  return new User(config);
}
