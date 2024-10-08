﻿using DocumentProject.WebAPI.Data.Abstract;
using Microsoft.AspNetCore.Identity;

namespace DocumentProject.WebAPI.Data
{
    public class Admin: Entity
    {
        public IdentityUser IdentityUser { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhotoUrl { get; set; }
    }
}
