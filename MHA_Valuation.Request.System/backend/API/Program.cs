using Domain;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("ValuationDb"));

var app = builder.Build();

ConfigureServices(builder.Services);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

void ConfigureServices(IServiceCollection services)
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        if (!db.PropertyTypes.Any())
        {
            db.PropertyTypes.AddRange(
                new PropertyType { Name = "Residential", Code = "RES", IsActive = true },
                new PropertyType { Name = "Commercial", Code = "COM", IsActive = true },
                new PropertyType { Name = "Industrial", Code = "IND", IsActive = true }
            );

            db.SaveChanges();
        }
    }
}