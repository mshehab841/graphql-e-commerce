import { sql_config } from "../../DB/connection";
import { DataTypes, Model } from "sequelize";
import Post from "../post/post.model";
import like from "../likes/like.model";

// Define the Sequelize User model

export const Address = sql_config.define<Model<any>>(
    'address',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING
        },
        zipCode: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        isDefault: {
            type: DataTypes.BOOLEAN
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

const Users = sql_config.define<Model<any>>(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(255),
            validate: {
                notEmpty: true
            },
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        OTP: {
            type: DataTypes.STRING,
        },
        photo : {
            type : DataTypes.STRING
        }
    },
    {
        timestamps: true,
    }
);
Users.hasMany(Address , {as :'addresses' ,  foreignKey: 'userId' });
Address.belongsTo(Users , {foreignKey : 'userId' })
Users.hasMany(Post , { foreignKey : 'userId' })
Post.belongsTo(Users , {foreignKey : 'userId' })
Users.belongsToMany(Post , {through : like , foreignKey : 'userId' , as : 'likedPosts'})
Post.belongsToMany(Users , {through : like , foreignKey : 'postId' , as : 'likedBy'})
export default Users;

