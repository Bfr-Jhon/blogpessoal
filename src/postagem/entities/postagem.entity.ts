import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({name: "tb_postagens"}) // create table tb_postagem
export class Postagem{
    
    @PrimaryGeneratedColumn() // Primary key (id) Auto Increment
    id: number;

    @Transform(({value}: TransformFnParams)=> value?.trim()) // remover espacos em branco - inicio e fim
    @IsNotEmpty() // força a digitar o titulo
    @Length(5, 100, {message: "O Titulo deve ter entre 5 e 100 caracteres"})
    @Column({length: 100, nullable: false}) //Varchar(100) NOT NULL
    titulo: string;

    @Transform(({value}: TransformFnParams)=> value?.trim()) // remover espacos em branco - inicio e fim
    @IsNotEmpty() // força a digitar o titulo
    @Length(10, 1000, {message:"O Texto deve ter entre 10 e 1000 caracteres"})
    @Column({length: 1000, nullable: false}) //Varchar(1000) NOT NULL
    texto: string;

    @UpdateDateColumn() // atualiza a data na criação e na atualização
    data: Date;

    @ManyToOne( ()=> Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema;

}