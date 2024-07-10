import { IsOptional, IsString, IsArray, IsIn, IsInt, Min, Validate } from 'class-validator';
import { Transform, TransformationType, Type } from 'class-transformer';


function tagsToArray(value: any, obj: any, transformationType: TransformationType): string[] {
    if (value && typeof value === 'string') {
        return value.split(',').map(item => item.trim());
    }
    return [];
}

export class SearchMeetupsDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    filter?: string;

    @IsOptional()
    @IsString()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc';

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number ;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    size?: number ;
}
