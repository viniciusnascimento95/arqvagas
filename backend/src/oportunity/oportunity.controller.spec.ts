import { Test, TestingModule } from '@nestjs/testing';
import { OportunityController } from './oportunity.controller';
import { OportunityService } from './oportunity.service';

describe('OportunityController', () => {
  let controller: OportunityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OportunityController],
      providers: [OportunityService],
    }).compile();

    controller = module.get<OportunityController>(OportunityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
