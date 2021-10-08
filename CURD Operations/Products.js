const {MongoClient}=require("mongodb");
const url="mongodb://localhost:27017";

// this function is used to insert data in mongoDB
const insertProducts=async ()=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        // here is my data that is going to be inserted
        const Products=[
            {
                Name:"Dell Mouse",
                Thumbnail:"http://dummyimage.com/300x300.png/ff4444/ffffff",
                Product_Gallery:{
                    image1:"http://dummyimage.com/120x100.png/ff4444/ffffff",
                    image2:"http://dummyimage.com/123x100.png/ff3333/ffffff"
                },
                Description:"Handfull mouse easy to use",
                Base_price:599,
                Sell_price:299,
                Category_Name:"Electronics",
                Tags:{
                    Name:"Best Mouse",
                    Slug:"Best-Mouse"
                },
                Additional_Information:"Quality of mouse is good"
            },
            {
                Name:"Hp Laptop",
                Thumbnail:"http://dummyimage.com/500x500.png/ff4444/ffffff",
                Product_Gallery:{
                    image1:"http://dummyimage.com/200x150.png/ff4444/ffffff",
                    image2:"http://dummyimage.com/200x150.png/ff3333/ffffff"
                },
                Description:"Best Laptop with windows Home",
                Base_price:49000,
                Sell_price:45000,
                Category_Name:"Electronics",
                Tags:{
                    Name:"Best Budget Laptop",
                    Slug:"Best-Budget-Laptop"
                },
                Additional_Information:"With 3 years warranty"
            },
            {
                Name:"Adidas Slippers",
                Thumbnail:"http://dummyimage.com/250x300.png/ff4444/ffffff",
                Product_Gallery:{
                    image1:"http://dummyimage.com/130x140.png/ff4444/ffffff",
                    image2:"http://dummyimage.com/143x130.png/ff3333/ffffff"
                },
                Description:"very confort to wear",
                Base_price:599,
                Sell_price:499,
                Category_Name:"Footwear",
                Tags:{
                    Name:"Best Slippers",
                    Slug:"Best-Slippers"
                },
                Additional_Information:"you can use this 24*7"
            },
            {
                Name:"Kitchen Knife",
                Thumbnail:"http://dummyimage.com/150x100.png/ff4444/ffffff",
                Product_Gallery:{
                    image1:"http://dummyimage.com/100x100.png/ff4444/ffffff",
                    image2:"http://dummyimage.com/100x100.png/ff3333/ffffff"
                },
                Description:"Very Sharped knife. Easy to use",
                Base_price:199,
                Sell_price:149,
                Category_Name:"Home Appliances",
                Tags:{
                    Name:"Kitchen Appliances",
                    Slug:"Kitchen-Appliances"
                },
                Additional_Information:"Be safe to use this"
            },
            {
                Name:"JBL Earphone",
                Thumbnail:"http://dummyimage.com/130x130.png/ff4444/ffffff",
                Product_Gallery:{
                    image1:"http://dummyimage.com/100x90.png/ff4444/ffffff",
                    image2:"http://dummyimage.com/90x100.png/ff3333/ffffff"
                },
                Description:"With high noise cancellation",
                Base_price:1199,
                Sell_price:799,
                Category_Name:"Home Appliances",
                Tags:{
                    Name:"Quality Earphones",
                    Slug:"Quality-Earphones"
                },
                Additional_Information:"with extra ear bud"
            }
        ];

        const db=client.db("Ecommerce");
        db.collection('Products').insertMany(Products,(err,res)=>{
            if(err) throw err;
            console.log(`total record inserted in data bases ${res.insertedCount}`);
            client.close();
        }); 
    });
    
}

// this function update the data according to the querry on mongoDb
const UpdateProducts=async()=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        
        const db=client.db("Ecommerce");
        const myQuery={Name:"JBL Earphone"};
        const updatQuery={$set:{Category_Name:"Electronics",}};
        db.collection('Products').updateMany(myQuery,updatQuery,(err,obj)=>{
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
        const myQuery={Name:"Adidas Slippers"}
        db.collection('Products').deleteMany(myQuery,(err,obj)=>{
            if(err) throw err;
            console.log(obj.deletedCount+" records deleted")
            client.close();
        })
    })
}

// this function convert the data into array from mongoDb and print on console
const ReadProducts=async()=>{
    MongoClient.connect(url,(err, client) => { 
        const db = client.db("Ecommerce");
        if (err) throw err; 
        db.collection("Products").find().toArray((err, obj) => { 
            if (err) throw err; 
            console.log("your final Data")
            console.log(obj); 
            client.close(); 
        }); 
    });

}


/* here i create this below function to delete all the value from the mongoDB data base 
to run this just comment out main() and remove this functios from comment 
*/
// const deleteAllData=()=>{
//     MongoClient.connect(url,(err,client)=>{
//         if (err) throw err;

//         const db=client.db("Ecommerce");
//         db.collection("Products").deleteMany({},(err,result)=>{
//             if (err) throw err;
//             console.log(result.deletedCount + " record deleted");
//             client.close();
//         })
//     })
// }
// deleteAllData()

// here i used main function to call function so it will come in proper order
const main=async()=>{
    await insertProducts()   
    await UpdateProducts()
    await DeleteData()
    await ReadProducts()
}
main()