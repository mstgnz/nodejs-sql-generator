class SqlGenerator{

    select(table, columns=null){
        columns = columns ? columns : '*';
        this.sql = `SELECT ${columns} FROM ${table}`;
        return this;
    }

    update(table, args=[]){
        if(Object.keys(args).length){
            const keys = Object.keys(args);
            const values = Object.values(args);
            let set = "";
            let end = ", ";
            for (let i = 0; i<keys.length; i++) {
                if(i+1==keys.length) end="";
                set += `${keys[i]} = '${values[i]}'${end}`;
            }
            this.sql = `UPDATE ${table} SET ${set}`;
        }
        return this;
    }

    insert(table, args={}){
        if(Object.keys(args).length){
            const keys = Object.keys(args);
            const values = Object.values(args);
            let keysString = "";
            let valuesString = "";
            let end = ", ";
            for (let i = 0; i < keys.length; i++) {
                if(i+1==keys.length) end = "";
                keysString += `${keys[i]}${end}`;
                valuesString += `'${values[i]}'${end}`;
            }
            this.sql = `INSERT INTO ${table} (${keysString}) VALUES (${valuesString})`;
        }
        return this;
    }

    delete(table){
        this.sql = `DELETE FROM ${table}`;
        return this;
    }

    where(key, operator, value){
        if(key && operator && value){
            if(this.sql.includes("WHERE")){
                this.sql = `${this.sql} AND ${key} ${operator} '${value}'`;
            }else{
                this.sql = `${this.sql} WHERE ${key} ${operator} '${value}'`;
            }
        }
        return this;
    }

    orWhere(key, operator, value){
        if(key && operator && value){
            if(this.sql.includes("WHERE")){
                this.sql = `${this.sql} || ${key} ${operator} '${value}'`;
            }else{
                this.sql = `${this.sql} WHERE ${key} ${operator} '${value}'`;
            }
        }
        return this;
    }

    in(column, args=[]){
        if(column && args.length){
            let str = "";
            let end = ", ";
            for (let i = 0; i<args.length; i++) {
                if(i+1==args.length) end="";
                str += `'${args[i]}'${end}`;
            }
            if(this.sql.includes("WHERE")){
                this.sql = `${this.sql} AND ${column} IN (${str})`;
            }else{
                this.sql = `${this.sql} WHERE ${column} IN (${str})`;
            }
        }
        return this;
    }

    orIn(column, args=[]){
        if(column && args.length){
            let str = "";
            let end = ", ";
            for (let i = 0; i<args.length; i++) {
                if(i+1==args.length) end="";
                str += `'${args[i]}'${end}`;
            }
            if(this.sql.includes("WHERE")){
                this.sql = `${this.sql} || ${column} IN (${str})`;
            }else{
                this.sql = `${this.sql} WHERE ${column} IN (${str})`;
            }
        }
        return this;
    }

    between(column, value1, value2){
        if(column && value1 && value2){
            if(this.sql.includes("WHERE")){
                this.sql = `${this.sql} AND ${column} BETWEEN '${value1}' AND '${value2}'`;
            }else{
                this.sql = `${this.sql} WHERE ${column} BETWEEN '${value1}' AND '${value2}'`;
            }
        }
        return this;
    }

    orBetween(column, value1, value2){
        if(column && value1 && value2){
            if(this.sql.includes("WHERE")){
                this.sql = `${this.sql} || ${column} BETWEEN '${value1}' AND '${value2}'`;
            }else{
                this.sql = `${this.sql} WHERE ${column} BETWEEN '${value1}' AND '${value2}'`;
            }
        }
        return this;
    }

    having(key, operator, value){
        if(key && operator && value){
            if(this.sql.includes("HAVING")){
                this.sql = `${this.sql} AND ${key} ${operator} '${value}'`;
            }else{
                this.sql = `${this.sql} HAVING ${key} ${operator} '${value}'`;
            }
        }
        return this;
    }

    orHaving(key, operator, value){
        if(key && operator && value){
            if(this.sql.includes("HAVING")){
                this.sql = `${this.sql} || ${key} ${operator} '${value}'`;
            }else{
                this.sql = `${this.sql} HAVING ${key} ${operator} '${value}'`;
            }
        }
        return this;
    }

    join(type="INNER", table, equal){
        if(equal && table){
            this.sql = `${this.sql} ${type} JOIN ${table} ON ${equal}`;
        }
        return this;
    }

    limit(start=1, limit=1){
        this.sql = `${this.sql} LIMIT ${start},${limit}`;
        return this;
    }

    groupBy(column){
        this.sql = `${this.sql} GROUP BY '${column}'`;
        return this;
    }

    orderBy(column, sort="ASC"){
        this.sql = `${this.sql} ORDER BY ${column} '${sort.toUpperCase()}'`;
        return this;
    }

    union(sql){
        this.sql = `((${this.sql}) UNION (${sql}))`;
        return this;
    }

    get(){
        return this.sql;
    }

}

module.exports = SqlGenerator;