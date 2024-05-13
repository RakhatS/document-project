using AutoMapper;

namespace DocumentProject.WebAPI.Helpers
{
    public class MapperInitializer
    {
        private static readonly object _locker = new object();
        public static void Initialize()
        {
            lock (_locker)
            {
                Mapper.Reset();
                Mapper.Initialize(cfg =>
                {
                });
            }

        }

        static byte[] FileToBinary(string imagePath)
        {
            if (string.IsNullOrEmpty(imagePath)) return null;
            FileStream fS = new FileStream(imagePath, FileMode.Open, FileAccess.Read);
            byte[] b = new byte[fS.Length];
            fS.Read(b, 0, (int)fS.Length);
            fS.Close();
            return b;
        }

    }
}