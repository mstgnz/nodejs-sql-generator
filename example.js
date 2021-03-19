'use-strict'

const SqlGenerator = require('./SqlGenerator');

const sqlGenerator = new SqlGenerator();

let getSql = "";
let args;

// Select
getSql = sqlGenerator.select("users").where("id","=","1").get();
getSql = sqlGenerator.select("users","firstname,lastname,create_date").where("id","=","1").get();
getSql = sqlGenerator.select("users").where("id","=","1").orWhere("email","=","loremipsum@lrmpsm.com").get();
getSql = sqlGenerator.select("users").where("id","=","1").between('create_date','2021-01-01','2021-03-16').get();
getSql = sqlGenerator.select("users").where("id","=","1").between('create_date','2021-01-01','2021-03-16').limit(1,5).get();
getSql = sqlGenerator.select("users").where("id","=","1").between('create_date','2021-01-01','2021-03-16').groupBy('lastname').get();
getSql = sqlGenerator.select("users").where("id","=","1").between('create_date','2021-01-01','2021-03-16').groupBy('lastname').orderBy('id','DESC').get();

// Insert
args = {
    "firstname":"Lorem",
    "lastname":"IPSUM"
}
getSql = sqlGenerator.insert("users",args).get();

// Update
args = {
    "firstname":"Lorem",
    "lastname":"IPSUM"
}
getSql = sqlGenerator.update("users",args).where("email","=","loremipsum@lrmpsm.com").get();

// Delete
getSql = sqlGenerator.delete("users").where("email","=","loremipsum@lrmpsm.com").get();

// Join
getSql = sqlGenerator.select("users as u","u.firstname,u.lasetname,a.address").join("INNER","address as a","a.user_id=u.id").where("u.email","=","loremipsum@lrmpsm.com").get();

// Union
getSql1 = sqlGenerator.select("users").where("lastname","=","lorem").get();
getSql = sqlGenerator.select("users").where("lastname","=","ipsum").union(getSql1).get();

console.log(getSql);
