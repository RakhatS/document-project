using AutoMapper;
using DocumentProject.WebAPI.Data;
using DocumentProject.WebAPI.DTO;

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
                    cfg.CreateMap<Manager, ManagerDTO>()
                    .ForMember(
                       dest => dest.Email,
                       opt => opt.MapFrom(src => src.IdentityUser.Email))
                    .ForMember(
                        dest => dest.PhotoBase64,
                        opt => opt.MapFrom(src => FileToBinary(src.PhotoUrl)));
                    cfg.CreateMap<Member, MemberDTO>()
                    .ForMember(
                       dest => dest.Email,
                       opt => opt.MapFrom(src => src.IdentityUser.Email))
                    .ForMember(
                        dest => dest.PhotoBase64,
                        opt => opt.MapFrom(src => FileToBinary(src.PhotoUrl)));

                    cfg.CreateMap<Application, ApplicationDTO>();
                    cfg.CreateMap<Organization, OrganizationDTO>();
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