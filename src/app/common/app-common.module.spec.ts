import { AppCommonModule } from './app-common.module';

describe('CommonModule', () => {
  let commonModule: AppCommonModule;

  beforeEach(() => {
    commonModule = new AppCommonModule();
  });

  it('should create an instance', () => {
    expect(commonModule).toBeTruthy();
  });
});
