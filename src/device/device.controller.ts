import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import { ProjectorDto } from './dto/device.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('device')
@ApiTags('IOT Beam Projector control')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('/control')
  @ApiCreatedResponse({
    description: '',
    type: ProjectorDto,
  })
  setControl(@Body() data: ProjectorDto): any {
    const { projector, onoff } = data;

    if (projector && onoff !== undefined) {
      return this.deviceService.setControl(projector, onoff);
    } else {
      return 'Invalid request. Please provide both projector and onoff in the request body.';
    }
  }
}
