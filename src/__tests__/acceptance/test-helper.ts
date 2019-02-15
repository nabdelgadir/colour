import {ColourApplication} from '../..';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';
import {Pink} from '../../models';

export async function setupApplication(): Promise<AppWithClient> {
  const app = new ColourApplication({
    rest: givenHttpServerConfig(),
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: ColourApplication;
  client: Client;
}

export function givenPink(pink?: Partial<Pink>) {
  const data = Object.assign(
    {
      hue: 'very pink',
    },
    pink,
  );
  return new Pink(data);
}
