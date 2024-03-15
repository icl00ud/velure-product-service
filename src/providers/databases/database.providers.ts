// Importando o Mongoose
import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from 'src/shared/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> => {
      const HOST = process.env.MONGODB_HOST;
      const USER = process.env.MONGODB_USER;
      const PASSWORD = process.env.MONGODB_PASSWORD;
      const DBNAME = process.env.MONGODB_DBNAME;
      const MONGOPORT = process.env.MONGODB_PORT;

      const connection = await mongoose.connect(`mongodb://${USER}:${PASSWORD}@${HOST}:${MONGOPORT}/${DBNAME}`)
        .then(() => { console.log('Connected to MongoDB'); return mongoose; })
        .catch((err) => { console.log('Error connecting to MongoDB', err); throw err; });

      return connection;
    },
  },
];
