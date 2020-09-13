namespace HiKidGo.ClassroomDirector.Net.Http
{
    public interface IHttpMaskService
    {
        public string MaskBody(string str, string contentType);
        public string MaskHeader(string name, string value);
    }
}