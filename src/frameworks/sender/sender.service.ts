import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SenderService {
  constructor(private readonly httpService: HttpService) {}

  async post(body: object, endpoint: string) {
    try {
      await this.httpService
        .post(endpoint, { text: JSON.stringify(body) })
        .toPromise();
      Logger.log(`Sent: ${JSON.stringify(body)}`, 'SenderService');
    } catch (e) {
      console.log(e);
    }
  }
}
