// Import MongoDB libraries
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class FinanceTracker {
    MongoClient mongoClient = new MongoClient("localhost", 27017);
    MongoDatabase database = mongoClient.getDatabase("financeDB");
    MongoCollection<Document> transactions = database.getCollection("transactions");

    // Add transaction to MongoDB
    public void addTransaction(String type, double amount) {
        Document transaction = new Document("type", type)
                                   .append("amount", amount);
        transactions.insertOne(transaction);  // Store in MongoDB
    }

    // Fetch all transactions
    public void fetchTransactions() {
        for (Document transaction : transactions.find()) {
            System.out.println(transaction.toJson());
        }
    }
}
