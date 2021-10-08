const {MongoClient}=require("mongodb");
const url="mongodb://localhost:27017";

// this function is used to insert data in mongoDB
const insertOrders=async ()=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        // here is my data that is going to be inserted
        const Orders=[
            {
                User_id:1099,
                Total_items:2,
                Products:[
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
                        Additional_information:"Quality of mouse is good"                        
                    },
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
                        Additional_information:"Quality of mouse is good"                        
                    }
                ],
                Billing_Address:"New Delhi,India",
                Shipping_Address:"Mumbai,India",
                Transaction_Status:"Success",
                Payment_mode:"Debit card",
                Payment_Status:"Success",
                Order_Status:"Success"
            },
            {
                "User id":1100,
                "Total items":1,
                Products:[
                    {
                        Name:"Hp Laptop",
                        Thumbnail:"http://dummyimage.com/500x500.png/ff4444/ffffff",
                        Product_Gallery:{
                            image1:"http://dummyimage.com/200x150.png/ff4444/ffffff",
                            image2:"http://dummyimage.com/200x150.png/ff3333/ffffff"
                        },
                        Description:"With windows Home| 256 Gb SSD",
                        Base_price:49000,
                        Sell_price:45000,
                        Category_Name:"Electronics",
                        Tags:{
                            Name:"Best Budget Laptop",
                            Slug:"Best-Budget-Laptop"
                        },
                        Additional_Information:"With 3 years warranty"
                    }
                ],
                Billing_Address:"Mumbai,India",
                Shipping_Address:"New Delhi,India",
                Transaction_Status:"Success",
                Payment_mode:"Debit card",
                Payment_Status:"Success",
                Order_Status:"Pending"
            },
            {
                User_id:1101,
                Total_items:1,
                Products:[
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
                        Additional_information:"Quality of mouse is good"                        
                    }
                ],
                Billing_Address:"Haryana,India",
                Shipping_Address:"Mumbai,India",
                Transaction_Status:"Failed",
                Payment_mode:"COD",
                Payment_Status:"Failed",
                Order_Status:"Failed"
            }
        ];

        const db=client.db("Ecommerce");
        db.collection('Orders').insertMany(Orders,(err,res)=>{
            if(err) throw err;
            console.log(`total record inserted in data bases ${res.insertedCount}`);
            client.close();
        }); 
    });
    
}

// this function convert the data into array from mongoDb and print on console
const ReadOrders=async()=>{
    MongoClient.connect(url,(err, client) => { 
        const db = client.db("Ecommerce");
        if (err) throw err; 
        db.collection("Orders").find().toArray((err, obj) => { 
            if (err) throw err; 
            console.log("your final Data")
            console.log(obj); 
            client.close(); 
        }); 
    });

}

// this function update the data according to the querry on mongoDb
const UpdateOrders=async()=>{
    MongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        
        const db=client.db("Ecommerce");
        const myQuery={Order_Status:"Pending"};
        const updatQuery={$set:{Order_Status:"Success",}};
        db.collection('Orders').updateMany(myQuery,updatQuery,(err,obj)=>{
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
        const myQuery={Order_Status:"Failed"}
        db.collection('Orders').deleteMany(myQuery,(err,obj)=>{
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
//         db.collection("Orders").deleteMany({},(err,result)=>{
//             if (err) throw err;
//             console.log(result.deletedCount + " record deleted");
//             client.close();
//         })
//     })
// }
// deleteAllData()

// here i used main function to call function so it will come in proper order
const main=async()=>{
    await insertOrders()   
    await UpdateOrders()
    await DeleteData()
    await ReadOrders()
}
main()