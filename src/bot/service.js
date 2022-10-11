const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
  })
  client.connect(async function (err) {
    if (err) throw err;
    console.log("Connected!");
  });


export function set_name(name) {
    client.connect(async() => {
      const roles = await client.query(`insert into roles(name) values(${name})`)
        console.log(roles.rows);
        return {
           all : roles.rows
        }
    })
}