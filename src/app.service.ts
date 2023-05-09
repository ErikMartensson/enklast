import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getJokes(
    amount: number = 10,
    type: string,
  ) {
    const params: any = {
      'safe-mode': '',
      amount,
    };

    if (type) {
      params.type = type;
    }

    const { data } = await this.httpService.axiosRef.get(
      'https://v2.jokeapi.dev/joke/Programming,Pun',
      { params }
    );
    return data;
  }
}
