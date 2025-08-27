import mysql from "mysql2/promise";

//connect to mysql server
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Yash139!&",
  database: "test",
});
console.log("connected successfully");

//create database if not exists
// await db.execute(`create database if not exists test`);
// console.log(await db.execute("show databases"));

//creating table
// await db.execute(`
//     create table demo (
//         id int auto_increment primary key,
//         url varchar(255) not null,
//         short_code varchar(255) not null unique
//     )
// `);

//insert data
// await db.execute(`
//     insert into demo (url, short_code) values
//     ('https://www.example.com', 'example'),
//     ('https://www.google.com', 'google')
// `);

//using prepared statements(best practices)
// const stmt = await db.prepare(
//   `insert into demo (url, short_code) values (?, ?)`
// );
// await stmt.execute(["https://www.exeample.com", "efxamprle"]);
// await stmt.execute(["https://www.goosgle.com", "gofogle"]);

//multiple insertions
// const values = [
//   ["https://www.yash.com", "yash"],
//   ["https://www.yt.com", "yt"],
// ];

// await db.query("insert into demo (url, short_code) values ?", [values]);

//read data
// const [rows] = await db.execute(`select * from demo`);
// const [rows] = await db.execute(`select * from demo where short_code="yash"`);
// console.log(rows);

//update data
try {
  const [rows] = await db.execute(
    `update demo set url= ? where short_code= ?`,
    ["https://www.yakah.com", "yash"]
  );
  console.log("all users:", rows);
} catch (error) {
  console.error(error);
}

//delete
await db.execute(`delete from demo where short_code=?`, ["gofogle"]);
const [rows] = await db.execute(`select * from demo`);
console.log(rows);
