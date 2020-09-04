using System;
using System.Collections.Generic;
using System.Text;

namespace HiKidGo.ClassroomDirector.Sys
{
    public class DateTimeProvider : IDateTimeProvider
    {
        public DateTime GetUtcNow()
        {
            return DateTime.UtcNow;
        }

        public DateTime GetNow()
        {
            return DateTime.Now;
        }
    }
}
