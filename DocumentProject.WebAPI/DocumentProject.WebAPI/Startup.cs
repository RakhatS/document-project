﻿using DocumentProject.WebAPI.Abstract;
using DocumentProject.WebAPI.Helpers;
using DocumentProject.WebAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace DocumentProject.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connection = Configuration.GetConnectionString("DefaultConnection");
            //string connection = Configuration["DB_CONNECTION_STRING"];

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(connection));

            services.AddIdentity<IdentityUser, IdentityRole>(opts =>
            {
                opts.Password.RequiredLength = 5;   // минимальная длина
                opts.Password.RequireNonAlphanumeric = false;   // требуются ли не алфавитно-цифровые символы
                opts.Password.RequireLowercase = false; // требуются ли символы в нижнем регистре
                opts.Password.RequireUppercase = false; // требуются ли символы в верхнем регистре
                opts.Password.RequireDigit = false; // требуются ли цифры
            }).AddEntityFrameworkStores<ApplicationDbContext>();

            //services.AddIdentityCore<IdentityUser>(options =>
            //{
            //    //options.SignIn.RequireConfirmedAccount = true;
            //    options.Password.RequireNonAlphanumeric = false;
            //})
            //  .AddEntityFrameworkStores<ApplicationDbContext>()
            //  .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>(TokenOptions.DefaultProvider);




            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = AuthOptions.ISSUER,
                    ValidateAudience = true,
                    ValidAudience = AuthOptions.AUDIENCE,
                    ValidateLifetime = false,
                    IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                    ValidateIssuerSigningKey = true,
                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        if (string.IsNullOrEmpty(accessToken) == false)
                        {
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });

            var userPhotosDirectory = Configuration.GetSection("UserPhotosDirectory").Value;
            services.AddScoped<IFilesDestination>(s =>
            new FilesDestination(userPhotosDirectory));

            //var emailUsername = Configuration.GetSection("EmailUsername").Value;
            //var emailHost = Configuration.GetSection("EmailHost").Value;
            //var emailPassword = Configuration.GetSection("EmailPassword").Value;

            //services.AddScoped<IEmailService>(s =>
            //    new EmailService(emailUsername,
            //                    emailHost,
            //                    emailPassword));


            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .SetIsOriginAllowed(_ => true)
                        .AllowCredentials());
            });
            services.AddControllersWithViews()
              .AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            services.AddControllers(
    options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Diplomka.WebApi", Version = "v1" });
                c.AddSecurityDefinition("Bearer",
                  new OpenApiSecurityScheme
                  {
                      Description = "JWT Authorization header using the Bearer scheme.",
                      Type = SecuritySchemeType.Http,
                      Scheme = "bearer"
                  });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement{
                    {
                    new OpenApiSecurityScheme{
                        Reference = new OpenApiReference{
                        Id = "Bearer",
                        Type = ReferenceType.SecurityScheme
                        }
                        },new List<string>()
                    }
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Document.WebApi v1"));
            }

            using (var scope = app.ApplicationServices.CreateScope())
            {
                var dataContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                dataContext.Database.Migrate();
            }


            app.UseCors("CorsPolicy");
            //
            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
