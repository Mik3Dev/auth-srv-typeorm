import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getVersion(): any {
    return {
      apiVesion: '1.0.0',
      applicationName: 'Authentication service',
      datetime: new Date().toUTCString(),
    };
  }
}
