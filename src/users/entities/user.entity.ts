import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", unique: true })
  email: string

  @Column({ type: "varchar" })
  password: string

  @Column({ type: "varchar" })
  fullName: string

  @Column({ type: "integer", default: 0 })
  totalTests: number

  @Column({ type: "float", default: 0 })
  bestScore: number

  @Column({ type: "integer", default: 8 })
  targetScore: number

  @Column({ type: "integer", default: 280 })
  daysLeft: number

  @CreateDateColumn()
  createdAt: Date
}
