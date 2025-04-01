import * as dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.NODE_ENV === "production" ? 3001 : 5090;

export const DB_CREDS = {
  /*  host: "localhost",
  user: "root",
  password: "",
  database: "enkaj", */

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// export const DATABASE_URL = "mysql://root:@localhost/enkaj";
export const DATABASE_URL = process.env.DATABASE_URL;

// export const MIGRATIONS_OUTPUT = "./config/migrations/Dev";
export const MIGRATIONS_OUTPUT = process.env.MIGRATIONS_OUTPUT;

export const CLOUDINARY_IMG_URL = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1738609381`;
