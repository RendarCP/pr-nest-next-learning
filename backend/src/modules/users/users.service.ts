import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      email: 'john@example.com',
      name: 'John Doe',
      createdAt: new Date(),
    },
    {
      id: 2,
      email: 'jane@example.com',
      name: 'Jane Smith',
      createdAt: new Date(),
    },
  ];
  private idCounter = 3;

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.idCounter++,
      ...createUserDto,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);
    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: number): void {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(index, 1);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }
}
