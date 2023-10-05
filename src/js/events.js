function getDates(city){

   let citySelection = document.querySelector("#city");
   let dateSelection = document.querySelector("#date");
   let datesDropdown = document.querySelector("#dates");

    dateSelection.innerHTML = "";
    citySelection.innerHTML = "";
    
  
    if(city.trim() === ""){
       datesDropdown.disabled = true;
       datesDropdown.selectedIndex = 0;
       return false;
    }
  
    
    fetch("./events/events.json")
    .then(function(response){
       return response.json();
    })

    .then(function(data){
       let dates = data[city];
       let dat = "";
       dat += `<option value="">Choose dates</option>`;
       for(let date of dates){
          dat += `<option value="${date}">${date}</option>`;
       }
       datesDropdown.innerHTML = dat;
       datesDropdown.disabled = false;
       citySelection.innerHTML = city;
    });
 }

 function getDate(date){
   
   return document.querySelector("#date").innerHTML = date;
 }

