$(document).ready(function()
{   
	$("#OTP").hide();
	var date=new Date()
	date=date.toISOString(date);
	date=date.split("T");
	var today=date[0];
	today=today.split("-");
	var todaydate= today[2]+"-"+today[1]+"-"+today[0];
	var ekm="_id=307", alp="_id=301",idk="_id=306",kot="_id=304",tri="_id=303";
	

	console.log("Age upto:"+minAge);
	console.log("Maximum Acceptable Fees:"+minFee);
	
	var nextweek=parseInt(today[2])+7;
	if(nextweek>=31)
	{
		if(parseInt(today[1])%2)
			nextweek=7-(30-parseInt(today[2]));
		else
			nextweek=7-(31-parseInt(today[2]));
		today[1]=parseInt(today[1])+1;
		
	}
	var nextweek1= nextweek.toString()+"-"+today[1]+"-"+today[0];
	var secondWeek=nextweek+7;
	
	if(secondWeek>=31)
	{
		if(parseInt(today[1])%2)
			secondWeek=(7-(31-nextweek));
		else
			secondWeek=(7-(30-nextweek));
		today[1]=(parseInt(today[1])+1);
	}
	
	var nextweek2= secondWeek.toString()+"-"+today[1]+"-"+today[0];

	
	console.log(todaydate);console.log(nextweek1);console.log(nextweek2);
	
	urlFirst="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district";

	urlLast="' -H 'accept: application/json";
	
	var display="";
	


	
	function ApiRequest( district,  date1,  date2,  date3)
	{
		var dates=[date1,date2,date3];
		
		for(let x in dates)
			$.ajax({
				type:"GET",
				url:   urlFirst + district +"&date="+ dates[x],
				

				beforeSend: function()
				   {	
						//console.log("loading...");
						//console.log(dates[x]);
						//console.log(urlFirst + district +"&date="+ dates[x]);
				   },
				
			   success:function(data)
				{  
					
					if((district==ekm)  && (x==0) )	$("#ekm_w1").html(ageCheck(data,display,x));
					else if((district==ekm)  && (x==1)) $("#ekm_w2").html(ageCheck(data,display,x));
					else if((district==ekm)  && (x==2))	$("#ekm_w3").html(ageCheck(data,display,x));
					
					
					if((district==alp)  && (x==0) )	$("#alp_w1").html(ageCheck(data,display,x));
					else if((district==alp)  && (x==1)) $("#alp_w2").html(ageCheck(data,display,x));
					else if((district==alp)  && (x==2)) $("#alp_w3").html(ageCheck(data,display,x));
					
					
					if((district==idk)  && (x==0) )	$("#idk_w1").html(ageCheck(data,display,x));
					else if((district==idk)  && (x==1) ) $("#idk_w2").html(ageCheck(data,display,x));
					else if((district==idk)  && (x==2) ) $("#idk_w3").html(ageCheck(data,display,x));
					
					
					if((district==kot)  && (x==0) )	$("#kot_w1").html(ageCheck(data,display,x));
					else if((district==kot)  && (x==1) )	$("#kot_w2").html(ageCheck(data,display,x));
					else if((district==kot)  && (x==2) )	$("#kot_w3").html(ageCheck(data,display,x));

					
					
					if((district==tri)  && (x==0) )	$("#tri_w1").html(ageCheck(data,display,x));
					else if((district==tri)  && (x==1) )	$("#tri_w2").html(ageCheck(data,display,x));
					else if((district==tri)  && (x==2) )	$("#tri_w3").html(ageCheck(data,display,x));
					
				}
			});
	}

		setInterval(function(){ 
		
			display="";

			ApiRequest(ekm, todaydate, nextweek1, nextweek2);
			
			display="";
			
			ApiRequest(alp, todaydate, nextweek1, nextweek2);
			
			display="";
			
			ApiRequest(idk, todaydate, nextweek1, nextweek2);
			
			display="";
			
			ApiRequest(kot, todaydate, nextweek1, nextweek2);
			
			display="";
		
			ApiRequest(tri, todaydate, nextweek1, nextweek2);


			
		}, 10000);


});
	
	
	
	
	
	
	
	const minAge=30, minFee=300;
	


function ageCheck(data,display,y)
{
	let flag=0, alarm=0;
	var output=display;
	
	for (let x in data.centers)
	{
		for(let y in data.centers[x].sessions)
		if((data.centers[x].sessions[y].min_age_limit<minAge) && (data.centers[x].sessions[y].available_capacity_dose1>0))
		{
			output+="Center:"+data.centers[x].name+"<br>";
			output+="Date:"+data.centers[x].sessions[y].date+"<br>";
			output+="Mininum Agelimit:"+data.centers[x].sessions[y].min_age_limit+"<br>"
			output+="No. of dose 1 available:"+data.centers[x].sessions[y].available_capacity_dose1+"<br>";
			output+="Fee type:"+data.centers[x].fee_type+"<br>";
			
			if(data.centers[x].fee_type=="Paid")
				for(let z in data.centers[x].vaccine_fees)
				{	
					output+="Price:"+data.centers[x].vaccine_fees[z].fee+"<br>";	
					if(data.centers[x].vaccine_fees[z].fee<minFee)
						alarm=1;
				}
			output+="Vaccine:"+data.centers[x].sessions[y].vaccine+"<br><br>";

			
			if(data.centers[x].fee_type=="Free")
			{
				alarm=1;
				$("#OTP").show();
				
			}
			flag=1;
		}

	}
	if(flag==0)
		if(y==0)
			output+="No doses available on this week<br>";
		else if(y==1)
			output+="No doses available on next week<br>";
		else if(y==2)
			output+="No doses available on third week<br>";
		
		
		
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




	
	
