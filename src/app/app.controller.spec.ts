import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './repository/app.repository';

describe('AppController', () => {
  let controller: AppController;
  let appService: AppService;

  const mockAppService = {
    findAll: jest.fn(() => ({
      orderBy: ['id'],
      page: 1,
      perPage: 10,
      search: 'test',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService, // Mocked service
        },
        AppRepository, // Optional, mock if used
      ],
      imports: [], // Avoid importing actual SharedModule unless absolutely necessary
    }).compile();

    controller = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return expected result from findAll', async () => {
    const result = controller.findAll({
      orderBy: ['id'],
      page: 1,
      perPage: 10,
      search: 'test',
    });

    expect(result).toEqual({
      orderBy: ['id'],
      page: 1,
      perPage: 10,
      search: 'test',
    });
    expect(mockAppService.findAll).toHaveBeenCalledWith(1, 10, 'test', ['id']);
  });
});
