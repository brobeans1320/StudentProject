# Student CRUD Project

1. Download the .zip file, extract the files. 

2. Open the StudentsAPI.sln file in Visual Studio.

3. Using the supplied Student-database file within the Database-Backup folder, create a new database within Microsoft SQL Management Studio. This backup contains the necessary scripts for creating the proper stored procedures for the API as well as prefilled sample data. Alternatively, you can use the included Jupyter Notebook.

4. Change the connection string in the appsettings.json to the proper database you created. For ex: 
"DefaultConnection": "server=localhost;database=test;trusted_connection=true;TrustServerCertificate=true".

5. In the Nuget Package Manager, install Microsoft.Data.SqlClient 5.2.1.

6. Run the solution, which starts the API.

7. This project uses Angular 16.2. Ensure you have a compatible Node.js version installed: https://angular.dev/reference/versions. If you use nvm (Node Version Manager), simply run ``nvm install 18.10.0`` in your terminal.

8. Finally, start the Angular project. In a terminal, navigate to the /StudentUI folder, and run ``npx ng serve`` if using nvm, or ``ng serve`` if using npm.
