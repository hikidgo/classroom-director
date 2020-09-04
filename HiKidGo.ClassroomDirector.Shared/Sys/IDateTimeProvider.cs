using System;

namespace HiKidGo.ClassroomDirector.Sys
{
    public interface IDateTimeProvider
    {
        DateTime GetUtcNow();
        DateTime GetNow();
    }
}