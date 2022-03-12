import { IsNotEmpty } from 'class-validator';

export class deleteDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  userId: number;
}
