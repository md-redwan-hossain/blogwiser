import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "./admin/admin.module";
import { BlogPostModule } from "./blog-post/blog-post.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AdminModule,
    BlogPostModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
