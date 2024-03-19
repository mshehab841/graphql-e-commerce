import { sql_config } from "../../DB/connection";
import { DataTypes } from "sequelize";
import Users from "../user/user.model";
import Post from "../post/post.model";
const comments = sql_config.define(
    'comment',
    {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        content : {
            type : DataTypes.STRING
        }
    },
    {
        timestamps : true 
    }
);


Users.hasMany(comments , {
    foreignKey : 'userId',
})
comments.belongsTo(Users)

Post.hasMany(comments , {
    foreignKey : 'postId'
})
comments.belongsTo(Post)
export default comments