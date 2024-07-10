
import { IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class PayloadDto {
    @IsNumber()
    id: number;
    @IsString()
    @IsNotEmpty()
    role: string;
    @IsNumber()
    tokenId?:number
}