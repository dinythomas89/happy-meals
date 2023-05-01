using Dapper;
using MySql.Data.MySqlClient;

namespace HackYourFuture.Mealsharing;

public interface IReviewsRepository
{
    Task<IEnumerable<Review>> GetReviews();
    Task<Review> CreateReview(Review review);
}

public class ReviewsRepository : IReviewsRepository
{
    private string connectionString;

    public ReviewsRepository(IConfiguration configuration)
    {
        this.connectionString = configuration.GetConnectionString("Default");
    }

    public async Task<IEnumerable<Review>> GetReviews()
    {
        using var connection = new MySqlConnection(connectionString);
        var reviews = await connection.QueryAsync<Review>("SELECT * FROM meal_sharing.review");
        return reviews;
    }
    public async Task<Review> CreateReview(Review review)
    {
        await using var connection = new MySqlConnection(connectionString);
        var newReview = await connection.ExecuteAsync("INSERT INTO meal_sharing.review (title, description, meal_id, stars, created_date ) VALUES (@title, @description,@meal_id,@stars, @created_date)", review);
        return review;
    }
}

public class Review
{
    public int id { get; }
    public string title { get; set; }
    public string description { get; set; }
    public int meal_id { get; set; }
    public int stars { get; set; }
    public DateTime created_date { get; set; }
}
