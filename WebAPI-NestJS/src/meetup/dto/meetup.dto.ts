import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayMinSize, IsDate, IsNotEmpty, MinDate, IsDateString } from 'class-validator';

export class MeetupDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    tags: string[];

    @ApiProperty()
    @IsDateString()
    @MinDate(new Date())
    date: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    location: string;
}


