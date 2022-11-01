import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { DatabaseModule } from './common/database.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [AuthModule, DatabaseModule, UserModule, PostModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
