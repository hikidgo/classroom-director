using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace HiKidGo.ClassroomDirector.Net.Http
{
    public class HttpMaskService : IHttpMaskService
    {
        private readonly HashSet<string> _PROPS = new HashSet<string>(new[] { "access_token" });
        private const string _REDACTED = "***REDACTED***";

        public string MaskBody(string str, string contentType)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(str))
                {
                    foreach (var p in _PROPS)
                    {
                        str = Regex.Replace(str, "\"" + p + "\"\\s*:\\s*(\"[^\"]*\"|[^\\s,{}\"]*)", $"\"{p}\":\"{_REDACTED}\"");
                    }
                }
            }
            catch
            {
                return "error masking";
            }

            return str;
        }

        public string MaskHeader(string name, string value)
        {
            switch (name.Trim().ToLower())
            {
                case "authorization":
                    return "***REDACTED***";
            }
            return value;
        }
    }
}
