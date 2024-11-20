import { Test, TestingModule } from '@nestjs/testing';
import { OportunityService } from './oportunity.service';

describe('OportunityService', () => {
  let service: OportunityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OportunityService],
    }).compile();

    service = module.get<OportunityService>(OportunityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
