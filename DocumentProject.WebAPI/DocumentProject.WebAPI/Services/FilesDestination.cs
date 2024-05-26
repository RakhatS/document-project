using DocumentProject.WebAPI.Abstract;

namespace DocumentProject.WebAPI.Services
{
    public class FilesDestination: IFilesDestination
    {
        private readonly string _userPhotosDirectory;
        public FilesDestination(string userPhotosDirectory)
        {
            _userPhotosDirectory = userPhotosDirectory; 
        }

        public string UserPhotosDirectory => _userPhotosDirectory;
    }
}
