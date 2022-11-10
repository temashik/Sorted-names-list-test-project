import { createConnection } from 'mysql2/promise';
import 'dotenv/config';

async function getConnection() {
	return await createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DATABASE,
	password: process.env.DB_PASSWORD,
});
}

export default getConnection;