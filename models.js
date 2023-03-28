const { pool } = require('./database.js');
module.exports = {
    createUser :(body, callBack)=>{
        pool.query(`insert into users(user_name,password) values(?,?)`,[body.name,body.password],
        (error,results)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        })
        // pool.query(
        //     `select * from emp_users where name = ?`,[name],(error,results)=>{
        //     if(error){
        //         return callBack(error);
        //     }   
        //     return callBack(null,results[0]);

        //     }
        // )
    },
    insertToken : (temp, callBack)=>{
        pool.query(`update users set token = ? where user_name=?`,[temp.token,temp.user],
        (error,results)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        })
    },
    addBook :(body,callBack)=>{
        pool.query(`insert into books(id,name,count) values(?,?,?)`,[body.id,body.name,body.count],
        (error,results)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        })
    },
    getBook : (callBack)=>{
        pool.query(`select * from books`,(error,results)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        })
    },
    getBookById : (id,callBack)=>{
        pool.query(`select * from books where id=?`,[id],
        (error,results)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        })
    },
    buyBook : (body,callBack)=>{
        pool.query(`update books set count =(select count from (select * from books) as b where id=?)-? where id=?`,[body.id,body.count,body.id],
        (error,results)=>{
            if(error){
                return callBack(error);
            }
        })
        pool.query(`select * from books where id=?`,[body.id],
        (error,results)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results[0]);
        });
    },
    depositBook : (body,callBack)=>{
        pool.query(`update books set count =(select count from (select * from books) as b where id=?)+? where id=?`,[body.id,body.count,body.id],
        (error,results)=>{
            if(error){
                return callBack(error);
            }
        })
        pool.query(`select * from books where id=?`,[body.id],
        (error,results)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results[0]);
        });
    },
    deleteBook :(id,callBack)=>{
        pool.query(`delete from books where id=?`,[id],
        (error,results)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        })
    },
    login :(name,callBack)=>{
        pool.query(`select * from users where user_name=?`,[name],
        (error,results)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results[0]);
        })
    }

}
