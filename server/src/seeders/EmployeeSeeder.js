import Employee from '../models/Employee.js';
import Job from '../models/Job.js';

const seedEmployees = async () => {
  try {
    const fullstackDevJob = await Job.findOne({ where: { job_title: 'FullStack Developer' } });

    await Employee.bulkCreate([
      { name: 'Habib Rahmat', job_id: fullstackDevJob.id, age: 26, gender: 'L', birth_date: '1994-06-22', address: 'Jl. Alhambra' },
    ]);
    console.log('Seeder Employees berhasil.');
  } catch (error) {
    console.error('Error saat menjalankan seeder Employees:', error);
  }
};

export default seedEmployees;
