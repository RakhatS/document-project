using Microsoft.EntityFrameworkCore.Migrations;

namespace DocumentProject.WebAPI.Migrations
{
    public partial class UserPhotoUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Members",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Managers",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Managers");
        }
    }
}
