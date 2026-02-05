using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HireHub.Referral.Migrations
{
    public partial class AddReferralStatusAndUniqueIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Convert status from string to enum (int)
            migrationBuilder.AlterColumn<int>(
                name: "status",
                table: "referrals",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(20)",
                oldMaxLength: 20);

            // Indexes for performance
            migrationBuilder.CreateIndex(
                name: "IX_referrals_candidate_id",
                table: "referrals",
                column: "candidate_id");

            migrationBuilder.CreateIndex(
                name: "IX_referrals_employee_id",
                table: "referrals",
                column: "employee_id");

            // UNIQUE constraint (business rule)
            migrationBuilder.CreateIndex(
                name: "IX_referrals_job_id_candidate_id",
                table: "referrals",
                columns: new[] { "job_id", "candidate_id" },
                unique: true);

            // Foreign keys
            migrationBuilder.AddForeignKey(
                name: "FK_referrals_candidates_candidate_id",
                table: "referrals",
                column: "candidate_id",
                principalTable: "candidates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_referrals_employees_employee_id",
                table: "referrals",
                column: "employee_id",
                principalTable: "employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_referrals_jobs_job_id",
                table: "referrals",
                column: "job_id",
                principalTable: "jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_referrals_candidates_candidate_id",
                table: "referrals");

            migrationBuilder.DropForeignKey(
                name: "FK_referrals_employees_employee_id",
                table: "referrals");

            migrationBuilder.DropForeignKey(
                name: "FK_referrals_jobs_job_id",
                table: "referrals");

            migrationBuilder.DropIndex(
                name: "IX_referrals_candidate_id",
                table: "referrals");

            migrationBuilder.DropIndex(
                name: "IX_referrals_employee_id",
                table: "referrals");

            migrationBuilder.DropIndex(
                name: "IX_referrals_job_id_candidate_id",
                table: "referrals");

            migrationBuilder.AlterColumn<string>(
                name: "status",
                table: "referrals",
                type: "varchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
