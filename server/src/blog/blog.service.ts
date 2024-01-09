import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  // Create Task
  async create(createBlogDto: CreateBlogDto) {
    const blog = await this.blogRepository.findOne({
      where: {
        title: createBlogDto.title,
      },
    });

    if (blog)
      throw new HttpException(
        'This task already exist',
        HttpStatus.BAD_REQUEST,
      );

    return await this.blogRepository.save({
      ...createBlogDto,
      status: 'в процессе',
    });
  }

  // Get All Task
  async findAll() {
    return await this.blogRepository.find({});
  }

  // Get One Task
  async getOne(id: number) {
    const blog = await this.blogRepository.findOne({
      where: {
        id,
      },
    });

    if (!blog)
      throw new HttpException('This task not found', HttpStatus.BAD_REQUEST);

    return blog;
  }

  // Update Task
  async updateTask(id: number, updateBlogDto: CreateBlogDto) {
    const blog = await this.blogRepository.findOne({
      where: {
        id,
      },
    });

    console.log(updateBlogDto)

    if (!blog) throw new NotFoundException('This category are not found');

     await this.blogRepository.update({id}, {...blog, title: updateBlogDto.title, description: updateBlogDto.description});
  }

  // Delete Task
  async deleteTask(id: number) {
    const blog = await this.blogRepository.findOne({
      where: {
        id,
      },
    });

    if (!blog) throw new NotFoundException('This category are not found');

    return await this.blogRepository.delete(id);
  }

  // Completed Task
  async completeTask(id: number, status: string) {
    const blog = await this.blogRepository.findOne({
      where: {
        id,
      },
    });

    if (!blog) throw new NotFoundException('This category are not found');

    return await this.blogRepository.update(id, { ...blog, status: status });
  }
}
