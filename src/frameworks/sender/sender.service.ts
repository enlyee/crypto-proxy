import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SenderService {
  constructor(private readonly httpService: HttpService) {}

  async post(body: object, endpoint: string) {
    try {
      const resp = await firstValueFrom(this.httpService.post(endpoint, body));
      Logger.log(`Sent: ${JSON.stringify(body)}`, 'SenderService');
      Logger.log(`Response: ${JSON.stringify(resp.data)}`, 'SenderService');
    } catch (e) {
      console.log('ERROR SENDER');
    }
  }

  async patchWithHeaders(body: object, headers: object, endpoint: string) {
    try {
      this.httpService.patch(endpoint, body, { headers: headers });
      Logger.log(`Sent: ${JSON.stringify(body)}`, 'SenderService');
    } catch (e) {
      console.log('ERROR SENDER');
    }
  }

  async getWithHeaders(headers: object, endpoint: string) {
    try {
      const answer = await firstValueFrom(
        this.httpService.get(endpoint, { headers: headers }),
      );
      Logger.log(`Got ${answer}`, 'SenderService');
      return answer;
    } catch (e) {
      console.log('ERROR SENDER');
    }
  }
}
