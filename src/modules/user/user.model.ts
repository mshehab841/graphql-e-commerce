import { sql_config  } from "../../DB/connection";
import { DataTypes } from "sequelize";



const User   = sql_config.define('user',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING(255),
        unique : true,
        allowNull : false,
        validate : {
            isEmail : true
        }
    },
    password : {
        type : DataTypes.STRING(255),
        validate : {
            notEmpty : true
        }
    },
    verified : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    }
},{
    timestamps : false
})
export type  userType = typeof User
export default User