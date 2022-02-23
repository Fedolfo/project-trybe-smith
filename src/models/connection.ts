import mysql from 'mysql2/promise';
import { PrismaClient } from '@prisma/client';

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = process.env;

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

export default connection;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:3306/Trybesmith`,
    },
  },
});
