using System;
using System.Threading.Tasks;

namespace HiKidGo.ClassroomDirector.Caching
{
    public interface IMemoryDataServiceCache<TRequest, TResponse>
    {
        void Clear();
        TResponse Execute(Func<TRequest, TResponse> func, TRequest request, TimeSpan timeout);
        Task<TResponse> ExecuteAsync(Func<TRequest, Task<TResponse>> func, TRequest request, TimeSpan timeout);
        MemoryDataContainer<TResponse> Get(TRequest request);
        string GetHash(TRequest request);
        void Persist(TRequest request, TResponse response);
    }
}