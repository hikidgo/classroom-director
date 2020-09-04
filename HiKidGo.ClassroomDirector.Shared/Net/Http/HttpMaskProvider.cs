namespace HiKidGo.ClassroomDirector.Net.Http
{
    public class HttpMaskProvider : IHttpMaskProvider
    {
        public IHttpMaskService Create()
        {
            return new HttpMaskService();
        }
    }
}
