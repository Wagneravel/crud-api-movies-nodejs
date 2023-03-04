import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";

@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 50, unique:true})
    name: string;

    @Column({type:'int'})
    duration: number;

    @Column({ type:'text', nullable: true })
    description?: string | undefined | null;

    @Column({type:'int'})
    price: number;
}

