export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DB_HOST: string;
      SECRET_KEY: string;
    }
  }
}