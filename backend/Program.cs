using HackYourFuture.Mealsharing;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IMealsRepository, MealsRepository>();
builder.Services.AddScoped<IReservationsRepository, ReservationsRepository>();
builder.Services.AddScoped<IReviewsRepository, ReviewsRepository>();
var app = builder.Build();

app.MapGet("/api/meals", async (IMealsRepository mealsRepository) =>
{
    return await mealsRepository.GetMeals();
});

app.MapGet("api/meals/{id}", async (IMealsRepository mealsRepository, int id) =>
{
    return await mealsRepository.GetMeal(id);
});

app.MapPost("api/addMeal", async (IMealsRepository mealsRepository, Meal meal) =>
{
    return await mealsRepository.CreateMeal(meal);
});

app.MapGet("/api/reservations", async (IReservationsRepository reservationsRepository) =>
{
    return await reservationsRepository.GetReservations();
});

app.MapPost("api/addReservation", async (IReservationsRepository reservationsRepository, Reservation reservation) =>
{
    return await reservationsRepository.CreateReservation(reservation);
});

app.MapGet("/api/reviews", async (IReviewsRepository reviewsRepository) =>
{
    return await reviewsRepository.GetReviews();
});

app.MapPost("api/addReview", async (IReviewsRepository reviewsRepository, Review review) =>
{
    return await reviewsRepository.CreateReview(review);
});

app.Run();


