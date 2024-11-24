import x from 'sqlite3';
const sqlite3=x.verbose();

// Connecting Database
export const db = new sqlite3.Database("database.db" , (err) => {
    if(err){
        console.log("Error Occurred - " + err.message);
    }else{
        console.log("DataBase Connected");
    }
})

const Contributors = `
CREATE TABLE IF NOT EXISTS contributors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount INTEGER NOT NULL,
    CheckoutRequestID TEXT NOT NULL,
    ExternalReference TEXT UNIQUE NOT NULL,
    MerchantRequestID TEXT NOT NULL,
    Phone TEXT NOT NULL,
    ResultCode INTEGER NOT NULL,
    ResultDesc TEXT NOT NULL,
    Status TEXT NOT NULL
)
`;

// Execute the SQL statement to create the table
function createTable(tableSql:string,tableName:string){
    db.serialize(() => {
        db.run(tableSql, function (error) {
            if (error) {
                return console.error(`Error creating ${tableName} table: ${error.message}`, error);
            }
            console.log(`${tableName} table created successfully`);
        });
    })
}

createTable(Contributors,'contributors')

// Close the database connection
// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Database connection closed');
// });