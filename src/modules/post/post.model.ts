import { sql_config } from "../../DB/connection";
import { DataTypes, Model } from "sequelize";

const Posts = sql_config.define<Model<any>>(
    'post',
    {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        title : {
            type : DataTypes.STRING
        },
        content : {
            type : DataTypes.STRING
        }, 
        image : {
            type : DataTypes.JSON // Change this line
        }
    },
    {
        timestamps : true 
    }
);


export default Posts