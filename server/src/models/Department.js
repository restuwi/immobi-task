import {Sequelize} from "sequelize"
import sequelize from "../config/Database.js"

const {DataTypes} = Sequelize

const Department = sequelize.define('departments',{
    department_name: DataTypes.STRING
},{
    freezeTableName: true
})

export default Department