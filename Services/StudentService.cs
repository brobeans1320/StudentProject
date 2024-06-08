using Npgsql;
using Microsoft.Data.SqlClient;

namespace StudentsAPI.Services
{
    public interface IStudentService
    {
        Task<List<Student>> SelectAllStudents();
        Task<int> CreateStudent(Student newStudent);
        Task<int> UpdateStudent(Student newStudent);
        Task<int> DeleteStudent(int studentId);

        public class StudentService : IStudentService
        {
            private readonly IConfiguration _configuration;
            private string _conn;
            public StudentService(IConfiguration configuration)
            {
                _configuration = configuration;
                _conn = _configuration.GetConnectionString("StudentServer");
            }

            public async Task<List<Student>> SelectAllStudents()
            {
                try
                {
                    List<Student> studentList = new List<Student>();

                    using (var conn = new SqlConnection(_conn))
                    {
                        conn.Open();
                        using (var cmdSelectAll = new SqlCommand("selectAllStudents", conn))
                        {
                            cmdSelectAll.CommandType = System.Data.CommandType.StoredProcedure;             
                            using (var reader = cmdSelectAll.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    Student newStudent = new Student();

                                    newStudent.Id = Convert.ToInt32(reader["Id"]);
                                    newStudent.FirstName = reader["FirstName"].ToString();
                                    newStudent.LastName = reader["LastName"].ToString();
                                    newStudent.DateOfBirth = reader.GetDateTime(reader.GetOrdinal("DateOfBirth"));
                                    newStudent.Age = Convert.ToInt32(reader["Age"]);
                                    newStudent.Major = reader["Major"].ToString();
                                    newStudent.Gpa = Convert.ToSingle(reader["Gpa"]);

                                    studentList.Add(newStudent);
                                }
                            }
                        }
                        return studentList;
                    }
                }
                catch
                {
                    throw new Exception();
                }
            }

            public async Task<int> CreateStudent(Student newStudent)
            {
                try
                {
                    var result = 0;

                    using (var conn = new SqlConnection(_conn))
                    {
                        conn.Open();
                        using (var cmdCreateStudent = new SqlCommand("createStudent", conn))
                        {
                            cmdCreateStudent.CommandType = System.Data.CommandType.StoredProcedure;

                            cmdCreateStudent.Parameters.AddWithValue("@FirstName", newStudent.FirstName);
                            cmdCreateStudent.Parameters.AddWithValue("@LastName", newStudent.LastName);
                            cmdCreateStudent.Parameters.AddWithValue("@DateOfBirth", newStudent.DateOfBirth);
                            cmdCreateStudent.Parameters.AddWithValue("@Age", newStudent.Age);
                            cmdCreateStudent.Parameters.AddWithValue("@Major", newStudent.Major);
                            cmdCreateStudent.Parameters.AddWithValue("@Gpa", newStudent.Gpa);

                            result = cmdCreateStudent.ExecuteNonQuery();
                        }
                    }
                    return result;
                }
                catch
                {
                    throw new Exception();
                }
            }

            public async Task<int> UpdateStudent(Student newStudent)
            {
                try
                {
                    var result = 0;

                    using (var conn = new SqlConnection(_conn))
                    {
                        conn.Open();
                        using (var cmdUpdateStudent = new SqlCommand("UpdateStudent", conn))
                        {
                            cmdUpdateStudent.CommandType = System.Data.CommandType.StoredProcedure;

                            cmdUpdateStudent.Parameters.AddWithValue("@Id", newStudent.Id);
                            cmdUpdateStudent.Parameters.AddWithValue("@FirstName", newStudent.FirstName);
                            cmdUpdateStudent.Parameters.AddWithValue("@LastName", newStudent.LastName);
                            cmdUpdateStudent.Parameters.AddWithValue("@DateOfBirth", newStudent.DateOfBirth);
                            cmdUpdateStudent.Parameters.AddWithValue("@Age", newStudent.Age);
                            cmdUpdateStudent.Parameters.AddWithValue("@Major", newStudent.Major);
                            cmdUpdateStudent.Parameters.AddWithValue("@Gpa", newStudent.Gpa);

                            result = cmdUpdateStudent.ExecuteNonQuery();
                        }
                    }
                    return result;
                }
                catch
                {
                    throw new Exception();
                }
            }

            public async Task<int> DeleteStudent(int id)
            {
                try
                {
                    var result = 0;

                    using (var conn = new SqlConnection(_conn))
                    {
                        conn.Open();
                        using (var cmdDeleteStudent = new SqlCommand("DeleteStudent", conn))
                        {
                            cmdDeleteStudent.CommandType = System.Data.CommandType.StoredProcedure;

                            cmdDeleteStudent.Parameters.AddWithValue("@Id", id);
                                                        
                            result = cmdDeleteStudent.ExecuteNonQuery();
                        }
                    }
                    return result;
                }
                catch
                {
                    throw new Exception();
                }
            }
        }
    }
}
