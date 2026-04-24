using API.Extensions;
using Infrastructure;
using Infrastructure.Data;
using Application;
using Microsoft.EntityFrameworkCore;
using FluentValidation.AspNetCore;
using Api.Middleware;
using Application.Validators;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AccessPolicy",
        builder =>
        {
            builder.AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowAnyOrigin();
        });
});

builder.Services.AddDbContext<AppDbContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddSwagger();
builder.Services.AddApplication();
builder.Services.AddInfrastructure();
builder.Services.AddMvc().AddFluentValidation(opt =>
{
    opt.RegisterValidatorsFromAssemblyContaining<AddRuleValidation>();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AccessPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseAppExceptionHandler();

app.MapControllers();

app.Run();
