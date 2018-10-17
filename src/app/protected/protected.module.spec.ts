import { ProtectedModule } from './protected.module';

describe('ProtectedModule', () => {
  let dashboardModule: ProtectedModule;

  beforeEach(() => {
    dashboardModule = new ProtectedModule();
  });

  it('should create an instance', () => {
    expect(dashboardModule).toBeTruthy();
  });
});
