const {MongoClient}=require("mongodb");
const url="mongodb://localhost:27017";

// this function is used to insert data in mongoDB
const insertUsers=async ()=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;

        // here is my data that is going to be inserted
        const Users=[
            {
                First_Name:"Rupesh",
                Last_Name:"Sharma",
                Email:"Rupesh@gmail.com",
                Profile_Image:"https://dummyimage.com/124x100.png/5fa2dd/ffffff%22",
                Role:"Admin"
            },
            {
                First_Name:"Mohan",
                Last_Name:"Lal",
                Email:"Mohan@gmail.com",
                Profile_Image:"https://dummyimage.com/120x190.png/5fa2dd/ffffff%22",
                Role:"Agent"
            },
            {
                First_Name:"joshua",
                Last_Name:"nom",
                Email:"joshua@gmail.com",
                Profile_Image:"https://dummyimage.com/124x150.png/5fa2dd/ffffff%22",
                Role:"User"
            },
            {
                First_Name:"Normi",
                Last_Name:"Bin",
                Email:"Normi@gmail.com",
                Profile_Image:"teshttps://dummyimage.com/124x140.png/5fa2dd/ffffff%22t",
                Role:"Agent"
            },
            {
                First_Name:"Vishwas",
                Last_Name:"Kumar",
                Email:"Vishwas@gmail.com",
                Profile_Image:"https://dummyimage.com/150x80.png/5fa2dd/ffffff%22",
                Role:"Agent"
            },
            {
                First_Name:"Rahul",
                Last_Name:"Gandhi",
                Email:"Rahul@gmail.com",
                Profile_Image:"https://dummyimage.com/150x100.png/5fa2dd/ffffff%22",
                Role:"User"
            },
            {
                First_Name:"Monu",
                Last_Name:"Patel",
                Email:"Monu@gmail.com",
                Profile_Image:"https://dummyimage.com/200x100.png/5fa2dd/ffffff%22",
                Role:"user"
            },
            {
                First_Name:"Mohan",
                Last_Name:"Singh",
                Email:"Mohan@gmail.com",
                Profile_Image:"http://dummyimage.com/210x100.png/dddddd/000000",
                Role:"User"
            },
            {
                First_Name:"Virat",
                Last_Name:"Singh",
                Email:"Xyz@gmail.com",
                Profile_Image:"http://dummyimage.com/123x100.png/ff4444/ffffff",
                Role:"Agent"
            },
            {
                First_Name:"Himanhsu",
                Last_Name:"Singh",
                Email:"Himanshu@gmail.com",
                Profile_Image:"http://dummyimage.com/209x100.png/dddddd/000000",
                Role:"User"
            }
        ];

        const db=client.db("Ecommerce");
        db.collection('Users').insertMany(Users,(err,res)=>{
            if(err) throw err;
            console.log(`total record inserted in data bases ${res.insertedCount}`);
            client.close();
        }); 
    });
    
}

// this function convert the data into array from mongoDb and print on console
const ReadUsers=async()=>{
    MongoClient.connect(url,(err, client) => { 
        const db = client.db("Ecommerce");
        if (err) throw err; 
        db.collection("Users").find().toArray((err, obj) => { 
            if (err) throw err; 
            console.log("your final Data")
            console.log(obj); 
            client.close(); 
        }); 
    });

}

// this function update the data according to the querry on mongoDb
const UpdateUser=async()=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        
        const db=client.db("Ecommerce");
        const myQuery={Last_Name:'Lal'};
        const updatQuery={$set:{Last_Name:"Kumar"}};
        db.collection('Users').updateMany(myQuery,updatQuery,(err,obj)=>{
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
        const myQuery={First_Name:"Himanhsu"}
        db.collection('Users').deleteMany(myQuery,(err,obj)=>{
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
//         db.collection("Users").deleteMany({},(err,result)=>{
//             if (err) throw err;
//             console.log(result.deletedCount + " record deleted");
//             client.close();
//         })
//     })
// }
// deleteAllData()



// here i used main function to call function so it will come in proper order
const main=async()=>{

    await insertUsers()
    await UpdateUser()
    await DeleteData()
    await ReadUsers()

}
// here main() is calling
main()
