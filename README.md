# Nodejs Sql Generator
This package is only for creating sql text. To run the created sql text, you must create a database connection. (Ex: mysql, postgresql).

# Examples

## Select
```js
const getUsers = sqlGenerator.select("users")
                             .where("id","=","1")
                             .get();
const getUsers = sqlGenerator.select("users","firstname,lastname,create_date")
                             .where("id","=","1")
                             .get();
```
```sql
Result: SELECT * FROM users WHERE id = '1'
Result: SELECT firstname,lastname,create_date FROM users WHERE id = '1'
```
### where orWhere
```js
const getUsers = sqlGenerator.select("users")
                             .where("id","=","1")
                             .orWhere("email","=","loremipsum@lrmpsm.com")
                             .get();
```
```sql
Result: SELECT * FROM users WHERE id = '1' || email = 'loremipsum@lrmpsm.com'
```
### join
```js
const getUsers = sqlGenerator.select("users as u","u.firstname,u.lasetname,a.address")
                             .join("INNER","address as a","a.user_id=u.id")
                             .where("u.email","=","loremipsum@lrmpsm.com")
                             .get();
```
```sql
Result: SELECT u.firstname,u.lasetname,a.address FROM users as u 
        INNER JOIN address as a ON a.user_id=u.id 
        WHERE u.email = 'loremipsum@lrmpsm.com'
```
### between
```js
const getUsers = sqlGenerator.select("users")
                             .where("id","=","1")
                             .orWhere("email","=","loremipsum@lrmpsm.com")
                             .get();
```
```sql
Result: SELECT * FROM users WHERE id = '1' AND create_date BETWEEN '2021-01-01' AND '2021-03-16'
```
### limit
```js
const getUsers = sqlGenerator.select("users")
                             .where("id","=","1")
                             .between('create_date','2021-01-01','2021-03-16')
                             .limit(1,5)
                             .get();
```
```sql
Result: SELECT * FROM users WHERE id = '1' AND create_date BETWEEN '2021-01-01' AND '2021-03-16' LIMIT 1,5
```
### group by
```js
const getUsers = sqlGenerator.select("users")
                             .where("id","=","1")
                             .between('create_date','2021-01-01','2021-03-16')
                             .groupBy('lastname')
                             .get();
```
```sql
Result: SELECT * FROM users WHERE id = '1' AND create_date BETWEEN '2021-01-01' AND '2021-03-16' 
        GROUP BY 'lastname'
```
### order by
```js
const getUsers = sqlGenerator.select("users")
                             .where("id","=","1")
                             .between('create_date','2021-01-01','2021-03-16')
                             .groupBy('lastname')
                             .orderBy('id','DESC')
                             .get();
```
```sql
Result: SELECT * FROM users WHERE id = '1' AND create_date BETWEEN '2021-01-01' AND '2021-03-16' 
        GROUP BY 'lastname' 
        ORDER BY id 'DESC'
```
### union
```js
getSql1 = sqlGenerator.select("users").where("lastname","=","lorem").get();
getSql  = sqlGenerator.select("users").where("lastname","=","ipsum").union(getSql1).get();
```
```sql
Result: ((SELECT * FROM users WHERE lastname = 'ipsum') UNION (SELECT * FROM users WHERE lastname = 'lorem'))
```

## Insert
```js
const args = {
    "firstname":"Lorem",
    "lastname":"IPSUM"
}
const userCreate = sqlGenerator.insert("users",args).get();
```
```sql
Result : INSERT INTO users (firstname, lastname) VALUES ('Lorem', 'IPSUM')
```

## Update
```js
const args = {
    "firstname":"Lorem",
    "lastname":"IPSUM"
}
const userUpdate = sqlGenerator.update("users",args).where("email","=","loremipsum@lrmpsm.com").get();
```
```sql
Result: UPDATE users SET firstname = 'Lorem', lastname = 'IPSUM' WHERE email = 'loremipsum@lrmpsm.com'
```

## Delete
```js
const userDelete = sqlGenerator.delete("users").where("email","=","loremipsum@lrmpsm.com").get();
```
```sql
Result: DELETE FROM users WHERE email = 'loremipsum@lrmpsm.com'
