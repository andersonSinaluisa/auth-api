import { ApiProperty } from '@nestjs/swagger';

export class ReadRoleDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}
