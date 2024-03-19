import { sql_config } from "../../DB/connection";
import { DataTypes } from "sequelize";


const like = sql_config.define(
    'like',
    {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        }
    },
    {
        timestamps : true 
    }
);

export default like