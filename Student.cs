namespace StudentsAPI
{
    public class Student
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public string Major {  get; set; }
        public float Gpa { get; set; }  
    }
}
