import { Injectable } from '@nestjs/common';
import { SenderService } from '../sender/sender.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly senderService: SenderService,
  ) {}

  async createNotification() {
    //create

    const endpoint = this.configService.getOrThrow<string>('endpoint');
    this.senderService.postByLink({}, endpoint);
  }
}
