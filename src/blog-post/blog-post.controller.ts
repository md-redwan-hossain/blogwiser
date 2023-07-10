import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BlogPostService } from "./blog-post.service";
import { CreateBlogPostDto } from "./dto/create-blog-post.dto";
import { UpdateBlogPostDto } from "./dto/update-blog-post.dto";

@Controller("blog-post")
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Post()
  create(@Body() createBlogPostDto: CreateBlogPostDto) {
    return this.blogPostService.create(createBlogPostDto);
  }

  @Get()
  findAll() {
    return this.blogPostService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.blogPostService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBlogPostDto: UpdateBlogPostDto) {
    return this.blogPostService.update(+id, updateBlogPostDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.blogPostService.remove(+id);
  }
}
