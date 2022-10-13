import mongoose from 'mongoose';

export const db = {
  connect: async (uri: string) => {
    await mongoose.connect(uri, (err) => {
      if (err) {
        console.warn(err);
      } else {
        console.log('[db]: Connected to MongoDB');
      }
    });

    mongoose.connection.on('error', (err) => {
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
    mongoose.connection.close();
  }
}