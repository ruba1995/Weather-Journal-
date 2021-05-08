/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();


//create a get request on client side 
let baseURL = 'api.openweathermap.org/data/2.5/weather?q=zip='
let apiKey ='9a3f38ecdf2a0144fa1517eab98d78c5'


// event listener for generate 
document.getElementById('generate').addEventListener('click' , giveData);

// create function to receive  zip and feeling from the user 
function giveData(){
    const zipCode = document.getElementById('zip').value;
    const userFeeling = document.getElementById('feelings').value;
    
    //new function to hold 3 parameters baseURL , zipCode , apiKey
    weather (baseURL,zipCode,apiKey)
.then (function (data){
    console.log(data);

    //add data to post request 

    postData('/addData' ,{
        data: newDate ,
        temp : data.list[0].main.temp,
        content :userFeeling, 
    })

    UI();
})

}

// GET web ApI function 
const weather = async( baseURL ,zip ,Key)=>{
    const res = await fetch(baseURL , zip ,Key)
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
        document.getElementById('date').innerHTML=`date : ${allData[0].date}`;
        document.getElementById('temp').innerHTML=`the temperature is  : ${allData[0].temp}`;
        document.getElementById('content').innerHTML=`my feeling is : ${allData[0].content}`;
    }catch(error){
        console.log('error',error);
    }
}