/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();


//create a get request on client side 
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey ='&appid=9a3f38ecdf2a0144fa1517eab98d78c5&units=imperial'


// event listener for generate 
document.getElementById('generate').addEventListener('click' , giveData);

// create function to receive  zip and feeling from the user 
function giveData(){
    const zipCode = document.getElementById('zip').value;
    const userFeeling = document.getElementById('feelings').value;

    //consol.log(`zip` , zipCode ,"userFeeling" , userFeeling)
    //baseURL=`http://api.openweathermap.org/data/2.5/weather?q=zip=${zipCode}&appid=${apiKey}`
    
    //new function to hold 3 parameters baseURL , zipCode , apiKey
    weather (baseURL,zipCode,apiKey)
.then (function (data){
    console.log(data);

    //postdata to post request 

    postData('/postData' ,{
        date: newDate ,
        temp : data.main.temp,
        content :userFeeling,
        })

    UI();
})

}

// GET web ApI function 
const weather = async( baseURL ,zip ,Key)=>{
    const res = await fetch(baseURL + zip +Key)
    try{
        const data =await res.json();
        console.log(data);
        return data ;
    }catch(error){
        console.log('error' , error)
    }
}

// postData function 
const postData = async ( URL ='' , data={})=>{
    console.log(data);
    const response = await fetch(URL ,{
        method : 'post',
        credentials: 'same-origin',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data)
    })
    try {
        const newData =await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log('error' ,error)
    }
}


// updating UI 

const UI= async()=>{
    const request =await fetch('/allWeaterData');
    try{
        const allData= await request.json();
        document.getElementById('date').innerHTML=`date: ${allData.date}`;
        document.getElementById('temp').innerHTML=`the temperature is : ${allData.temp}`;
        document.getElementById('content').innerHTML=`my feeling is : ${allData.content}`;
    }catch(error){
        console.log('error',error);
    }
}