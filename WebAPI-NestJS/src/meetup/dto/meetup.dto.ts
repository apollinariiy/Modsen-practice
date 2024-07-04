import { IsString, IsArray, ArrayMinSize, IsDate, IsNotEmpty, MinDate, IsDateString } from 'class-validator';

export class MeetupDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    tags: string[];

    @IsDateString()
    @MinDate(new Date())
    date: Date;

    @IsString()
    @IsNotEmpty()
    location: string;
 }
