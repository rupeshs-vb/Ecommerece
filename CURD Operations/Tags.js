const {MongoClient}=require("mongodb");
const url="mongodb://localhost:27017";

// this function is used to insert data in mongoDB
const insertTags=async ()=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        // here is my data that is going to be inserted
        const Tags=[
            {
                Name:"Best Budget Laptop",
                Slug:"Best-Budget-Laptop"
            },
            {
                Name:"Phone Collections",
                Slug:"Phone-Collections"
            },
            {
                Name:"Round Neck Shirt",
                Slug:"Round-Neck-Shirt"
            },
            {
                Name:"Kitchen Appliances",
                Slug:"Kitchen-Appliances"
            },
            {
                Name:"Best Slippers",
                Slug:"Best-Slippers"
            },
            {
                Name:"Cheap Mouse",
                Slug:"Cheap-Mouse"
            },
            {
                Name:"Printed Shirt",
                Slug:"Printed-Shirt"
            },
            {
                Name:"Quality Earphones",
                Slug:"Quality-Earphones"
            },
            {
                Name:"New Collections",
                Slug:"New Collection"
            },
            {
                Name:"Cheap Items",
                Slug:"Cheap-Items"
            }
        ];

        const db=client.db("Ecommerce");
        db.collection('Tags').insertMany(Tags,(err,res)=>{
            if(err) throw err;
            console.log(`total record inserted in data bases ${res.insertedCount}`);
            client.close();
        }); 
    });
    
}

// this function convert the data into array from mongoDb and print on console
const ReadTags=async()=>{
    MongoClient.connect(url,(err, client) => { 
        const db = client.db("Ecommerce");
        if (err) throw err; 
        db.collection("Tags").find().toArray((err, obj) => { 
            if (err) throw err; 
            console.log("your final Data")
            console.log(obj); 
            client.close(); 
        }); 
    });

}

// this function update the data according to the querry on mongoDb
const UpdateTags=async()=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        
        const db=client.db("Ecommerce");
        const myQuery={Name:"New Collections"};
        const updatQuery={$set:{Slug:"New-Collection"}};
        db.collection('Tags').updateMany(myQuery,updatQuery,(err,obj)=>{
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
        const myQuery={Slug:"Cheap-Items"}
        db.collection('Tags').deleteMany(myQuery,(err,obj)=>{
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
//         db.collection("Tags").deleteMany({},(err,result)=>{
//             if (err) throw err;
//             console.log(result.deletedCount + " record deleted");
//             client.close();
//         })
//     })
// }
// deleteAllData()

// here i used main function to call function so it will come in proper order
const main=async()=>{
    await insertTags()   
    await UpdateTags()
    await DeleteData()
    await ReadTags()
}
main()