import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the first post',
      authorId: 1,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  private idCounter = 2;

  create(createPostDto: CreatePostDto): Post {
    const newPost: Post = {
      id: this.idCounter++,
      ...createPostDto,
      published: createPostDto.published ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const post = this.findOne(id);
    Object.assign(post, { ...updatePostDto, updatedAt: new Date() });
    return post;
  }

  remove(id: number): void {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    this.posts.splice(index, 1);
  }
}
