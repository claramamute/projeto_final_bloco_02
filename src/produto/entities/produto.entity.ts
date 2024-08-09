import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Transform, TransformFnParams } from "class-transformer";

@Entity({name: 'tb_produtos'})
export class Produto{
    @PrimaryGeneratedColumn()
    id: number

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 255, nullable: false})
    nome: string

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @Column({type: 'decimal', precision: 10, scale: 2})
    preco: number

    @Column({ length: 255, nullable: false})
    descricao: string

    @Column({length:5000 })
    foto: string

    @UpdateDateColumn()
    data: Date

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, { //A Classe Produto será o lado N:1, ou seja, Muitas Produtos podem ter apenas Um Categoria. 
        onDelete: 'CASCADE'
    })
    categoria: Categoria
}