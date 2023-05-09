import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsString, IsIn, Min, Max } from 'class-validator';

export class GetJokesDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(5)
  @Max(10)
  amount?: number;

  @IsOptional()
  @IsString()
  @IsIn(['single', 'twopart'])
  type?: string;
}
