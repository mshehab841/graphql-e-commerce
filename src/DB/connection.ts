import { Sequelize } from "sequelize";

export const sql_config = new Sequelize('sequelize-s2' , 'root' , '' , {
    host : 'localhost',
    dialect : 'mysql'
})

//sync : fire connection between your app and database
export const db_connection = ()=>{
    sql_config.sync({alter : true }).then(()=>{
        console.log("connected DB")
    }).catch(err=>{
        console.log("db connection fail",err.message)
    })
}