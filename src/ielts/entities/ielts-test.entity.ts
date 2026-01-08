import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity("ielts_tests")
export class IeltsTest {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "uuid" })
  userId: string

  @Column({ type: "varchar" })
  section: string // 'Listening', 'Reading', 'Writing', 'Speaking'

  @Column({ type: "text" })
  content: string

  @CreateDateColumn()
  createdAt: Date
}
