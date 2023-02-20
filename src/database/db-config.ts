import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const dbConfig = () => {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Post],
    synchronize: true,
  });
};
