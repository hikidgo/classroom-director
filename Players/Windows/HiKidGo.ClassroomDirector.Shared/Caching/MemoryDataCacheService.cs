using Newtonsoft.Json;
using HiKidGo.ClassroomDirector.Sys;
using System;
using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace HiKidGo.ClassroomDirector.Caching
{
    public class MemoryDataServiceCache<TRequest, TResponse> : IMemoryDataServiceCache<TRequest, TResponse>
    {
        private readonly ConcurrentDictionary<string, MemoryDataContainer<TResponse>> _dict;
        private readonly IDateTimeProvider _dateTimeProvider;

        public MemoryDataServiceCache(IDateTimeProvider dateTimeProvider)
        {
            _dict = new ConcurrentDictionary<string, MemoryDataContainer<TResponse>>();
            _dateTimeProvider = dateTimeProvider;
        }

        public MemoryDataContainer<TResponse> Get(TRequest request)
        {
            string hash = GetHash(request);

            if (_dict.ContainsKey(hash))
            {
                return _dict[hash];
            }

            return null;
        }

        public async Task<TResponse> ExecuteAsync(Func<TRequest, Task<TResponse>> func, TRequest request, TimeSpan timeout)
        {
            var container = this.Get(request);
            TResponse resp;

            if (container == null || _dateTimeProvider.GetNow() >= container.Created.Add(timeout))
            {
                resp = await func(request);
                if (resp != null)
                {
                    this.Persist(request, resp);
                }
            }
            else
            {
                resp = container.Response;
            }

            return resp;
        }

        public TResponse Execute(Func<TRequest, TResponse> func, TRequest request, TimeSpan timeout)
        {
            var container = this.Get(request);
            TResponse resp;

            if (container == null || _dateTimeProvider.GetNow() >= container.Created.Add(timeout))
            {
                resp = func(request);
                if (resp != null)
                {
                    this.Persist(request, resp);
                }
            }
            else
            {
                resp = container.Response;
            }

            return resp;
        }

        public void Persist(TRequest request, TResponse response)
        {
            string hash = GetHash(request);

            MemoryDataContainer<TResponse> container = new MemoryDataContainer<TResponse>()
            {
                Created = _dateTimeProvider.GetNow(),
                Hash = hash,
                Response = response
            };

            if (_dict.ContainsKey(hash))
            {
                MemoryDataContainer<TResponse> output = null;
                if (!_dict.TryRemove(hash, out output))
                    return;
            }

            _dict.TryAdd(hash, container);
        }

        public string GetHash(TRequest request)
        {
            using (var hasher = SHA1.Create())
            {
                string strJson = JsonConvert.SerializeObject(request);
                byte[] binary = Encoding.UTF8.GetBytes(strJson);
                return Convert.ToBase64String(hasher.ComputeHash(binary, 0, binary.Length));
            }
        }

        public void Clear()
        {
            _dict.Clear();
        }

    }

    public class MemoryDataContainer<TResponse>
    {
        public string Hash
        {
            get;
            set;
        }

        public DateTime Created
        {
            get;
            set;
        }

        public TResponse Response
        {
            get;
            set;
        }
    }
}


