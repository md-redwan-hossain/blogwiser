import { Test, TestingModule } from "@nestjs/testing";
import { BlogPostService } from "./blog-post.service";

describe("BlogPostService", () => {
  let service: BlogPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPostService]
    }).compile();

    service = module.get<BlogPostService>(BlogPostService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
