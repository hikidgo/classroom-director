using Microsoft.AspNetCore.DataProtection;

namespace HiKidGo.ClassroomDirector.Net.Http
{
    public interface IHttpCryptographyProvider
    {
        public IDataProtector Create();
    }
}
