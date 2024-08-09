import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Transform, TransformFnParams } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_produtos'})
export class Produto{
    @PrimaryGeneratedColumn()
    @ApiProperty() 
    id: number

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 255, nullable: false})
    @ApiProperty() 
    nome: string

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @Column({type: 'decimal', precision: 10, scale: 2})
    @ApiProperty() 
    preco: number

    @Column({ length: 255, nullable: false})
    @ApiProperty() 
    descricao: string

    
    @Column({length:5000 })
    @ApiProperty() 
    foto: string

    @UpdateDateColumn()
    @ApiProperty() 
    data: Date

    @ApiProperty({ type: () => Categoria }) 
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, { //A Classe Produto será o lado N:1, ou seja, Muitas Produtos podem ter apenas Um Categoria. 
        onDelete: 'CASCADE'
    })
    categoria: Categoria
}