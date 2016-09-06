using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PlaymoWars.Startup))]
namespace PlaymoWars
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
