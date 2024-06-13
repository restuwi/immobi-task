import Job from '../models/Job.js';
import Department from '../models/Department.js';

const seedJobs = async () => {
  try {
    const departmentItDevelpment = await Department.findOne({ where: { department_name: 'IT Development' } });
    const departementFinance = await Department.findOne({ where: { department_name: 'Finance' } });

    await Job.bulkCreate([
      { department_id: departmentItDevelpment.id, job_title: 'FullStack Developer' },
      { department_id: departmentItDevelpment.id, job_title: 'BackEnd Developer' },
      { department_id: departmentItDevelpment.id, job_title: 'FrontEnd Developer' },
      { department_id: departementFinance.id, job_title: 'HRD' },
    ]);
    console.log('Seeder Jobs berhasil.');
  } catch (error) {
    console.error('Error saat menjalankan seeder Jobs:', error);
  }
};

export default seedJobs;
