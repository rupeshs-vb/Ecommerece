const {MongoClient}=require("mongodb");
const url="mongodb://localhost:27017";

// this function is used to insert data in mongoDB
const insertCategories=async ()=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        // here is my data that is going to be inserted
        const Categories=[
            {
                Name:"Electronics",
                Slug:"Electronincs-01",
                image:
                    {
                        image1:"https://www.pexels.com/photo/photography-of-laptop-computer-camera-smartphone-headphones-and-mug-705164/",
                        image2:"https://www.pexels.com/photo/silver-iphone-6-on-white-table-4065899/"
                    },
                Description:"This categories is for Electronics items"
            },
            {
                Name:"Home Appliances",
                Slug:"Home-Appliances-01",
                image:
                    {
                        image1:"https://www.pexels.com/photo/photo-of-vegetables-beside-gray-electric-kettle-1370082/",
                        image2:"https://www.pexels.com/photo/white-wooden-kitchen-cabinet-1599791/"
                    },
                Description:"This categories is for Home Appliances items"
            },
            {
                Name:"Mens Clothing",
                Slug:"Mens-Clothing-01",
                image:
                    {
                        image1:"https://www.pexels.com/photo/man-in-a-side-view-standing-and-tied-with-a-red-tape-9760251/",
                        image2:"https://www.pexels.com/photo/pair-of-brown-leather-casual-shoes-on-table-298863/"
                    },
                Description:"This categories is for Mens Clothing items"
            },
            {
                Name:"Womens Clothing",
                Slug:"Womens-Clothing-01",
                image:
                    {
                        image1:"https://www.pexels.com/photo/midsection-of-woman-in-green-jacket-and-skirt-9770969/",
                        image2:"https://www.pexels.com/photo/woman-in-white-clothes-holding-flowers-above-her-head-8377420/"
                    },
                Description:"This categories is for Mens Clothing items"
            },
            {
                Name:"Footwear",
                Slug:"Footwear-01",
                image:
                    {
                        image1:"https://www.pexels.com/photo/a-person-wearing-denim-pants-and-white-sneakers-8989485/",
                        image2:"https://www.pexels.com/photo/a-person-wearing-denim-pants-and-white-sneakers-8989485/"
                    },
                Description:"This categories is for Footwear items"
            }
        ];

        const db=client.db("Ecommerce");
        db.collection('Categories').insertMany(Categories,(err,res)=>{
            if(err) throw err;
            console.log(`total record inserted in data bases ${res.insertedCount}`);
            client.close();
        }); 
    });
    
}

// this function convert the data into array from mongoDb and print on console
const ReadCategories=async()=>{
    MongoClient.connect(url,(err, client) => { 
        const db = client.db("Ecommerce");
        if (err) throw err; 
        db.collection("Categories").find().toArray((err, obj) => { 
            if (err) throw err; 
            console.log("your final Data")
            console.log(obj); 
            client.close(); 
        }); 
    });

}

// this function update the data according to the querry on mongoDb
const UpdateCategories=async()=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        
        const db=client.db("Ecommerce");
        const myQuery={Name:"Womens Clothing"};
        const updatQuery={$set:{Description:"This categories is for Womens Clothing items"}};
        db.collection('Categories').updateMany(myQuery,updatQuery,(err,obj)=>{
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
        const myQuery={Name:"Footwear"}
        db.collection('Categories').deleteMany(myQuery,(err,obj)=>{
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
//         db.collection("Categories").deleteMany({},(err,result)=>{
//             if (err) throw err;
//             console.log(result.deletedCount + " record deleted");
//             client.close();
//         })
//     })
// }
// deleteAllData()


// here i used main function to call function so it will come in proper order
const main=async()=>{
    await insertCategories()   
    await UpdateCategories()
    await DeleteData()
    await ReadCategories()
}
main()