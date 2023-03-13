import { ApiProperty } from '@nestjs/swagger';

export class TodoCardItemRequestDto {
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public todoCardId: string;
  @ApiProperty()
  public status: boolean;
}