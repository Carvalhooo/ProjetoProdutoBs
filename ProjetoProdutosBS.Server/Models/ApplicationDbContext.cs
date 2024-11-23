﻿using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ProjetoProdutosBS.Server.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Produto> Produtos { get; set; }
    }
}
