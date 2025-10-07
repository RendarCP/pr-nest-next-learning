import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('서비스가 정의되어야 한다', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('새로운 사용자를 생성해야 한다', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      const mockUser = {
        id: 1,
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(repository, 'create').mockReturnValue(mockUser as User);
      jest.spyOn(repository, 'save').mockResolvedValue(mockUser as User);

      const user = await service.create(createUserDto);

      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalledWith(mockUser);
      expect(user).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('사용자 배열을 반환해야 한다', async () => {
      const mockUsers = [
        { id: 1, email: 'user1@example.com', name: 'User 1' },
        { id: 2, email: 'user2@example.com', name: 'User 2' },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(mockUsers as User[]);

      const users = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(users).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('ID로 사용자를 반환해야 한다', async () => {
      const mockUser = { id: 1, email: 'user@example.com', name: 'User' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser as User);

      const user = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        select: [
          'id',
          'email',
          'name',
          'avatar',
          'isActive',
          'createdAt',
          'updatedAt',
        ],
      });
      expect(user).toEqual(mockUser);
    });

    it('존재하지 않는 사용자에 대해 NotFoundException을 던져야 한다', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('사용자를 업데이트해야 한다', async () => {
      const updateDto = { name: 'Updated Name' };
      const mockUser = { id: 1, email: 'user@example.com', name: 'User' };
      const updatedUser = { ...mockUser, name: 'Updated Name' };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser as User);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedUser as User);

      const user = await service.update(1, updateDto);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(repository.save).toHaveBeenCalledWith({
        ...mockUser,
        ...updateDto,
      });
      expect(user).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('사용자를 삭제해야 한다', async () => {
      const mockUser = { id: 1, email: 'user@example.com', name: 'User' };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser as User);
      jest.spyOn(repository, 'remove').mockResolvedValue(mockUser as User);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(repository.remove).toHaveBeenCalledWith(mockUser);
    });

    it('존재하지 않는 사용자 삭제 시 NotFoundException을 던져야 한다', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(new NotFoundException('User with ID 999 not found'));

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('이메일로 사용자를 찾아야 한다', async () => {
      const mockUser = { id: 1, email: 'john@example.com', name: 'John' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser as User);

      const user = await service.findByEmail('john@example.com');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });
      expect(user).toEqual(mockUser);
    });

    it('존재하지 않는 이메일에 대해 null을 반환해야 한다', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const user = await service.findByEmail('nonexistent@example.com');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'nonexistent@example.com' },
      });
      expect(user).toBeNull();
    });
  });
});
