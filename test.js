$(document).ready(function()
{   
	var date=new Date()
	date=date.toISOString(date);
	date=date.split("T");
	var today=date[0];
	today=today.split("-");
	var todaydate= today[2]+"/"+today[1]+"/"+today[0];
	var ekm="_id=307", alp="_id=301",idk="_id=306",kot="_id=304",tri="_id=303";
	
	var nextweek=parseInt(today[2])+7;
	var secondWeek=nextweek+7;
	var nextweek1= nextweek.toString()+"/"+today[1]+"/"+today[0];
	var nextweek2= secondWeek.toString()+"/"+today[1]+"/"+today[0];
	
	urlFirst="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district";

	urlLast="' -H 'accept: application/json";
	
	var display="";
	

	
	function ApiRequest(var district, var date1, var date2, var date3)
	{
		var dates=[date1,date2,date3];
		
		for(let x in dates)
			$.ajax({
				type:"GET",
				url:   urlFirst + district +"&date="+ dates[x] + urlLast,

				beforeSend: function()
				   {	//console.log("loading...");
						
				   },
				
			   success:function(data)
				{  
					//display+="<h1>Ernakulam Centers</h1>";
					//console.log(data);
					//console.log("On date:"+todaydate);
					//console.log("district: Ernakulam");
					display=ageCheck(data,display);
					$("#result").html(display);
					
				}
			});
	}
	
	
	
	
	
	
	
	setInterval(function(){ 
        $.ajax({
            type:"GET",
            url:   urlFirst + ekm +"&date="+ todaydate + urlLast,

            beforeSend: function()
               {	//console.log("loading...");
					
			   },
            
           success:function(data)
            {  
				display+="<h1>Ernakulam Centers</h1>";
				//console.log(data);
				//console.log("On date:"+todaydate);
				//console.log("district: Ernakulam");
				display=ageCheck(data,display);
				$("#result").html(display);
				
            }
        });

		$.ajax({
            type:"GET",
            url:   urlFirst + alp +"&date="+ todaydate + urlLast,

            beforeSend: function()
               {	//console.log("loading...");
					
			   },
            
           success:function(data)
            {  
				
				//console.log(data);
				//console.log("On date:"+todaydate);
				//console.log("district: Alappuzha");
				
				display+="<h1>Alapuzha Centers</h1>";
				display=ageCheck(data,display);
				$("#result").html(display);
				
            }
        });
		
		$.ajax({
            type:"GET",
            url:   urlFirst + idk +"&date="+ todaydate + urlLast,

            beforeSend: function()
               {	//console.log("loading...");
					
			   },
            
           success:function(data)
            {  
				//console.log(data);
				//console.log("On date:"+todaydate);
				//console.log("district: Idukki");
				
				display+="<h1>Idukki Centers</h1>";
				display=ageCheck(data,display);
				$("#result").html(display);
            }
        });
		
		
		$.ajax({
            type:"GET",
            url:   urlFirst + kot +"&date="+ todaydate + urlLast,

            beforeSend: function()
               {	//console.log("loading...");
					
			   },
            
           success:function(data)
            {  
				//console.log(data);
				//console.log("On date:"+todaydate);
				//console.log("district: Kottayam");
				
				display+="<h1>Kottayam Centers</h1>";
				display=ageCheck(data,display);
				$("#result").html(display);
            }
        });
		
		
		
		$.ajax({
            type:"GET",
            url:   urlFirst + tri +"&date="+ todaydate + urlLast,

            beforeSend: function()
               {	//console.log("loading...");
					
			   },
            
           success:function(data)
            {  
				//console.log(data);
				//console.log("On date:"+todaydate);
				//console.log("district: Trissur");
				
				display+="<h1>Trissur Centers</h1>";
				display=ageCheck(data,display);
				$("#result").html(display);

            }
        });
		display="";
	}, 10000);
	
	

     
    
        
});


function ageCheck(data,display)
{
	let flag=0, alarm=0;
	var output=display;
	//console.log("\n\n\n________centers were age limit satisfies_______\n\n")
	for (let x in data.centers)
	{
		for(let y in data.centers[x].sessions)
		if((data.centers[x].sessions[y].min_age_limit<30) && (data.centers[x].sessions[y].available_capacity_dose1>0))
		{
			output+="Center:"+data.centers[x].name+"<br>";
			//console.log("center:"+data.centers[x].name);
			output+="Date:"+data.centers[x].sessions[y].date+"<br>";
			output+="Mininum Agelimit:"+data.centers[x].sessions[y].min_age_limit+"<br>"
			//console.log("agelimit:"+data.centers[x].sessions[0].min_age_limit+"\n\n");
			output+="No. of dose 1 available:"+data.centers[x].sessions[y].available_capacity_dose1+"<br>";
			output+="Fee type:"+data.centers[x].fee_type+"<br><br>";
			if(data.centers[x].fee_type=="Free")
				alarm=1;
			flag=1;
		}
		else
		{
			//output+="No dose available in"+data.centers[x].name+"<br><br>";
			//console.log("No dose available in"+data.centers[x].name);

		}
	}
	if(flag==0)
		output+="No doses available<br>";
	
	  if((alarm==1) &&(document.getElementById('toggleb').value=="on") && (flag==1))
		playaudiofree(); 
		
		else if((alarm==0) &&(document.getElementById('toggleb').value=="on") && (flag==1))
		{
			//playaudiopaid();			for paid notification
		}

	output+="</p>"
	return (output);
}


 function playaudiofree(){


  document.getElementById('myAudiofree').play();

} 

 function playaudiopaid(){


  //document.getElementById('myAudiopaid').play();

} 

var sound="off";
function soundonoff()
{
	if(sound=="on") {
		sound="off";	
		document.getElementById('toggleb').innerHTML=" Sound On ";	
		document.getElementById('toggleb').value="off"; 
		console.log("sound off");
		document.getElementById('myAudiofree').pause();
		document.getElementById('myAudiopaid').pause();
		alert("Sound turned off");
		}
	else if(sound=="off")	{
		sound="on";  	
		document.getElementById('toggleb').innerHTML=" Sound Off ";	
		document.getElementById('toggleb').value="on"; 
		console.log("sound on");
		alert("Sound turned on");
		}
}


 





