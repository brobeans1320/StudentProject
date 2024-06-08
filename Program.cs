using StudentsAPI;
using StudentsAPI.Controllers;
using StudentsAPI.Services;
using static StudentsAPI.Services.IStudentService;

var builder = WebApplication.CreateBuilder(args);
var StudentOrigins = "StudentOrigins";

// Add services to the container.
builder.Services.AddSingleton<IStudentService, StudentService>();
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: StudentOrigins,
        policy => 
        policy.WithOrigins("http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(StudentOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();