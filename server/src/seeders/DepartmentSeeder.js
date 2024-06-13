import Department from '../models/Department.js';

const seedDepartments = async () => {
  try {
    await Department.bulkCreate([
      { department_name: 'Business Development' },
      { department_name: 'Finance' },
      { department_name: 'General Affairs' },
      { department_name: 'IT Development' },
    ]);
    console.log('Seeder Departements berhasil.');
  } catch (error) {
    console.error('Error saat menjalankan seeder Departements:', error);
  }
};

export default seedDepartments;
