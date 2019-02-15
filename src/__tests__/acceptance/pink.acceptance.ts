import {
  Client,
  createRestAppClient,
  expect,
  givenHttpServerConfig,
} from '@loopback/testlab';
import {ColourApplication} from '../../application';
// import {Pink} from '../../models';
import {PinkRepository} from '../../repositories';
import {givenPink} from './test-helper';

describe('ColourApplication', () => {
  let app: ColourApplication;
  let client: Client;
  let pinkRepo: PinkRepository;

  before(givenRunningApplicationWithCustomConfiguration);
  after(() => app.stop());

  before(givenPinkRepository);
  before(() => {
    client = createRestAppClient(app);
  });

  beforeEach(async () => {
    await pinkRepo.deleteAll();
  });

  it('creates a pink', async function() {
    const pink = givenPink();
    const response = await client
      .post('/pinks')
      .send(pink)
      .expect(200);
    expect(response.body).to.containDeep(pink);
    const result = await pinkRepo.findById(response.body.id);
    expect(result).to.containDeep(pink);
  });

  it('creates a pink with a parent', async () => {
    const parent = givenPink();
    let response = await client
      .post('/pinks')
      .send(parent)
      .expect(200);
    expect(response.body).to.containDeep(parent);

    const child = givenPink();
    child.parentId = (await pinkRepo.findById(response.body.id)).getId();
    response = await client
      .post('/pinks')
      .send(child)
      .expect(200);
    expect(response.body).to.containDeep(child);
  });

  it.only('gets child pinks from parent pink', async () => {
    const parent = givenPink();
    let response = await client
      .post('/pinks')
      .send(parent)
      .expect(200);
    expect(response.body).to.containDeep(parent);

    const child = givenPink();
    child.parentId = (await pinkRepo.findById(response.body.id)).getId();
    response = await client
      .post('/pinks')
      .send(child)
      .expect(200);
    expect(response.body).to.containDeep(child);

    response = await client.get(`/pinks/${child.parentId}`).expect(200);
    console.log(response.body);
  });

  /*
   ============================================================================
   TEST HELPERS
   These functions help simplify setup of your test fixtures so that your tests
   can:
   - operate on a "clean" environment each time (a fresh in-memory database)
   - avoid polluting the test with large quantities of setup logic to keep
   them clear and easy to read
   - keep them DRY (who wants to write the same stuff over and over?)
   ============================================================================
   */

  async function givenRunningApplicationWithCustomConfiguration() {
    app = new ColourApplication({
      rest: givenHttpServerConfig(),
    });

    await app.boot();

    /**
     * Override default config for DataSource for testing so we don't write
     * test data to file when using the memory connector.
     */
    app.bind('datasources.config.ds').to({
      name: 'ds',
      connector: 'memory',
    });

    // Start Application
    await app.start();
  }

  async function givenPinkRepository() {
    pinkRepo = await app.getRepository(PinkRepository);
  }

  // async function givenPinkInstance(pink?: Partial<Pink>) {
  //   return await pinkRepo.create(givenPink(pink));
  // }
});
