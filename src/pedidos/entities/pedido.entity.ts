import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_pedidos' })
export class Pedidos {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor_total: number;

  @IsNotEmpty()
  @Column({ length: 30, nullable: false })
  status: string;

  @ManyToOne(() => Usuarios, (usuario) => usuario.pedidos)
  usuario: Usuario;

  @ManyToOne(() => Estabelecimentos, () => estabelecimento.pedidos)
  estabelecimento: Estabelecimentos;
}
