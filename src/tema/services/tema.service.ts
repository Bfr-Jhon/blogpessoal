import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";


@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>,
    ) { }

    async findAll(): Promise<Tema[]> {
        // SELECT * FROM tb_postagens
        return this.temaRepository.find({
            relations:{
                postagem:true
            }
        });
    }

    async findById(id: number): Promise<Tema> {
        // SELECT * FROM tb_postagens WHERE id = ?;
        const tema = await this.temaRepository.findOne({
            where: {
                id
            },
             relations:{
                postagem:true
            }
        });
        if (!tema) {
            throw new HttpException("Tema não encontrada!", HttpStatus.NOT_FOUND)
        }
        return tema;
    }


     async findAllBydescricao(descricao: string): Promise<Tema[]> {
            // SELECT * FROM tb_temas WHERE titulo LIKE '%?%'
            return this.temaRepository.find({
                where: {
                    descricao: ILike(`%${descricao}%`),
                },
                 relations:{
                postagem:true
            }
            })
        }

    async create(tema: Tema): Promise<Tema> {
        // INSERT INTO tb_temas (Tema, texto) VALUES (?, ?);
        return await this.temaRepository.save(tema);
    }


    async update(tema: Tema): Promise<Tema> {

        if (!tema.id || tema.id <= 0) {
            throw new HttpException("O ID da postagem é inválido!", HttpStatus.BAD_REQUEST);
        }

        await this.findById(tema.id);

        // UPDATE tb_postagens SET titulo = ?,
        // texto = ?, 
        // data = CURRENT_TIMESTAMP()
        // WHERE id = ?;        
        return await this.temaRepository.save(tema);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        // DELETE tb_postagens WHERE id = ?;
        return await this.temaRepository.delete(id);
    }
}