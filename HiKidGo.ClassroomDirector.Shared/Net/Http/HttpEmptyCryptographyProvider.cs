using Microsoft.AspNetCore.DataProtection;
using System;
using System.Collections.Generic;
using System.Text;

namespace HiKidGo.ClassroomDirector.Net.Http
{
    public class HttpEmptyCryptographyProvider : IHttpCryptographyProvider
    {
        public IDataProtector Create()
        {
            return null;
        }
    }
}
