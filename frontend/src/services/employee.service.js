import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

export const getEmployees = () => axios.get(API_URL);

export const getDeletedEmployees = () =>
  axios.get(`${API_URL}/deleted`);

export const createEmployee = data =>
  axios.post(API_URL, data);

export const updateEmployee = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteEmployee = id =>
  axios.delete(`${API_URL}/${id}`);


/* ========== FRONTEND SEARCH & FILTER LOGIC ========== */

export function applyEmployeeFilters(employees, filters) {
  const { search, organization, department, status } = filters;

  return employees.filter(emp => {
    // 🔍 Search (name, email, position, department)
    const matchSearch =
      !search ||
      `${emp.full_name} ${emp.email} ${emp.position} ${emp.department}`
        .toLowerCase()
        .includes(search.toLowerCase());

    // 🏢 Organization filter
    const matchOrganization =
      !organization || emp.organization === organization;

    // 🏷️ Department filter
    const matchDepartment =
      !department ||
      emp.department
        ?.toString()
        .trim()
        .toLowerCase()
        .includes(department.trim().toLowerCase());

    // 🚦 Status filter
    const matchStatus =
      !status || emp.status === status;

    // ✅ All filters must match
    return (
      matchSearch &&
      matchOrganization &&
      matchDepartment &&
      matchStatus
    );
  });
}


