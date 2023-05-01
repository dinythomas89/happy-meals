using Dapper;
using MySql.Data.MySqlClient;

namespace HackYourFuture.Mealsharing;

public interface IMealsRepository
{
    Task<IEnumerable<Meal>> GetMeals();
    Task<Meal> GetMeal(int id);
    Task<Meal> CreateMeal(Meal meal);
}

public class MealsRepository : IMealsRepository
{
    private string connectionString;

    public MealsRepository(IConfiguration configuration)
    {
        this.connectionString = configuration.GetConnectionString("Default");
    }

    public async Task<IEnumerable<Meal>> GetMeals()
    {
        Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
        using var connection = new MySqlConnection(connectionString);
        var meals = await connection.QueryAsync<Meal>("SELECT * FROM meal_sharing.meal");
        return meals;
    }

    public async Task<Meal> GetMeal(int id)
    {
        using var connection = new MySqlConnection(connectionString);
        var meal = await connection.QueryFirstOrDefaultAsync<Meal>($"SELECT * FROM meal_sharing.meal WHERE id = {id}");
        return meal;
    }

    public async Task<Meal> CreateMeal(Meal meal)
    {
        await using var connection = new MySqlConnection(connectionString);
        var id = await connection.ExecuteScalarAsync<int>("INSERT INTO meal_sharing.meal (title, description, location,`when`, max_reservations, price,  created_date ) VALUES (@title, @description,@location,@when,@max_reservations,@price, @created_date); select LAST_INSERT_ID();", meal);//when is a reserved keyword in mysql. So using when should be in backticks
        meal.id = id;
        return meal;
    }
}

public class Meal
{
    public int id { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public string location { get; set; }
    public DateTime when { get; set; }
    // [JsonPropertyName("max_reservations")]
    public int max_reservations { get; set; }
    //public int MaxReservations { get; set; }
    public decimal price { get; set; }
    public DateTime created_date { get; set; }
}