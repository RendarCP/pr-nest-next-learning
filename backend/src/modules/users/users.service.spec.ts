import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
      };

      const user = service.create(createUserDto);

      expect(user).toHaveProperty('id');
      expect(user.email).toBe(createUserDto.email);
      expect(user.name).toBe(createUserDto.name);
      expect(user).toHaveProperty('createdAt');
    });
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const users = service.findAll();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', () => {
      const user = service.findOne(1);
      expect(user).toBeDefined();
      expect(user.id).toBe(1);
    });

    it('should throw NotFoundException for non-existent user', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', () => {
      const updateDto = { name: 'Updated Name' };
      const user = service.update(1, updateDto);
      expect(user.name).toBe('Updated Name');
    });
  });

  describe('remove', () => {
    it('should remove a user', () => {
      const initialLength = service.findAll().length;
      service.remove(1);
      expect(service.findAll().length).toBe(initialLength - 1);
    });

    it('should throw NotFoundException when removing non-existent user', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', () => {
      const user = service.findByEmail('john@example.com');
      expect(user).toBeDefined();
      expect(user?.email).toBe('john@example.com');
    });

    it('should return undefined for non-existent email', () => {
      const user = service.findByEmail('nonexistent@example.com');
      expect(user).toBeUndefined();
    });
  });
});
