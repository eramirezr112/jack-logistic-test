import mysql from "mysql";
import config from "../config";

const dbSettings = {
  host: config.dbServer,
  database: config.dbDatabase,
  user: config.dbUser,
  password: config.dbPassword,
};

export async function getConnection() {
  try {
    const connection = mysql.createConnection(dbSettings);
    connection.connect(function (err) {
      if (err) {
        return console.error("error: " + err.message);
      }

      console.log("Connected to the MySQL server.");
    });
    return connection;
  } catch (error) {
    console.log(error);
  }
}

export { mysql };
