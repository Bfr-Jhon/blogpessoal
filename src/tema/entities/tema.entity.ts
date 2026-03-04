import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({name: "tb_temas"}) // create table tb_temas
export class Tema{
    
    @PrimaryGeneratedColumn() // Primary key (id) Auto Increment
    id: number;

   

    @Transform(({value}: TransformFnParams)=> value?.trim()) // remover espacos em branco - inicio e fim
    @IsNotEmpty() // força a digitar o titulo
    @Length(10, 1000, {message:"A descricao deve ter entre 10 e 1000 caracteres"})
    @Column({length: 255, nullable: false}) //Varchar(255) NOT NULL
    descricao: string;

    @OneToMany( () => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[];

}