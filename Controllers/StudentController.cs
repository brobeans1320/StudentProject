using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentsAPI.Services;

namespace StudentsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet("getStudents")]
        public async Task<List<Student>> SelectAllStudents()
        {
            List<Student> studentList = await _studentService.SelectAllStudents();
            return studentList;
        }

        [HttpPost("createStudent")]
        public  async Task<ActionResult<int>> CreateStudent(Student student)
        {
            var result = await _studentService.CreateStudent(student);
            return Ok(result);
        }

        [HttpPut("updateStudent")]
        public async Task<ActionResult<int>> UpdateStudent([FromBody] Student student)
        {
            var result = await _studentService.UpdateStudent(student);

            if(result == 1)
            {
                return Ok(result);
            }
            return Ok("There is no student to update.");
        }

        [HttpDelete("deleteStudent/{id}")]
        public async Task<ActionResult<int>> DeleteStudent(int id)
        {
            var result = await _studentService.DeleteStudent(id);

            if(result == 1)
            {
                return Ok(result);
            }
            return Ok("Student not found.");

        }
    }
}
