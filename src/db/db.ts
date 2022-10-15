import { connect, connection } from 'mongoose';

export const db = {
  connect: async (uri: string) => {
    await connect(uri, (err) => {
      if (err) {
        console.warn(err);
      } else {
        console.log('[db]: Connected to MongoDB');
      }
    });

    connection.on('error', (err) => {
      console.warn(err);
      console.log(
        '[db]: MongoDB connection error. Please make sure MongoDB is running.'
      );
      // Завершить работу NodeJS приложения
      process.exit();
    });
  },
  close: () => {
    // Метод отключения от БД
    connection.close();
  }
}