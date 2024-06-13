import {Sequelize} from "sequelize"
import sequelize from "../config/Database.js"
import Job from "./Job.js"

const {DataTypes} = Sequelize

const Employee = sequelize.define('employees',{
    name: DataTypes.STRING,
    job_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Job,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    address: DataTypes.TEXT
},{
    freezeTableName: true
})

Employee.belongsTo(Job, {foreignKey: 'job_id'})
Job.hasMany(Employee, {foreignKey: 'job_id'})

export default Employee