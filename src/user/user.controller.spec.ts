import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { AppModule } from '../../src/app.module';
import { EditUserDto } from './dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [AppModule],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return self', () => {
    const user = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'string',
      hash: 'string',
      firstName: 'string',
      lastName: 'string',
    };
    expect(controller).toBeDefined();
    expect(controller.getMe(user)).toBe(user);
  });

  it('should edit user', async () => {
    const dto: EditUserDto = {
      email: 'test@test.com',
    };

    const id: number = 1;

    const editedUser: User = {
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: dto.email,
      hash: 'string',
      firstName: 'string',
      lastName: 'string',
    };

    const userSpy = jest
    .spyOn(service, 'editUser')
    .mockResolvedValue(editedUser)

    const response = await controller.editUser(id, dto)

    expect(response.email).toBe(dto.email);
    expect(response.id).toBe(id);
    expect(userSpy).toBeCalledTimes(1);
  });
});
