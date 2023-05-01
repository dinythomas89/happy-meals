using Dapper;
using MySql.Data.MySqlClient;

namespace HackYourFuture.Mealsharing;

public interface IReservationsRepository
{
    Task<IEnumerable<Reservation>> GetReservations();
    Task<Reservation> CreateReservation(Reservation reservation);
}

public class ReservationsRepository : IReservationsRepository
{
    private string connectionString;

    public ReservationsRepository(IConfiguration configuration)
    {
        this.connectionString = configuration.GetConnectionString("Default");
    }

    public async Task<IEnumerable<Reservation>> GetReservations()
    {
        using var connection = new MySqlConnection(connectionString);
        var reservations = await connection.QueryAsync<Reservation>("SELECT * FROM meal_sharing.reservation");
        return reservations;
    }

    public async Task<Reservation> CreateReservation(Reservation reservation)
    {
        await using var connection = new MySqlConnection(connectionString);
        var newReservation = await connection.ExecuteAsync("INSERT INTO meal_sharing.reservation (number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email ) VALUES (@number_of_guests, @meal_id,@created_date ,@contact_phonenumber,@contact_name,@contact_email)", reservation);
        return reservation;
    }
}

public class Reservation
{
    public int id { get; }
    public int number_of_guests { get; set; }
    public int meal_id { get; set; }
    public DateTime created_date { get; set; }
    public string contact_phonenumber { get; set; }
    public string contact_name { get; set; }
    public string contact_email { get; set; }
}