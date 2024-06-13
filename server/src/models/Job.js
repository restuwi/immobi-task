import {Sequelize} from "sequelize"
import sequelize from "../config/Database.js"
import Department from "./Department.js"

const {DataTypes} = Sequelize

const Job = sequelize.define('jobs',{
    department_id: {
        type: DataTypes.INTEGER,
        references :{
            model: Department,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    job_title: DataTypes.STRING
},{
    freezeTableName: true
})

Job.belongsTo(Department, {foreignKey: 'department_id'})
Department.hasMany(Job, {foreignKey: 'department_id'})

export default Job