import { Sequelize } from 'sequelize';
import { up as createDepartment } from '../migrations/20230612-create-department.js';
import { up as createJob } from '../migrations/20230612-create-job.js';
import { up as createEmployee } from '../migrations/20230612-create-employee.js';
import sequelize from '../config/Database.js';

const runMigrations = async () => {
  const queryInterface = sequelize.getQueryInterface();

  try {
    await createDepartment(queryInterface, Sequelize);
    await createJob(queryInterface, Sequelize);
    await createEmployee(queryInterface, Sequelize);
    console.log('Migrasi berhasil dijalankan.');
  } catch (error) {
    console.error('Error saat menjalankan migrasi:', error);
  } finally {
    await sequelize.close();
  }
};

runMigrations();
