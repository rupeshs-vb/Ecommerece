const {MongoClient}=require("mongodb");
const url="mongodb://localhost:27017";

// this function is used to insert data in mongoDB
const insertRoles=async ()=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        // here is my data that is going to be inserted
        const Roles=[
            {
                Name:"Admin",
                Slug:"Admin-main"
            },
            {
                Name:"User",
                Slug:"User-01"
            },
            {
                Name:"User",
                Slug:"User-02"
            },
            {
                Name:"User",
                Slug:"User-03"
            },
            {
                Name:"Agent",
                Slug:"Agent-01"
            },
            {
                Name:"Agent",
                Slug:"Agent-02"
            },
            {
                Name:"User",
                Slug:"User-04"
            },
            {
                Name:"Agent",
                Slug:"Agent-03"
            },
            {
                Name:"User",
                Slug:"User-05"
            },
            {
                Name:"User",
                Slug:"Agent-04"
            }
        ];

        const db=client.db("Ecommerce");
        db.collection('Roles').insertMany(Roles,(err,res)=>{
            if(err) throw err;
            console.log(`total record inserted in data bases ${res.insertedCount}`);
            client.close();
        }); 
    });
    
}

// this function convert the data into array from mongoDb and print on console
const ReadRoles=async()=>{
    MongoClient.connect(url,(err, client) => { 
        const db = client.db("Ecommerce");
        if (err) throw err; 
        db.collection("Roles").find().toArray((err, obj) => { 
            if (err) throw err; 
            console.log("your final Data")
            console.log(obj); 
            client.close(); 
        }); 
    });

}

// this function update the data according to the querry on mongoDb
const UpdateRoles=async()=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        
        const db=client.db("Ecommerce");
        const myQuery={Slug:"Agent-04"};
        const updatQuery={$set:{Name:"Agent"}};
        db.collection('Roles').updateMany(myQuery,updatQuery,(err,obj)=>{
            if(err) throw err;
            console.log(obj.modifiedCount+ " record updated");
            client.close();
        });
    });
    
}

//This function delete the data according to the querry on mongoDB
const DeleteData=async()=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;
    
        const db=client.db("Ecommerce")
        const myQuery={Slug:"User-05"}
        db.collection('Roles').deleteMany(myQuery,(err,obj)=>{
            if(err) throw err;
            console.log(obj.deletedCount+" records deleted")
            client.close();
        })
    })
}


/* here i create this below function to delete all the value from the mongoDB data base 
to run this just comment out main() and remove this functios from comment 
*/
// const deleteAllData=()=>{
//     MongoClient.connect(url,(err,client)=>{
//         if (err) throw err;

//         const db=client.db("Ecommerce");
//         db.collection("Roles").deleteMany({},(err,result)=>{
//             if (err) throw err;
//             console.log(result.deletedCount + " record deleted");
//             client.close();
//         })
//     })
// }
// deleteAllData()

// here i used main function to call function so it will come in proper order
const main=async()=>{
    await insertRoles()   
    await UpdateRoles()
    await DeleteData()
    await ReadRoles()
}
main()