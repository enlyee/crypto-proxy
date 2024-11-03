import { Module } from '@nestjs/common';
import { UserFactory } from './user.factory';

@Module({
  imports: [],
  providers: [UserFactory],
  exports: [UserFactory],
})
export class UserModule {}
