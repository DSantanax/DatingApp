namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dob)
        {
            var today = DateTime.Today;

            var age = today.Year - dob.Year;
            // If bday has not occured yet
            if(dob.Date > today.AddYears(-age))
            {
                age--;
            }
            return age;
        }
    }
}
