import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('addTask')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get('getTasks')
  findAll() {
    return this.blogService.findAll();
  }

  @Get('getTask/:id')
  getOneTask(@Param('id') id: number) {
    return this.blogService.getOne(id)
  }
  @Get('completeTask/:id/:status')
  completeTask(@Param('id') id: number, @Param('status') status: string) {
    return this.blogService.completeTask(id, status);
  }

  @Delete('deleteTask/:id')
  deleteTask(@Param('id') id: number) {
    return this.blogService.deleteTask(id);
  }

  @Put('updateTask/:id')
  updateTask(@Param('id') id: number, @Body() updateBlogDto: CreateBlogDto) {
    return this.blogService.updateTask(id, updateBlogDto);
  }
}
