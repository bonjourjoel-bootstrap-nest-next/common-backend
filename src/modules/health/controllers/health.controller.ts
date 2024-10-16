import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { HTTP } from 'src/lib';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: HTTP._200_OK,
    description: 'Health OK.',
  })
  public async getHealth() {
    return { status: 'OK' };
  }
}
