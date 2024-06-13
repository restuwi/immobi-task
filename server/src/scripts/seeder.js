import seedDepartments from "../seeders/DepartmentSeeder.js";
import seedJobs from "../seeders/JobSeeder.js";
import seedEmployees from "../seeders/EmployeeSeeder.js";
const runSeeders = async () => {
  try {
    await seedDepartments();
    await seedJobs();
    await seedEmployees();
    console.log('Semua seeders berhasil dijalankan.');
  } catch (error) {
    console.error('Error saat menjalankan seeders:', error);
  }
};

runSeeders();
