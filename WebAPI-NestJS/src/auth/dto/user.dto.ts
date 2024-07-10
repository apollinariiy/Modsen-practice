import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ArrayMinSize, IsDateString } from 'class-validator';

export class UserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    login: string;
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}