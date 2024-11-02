import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SenderService {
  constructor(private readonly httpService: HttpService) {}

  async post(body: object, endpoint: string) {
    try {
      await this.httpService.post(endpoint, body).toPromise();
    } catch (e) {
      console.log(e);
    }
  }
}
