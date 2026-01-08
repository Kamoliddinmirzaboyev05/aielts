import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity("ielts_scores")
export class IeltsScore {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "uuid" })
  userId: string

  @Column({ type: "uuid" })
  testId: string

  @Column({ type: "float" })
  score: number

  @Column({ type: "varchar" })
  section: string

  @Column({ type: "text", nullable: true })
  feedback: string

  @CreateDateColumn()
  createdAt: Date
}
