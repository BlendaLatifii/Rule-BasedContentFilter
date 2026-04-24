Rule-Based Content Filter 
Setup Instructions:

Clone the project 
Set connection string in appsettings.json:  
"ConnectionStrings": {
  "DefaultConnection": "your-sql-connection-string"
}

Run database migrations: Bash - dotnet ef database update or 
Open Package Manager Console in Visual Studio Select Default Project: Infrastructure and then write update-database
then run the backend (Bash dotnet run)  

frontend folder: install the dependencies (npm install) and then run project (npm run dev) 
