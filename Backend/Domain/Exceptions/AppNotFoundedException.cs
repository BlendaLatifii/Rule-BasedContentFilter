using Domain.Constants;

namespace Domain.Exceptions
{
    public class AppNotFoundedException : Exception
    {
        public AppNotFoundedException() : base(ErrorMessage.NotFounded) { }
    }
}
