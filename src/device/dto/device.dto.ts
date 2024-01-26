import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export enum ProjectorMaker {
  Epson = 'Epson',
  LG = 'LG',
  Panasonic = 'Panasonic',
}

export class ProjectorDto {
  @ApiProperty({
    description: 'select projector maker',
    example: [
      ProjectorMaker.Epson,
      ProjectorMaker.LG,
      ProjectorMaker.Panasonic,
    ],
  })
  @IsString()
  projector: string;

  @ApiProperty({ description: 'control command' })
  @IsBoolean()
  onoff: boolean;
}
