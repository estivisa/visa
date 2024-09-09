var emailjs=function(e){"use strict";class t{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Network Error";this.status=e,this.text=t}}const i={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:(()=>{if("undefined"!=typeof localStorage)return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}})()},r=e=>e?"string"==typeof e?{publicKey:e}:"[object Object]"===e.toString()?e:{}:{},o=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"https://api.emailjs.com";if(!e)return;const o=r(e);i.publicKey=o.publicKey,i.blockHeadless=o.blockHeadless,i.storageProvider=o.storageProvider,i.blockList=o.blockList,i.limitRate=o.limitRate,i.origin=o.origin||t},a=async function(e,r){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const a=await fetch(i.origin+e,{method:"POST",headers:o,body:r}),s=await a.text(),n=new t(a.status,s);if(a.ok)return n;throw n},s=(e,t,i)=>{if(!e||"string"!=typeof e)throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||"string"!=typeof t)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!i||"string"!=typeof i)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},n=e=>e.webdriver||!e.languages||0===e.languages.length,l=()=>new t(451,"Unavailable For Headless Browser"),c=(e,t)=>{if((e=>!e.list?.length||!e.watchVariable)(e))return!1;((e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if("string"!=typeof t)throw"The BlockList watchVariable has to be a string"})(e.list,e.watchVariable);const i=(r=t,o=e.watchVariable,r instanceof FormData?r.get(o):r[o]);var r,o;return"string"==typeof i&&e.list.includes(i)},d=()=>new t(403,"Forbidden"),m=async(e,t,i)=>{if(!t.throttle||!i)return!1;((e,t)=>{if("number"!=typeof e||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&"string"!=typeof t)throw"The LimitRate ID has to be a non-empty string"})(t.throttle,t.id);const r=t.id||e,o=await(async(e,t,i)=>{const r=Number(await i.get(e)||0);return t-Date.now()+r})(r,t.throttle,i);return o>0||(await i.set(r,Date.now().toString()),!1)},h=()=>new t(429,"Too Many Requests"),p=async(e,t,o,p)=>{const u=r(p),b=u.publicKey||i.publicKey,g=u.blockHeadless||i.blockHeadless,f=u.storageProvider||i.storageProvider,w={...i.blockList,...u.blockList},y={...i.limitRate,...u.limitRate};if(g&&n(navigator))return Promise.reject(l());if(s(b,e,t),(e=>{if(e&&"[object Object]"!==e.toString())throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"})(o),o&&c(w,o))return Promise.reject(d());if(await m(location.pathname,y,f))return Promise.reject(h());const v={lib_version:"4.4.1",user_id:b,service_id:e,template_id:t,template_params:o};return a("/api/v1.0/email/send",JSON.stringify(v),{"Content-type":"application/json"})},u=async(e,t,o,p)=>{const u=r(p),b=u.publicKey||i.publicKey,g=u.blockHeadless||i.blockHeadless,f=i.storageProvider||u.storageProvider,w={...i.blockList,...u.blockList},y={...i.limitRate,...u.limitRate};if(g&&n(navigator))return Promise.reject(l());const v=(e=>"string"==typeof e?document.querySelector(e):e)(o);s(b,e,t),(e=>{if(!e||"FORM"!==e.nodeName)throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"})(v);const j=new FormData(v);return c(w,j)?Promise.reject(d()):await m(location.pathname,y,f)?Promise.reject(h()):(j.append("lib_version","4.4.1"),j.append("service_id",e),j.append("template_id",t),j.append("user_id",b),a("/api/v1.0/email/send-form",j))};var b={init:o,send:p,sendForm:u,EmailJSResponseStatus:t};return e.EmailJSResponseStatus=t,e.default=b,e.init=o,e.send=p,e.sendForm=u,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
(function(){ emailjs.init({ publicKey: "yR6RTiOp7yrPjnujd", }); })();

if(window.location.href.includes('ais.usvisa-info.com'))
{
	var freeze_loop = false;
	var loop_interval;
	var global_date = false;
	var signin_url = "https://ais.usvisa-info.com/he-il/niv/users/sign_in";

	if(document.body.innerText.match(/429 too many requests/i))
	{
		setTimeout(function(){
			location.reload();
		}, 12000);		
	}
	else if(document.body.innerText.match(/סמן את המועמדים/i))
	{
		if(localStorage.getItem("is_scan_status")=="on")
		{
			setTimeout(function(){
				$("input[value='המשך']").click();
			}, 1000);			
		}
	}	
	else if(window.location.href.match(/he\-il\/niv\/?$/))
	{
		if(localStorage.getItem("is_scan_status")=="on")
		{
			setTimeout(function(){
				window.location.href = signin_url;
			}, 3000);			
		}
	}
	else if(window.location.href.includes('users\/sign_in'))
	{
		create_scan_box();

		if(localStorage.getItem("is_scan_status")=="on")
		{
			setInterval(function() {
				var login_attempts = localStorage.getItem('login_attempts');
				if(login_attempts==null)
				{
					login_attempts = 1;
				}
				if(login_attempts<4)
				{
					localStorage.setItem('login_attempts',++login_attempts);
								
					setTimeout(function(){
						login_user(localStorage.getItem('scan_user_email'),localStorage.getItem('scan_user_password'));
					}, 2000);
				}
			}, 3000);				
		}
	}
	else if(window.location.href.match(/he\-il\/niv\/groups\/[0-9]+/))
	{
		localStorage.setItem('login_attempts',1);

		if(localStorage.getItem("is_scan_status")=="on")
		{
			if(localStorage.getItem('scan_url')!=null && localStorage.getItem('scan_url')!="")
			{
				setTimeout(function() {
					window.location.href = localStorage.getItem("scan_url");
				}, 3500);
			}
		}

		create_scan_box();
	}	
	else if(window.location.href.match(/\/appointment\/instructions/))
	{
		create_scan_box();

		setTimeout(function() {
			if($("#flash_messages").length && localStorage.getItem("is_scan_status")=="on")
			{ 
				if($("#flash_messages").text().match(/בהצלחה/))
			    {
					emailjs.send("service_4b5rera","template_qvy8uhs",{
						email: localStorage.getItem('scan_user_email'),
					});

					var audio = new Audio('https://freesound.org/data/previews/274/274182_5123851-lq.mp3');
					audio.play();

					setTimeout(function(){
						var audio = new Audio('https://freesound.org/data/previews/353/353918_6561552-lq.mp3');
						audio.play();
					}, 1500);

					setTimeout(function() {
						emailjs.send("service_4b5rera","template_qvy8uhs",{
							email: localStorage.getItem('scan_user_email'),
						});		

						setTimeout(function() {			
							localStorage.setItem("is_scan_status","off");
						    localStorage.removeItem("scan_to_date");
						    localStorage.removeItem("scan_url");
						}, 1000);   
				    }, 1000);
			    } 
				if($("#flash_messages").text().match(/נכשלה/))
			    {
			    	if(localStorage.getItem('scan_url')!=null && localStorage.getItem('scan_url')!="")
			    	{
				    	setTimeout(function() {
				    		window.location.href = localStorage.getItem('scan_url');
				    	}, 5000);
			    	}
			    }
			}	
		}, 3000);
	}
	else if(window.location.href.includes('schedule') && window.location.href.includes('appointment'))
	{	
		create_scan_box();

		localStorage.setItem("last_scan_check",Date.now());
		localStorage.setItem('scan_url',window.location.href);
		localStorage.setItem('login_attempts',1);

		setInterval(function() {
			if($("#flash_messages").length)
			{  
				if($("#flash_messages").text().match(/expired/))
			    {
			    	window.location.reload();
			    }
			}		
		}, 10000);

		if(localStorage.getItem("is_scan_status")=="on")
		{
			setTimeout(function(){
				window.scrollBy(0,300);
			}, 500);	

			setTimeout(function(){
				$("#appointments_consulate_appointment_facility_id").val(96).change();
			}, 1000);						
		}

		var loop_interval = setInterval(function() {
			if((parseInt(localStorage.getItem("last_scan_check")) + parseInt(localStorage.getItem("scan_speed"))*1000) < Date.now())
			{
				if(freeze_loop==false)
				{
					if(localStorage.getItem("is_scan_status")=="on")
					{
						console.log("click");
						$("#appointments_consulate_appointment_facility_id").val(96).change();
						localStorage.setItem("last_scan_check",Date.now());
					}
				}
			}
		}, 1000);	

		setInterval(function() {
			close_false_scan();
		}, 1000);		
	}		
}


$(document).ajaxError(function( event, jqxhr, settings, exception ) {
    if(jqxhr.status==429) {
		freeze_loop = true;
		setTimeout(function(){
			freeze_loop = false;
		}, 20000);	
    }
    
    if(jqxhr.status==401) {
		setTimeout(function(){
			localStorage.clear();
			window.location.href = "https://ais.usvisa-info.com/he-il/niv/users/sign_out";
		}, 10000);	
    }    
});


$(document).ajaxSuccess(function( event, xhr, settings ) {
   var url = settings.url;
   var city;
   if(city = url.match(/\/appointment\/days\/(96)\./)){
    	var response = JSON.parse(xhr.responseText);
    	if(!response[0])
    	{   		
    		if(city[1]==96)
    		{
				freeze_loop = true;
				setTimeout(function(){
					freeze_loop = false;
				}, 600000);			
    		}
    	}
    	else if(response[0].date)
    	{
			var matches = response[0].date.match(/([0-9]+)\-([0-9]+)\-([0-9]+)/);
			if(matches[2])
			{
				global_date = matches[0];
					    
				if(is_good_date(matches[0])) 
				{
					freeze_loop = true;
					setTimeout(function(){
						freeze_loop = false;
					}, 20000);	

					var audio = new Audio('https://freesound.org/data/previews/267/267528_5060556-lq.mp3');
					audio.play();	
					
					if(localStorage.getItem("is_scan_status")=="on")
					{		    	
						setTimeout(function(){
							$("#appointments_consulate_appointment_date").val(response[0].date).change();
							setTimeout(function(){
								$("#appointments_consulate_appointment_date").click();
								var click_interval = setInterval(function() {
									if($(".ui-state-default.ui-state-active").length>0)
									{
										$(".ui-state-default.ui-state-active").click();	
										clearInterval(click_interval);
									}
								}, 50);	
								setTimeout(function(){
									clearInterval(click_interval);
								}, 5000);	
							}, 150);
						}, 150);
					}
				}								    	
			}  
		}
   }

   if(url.match(/\/appointment\/times\/9/)){
     	var response = JSON.parse(xhr.responseText);
   		if(response.available_times[0]){
			var matches = response.available_times[0].match(/[0-9]{2}\:[0-9]{2}/);
			if(matches && is_good_date(global_date)){
				setTimeout(function(){
					if($("#appointments_consulate_appointment_time option:eq(1)").val()!==""){

						clearInterval(loop_interval);

						var picked_hour = $("#appointments_consulate_appointment_time option:eq("+(Math.floor(Math.random()*($('#appointments_consulate_appointment_time').children('option').length -1))+1)+")").val();

						var audio = new Audio('https://freesound.org/data/previews/511/511484_6890478-lq.mp3');
						audio.play();

						if(localStorage.getItem("is_scan_status")=="on")
						{
							$("#appointments_consulate_appointment_time").val(picked_hour).change();						
							setTimeout(function(){
								$("#appointments_submit").click();
								setTimeout(function(){
						//			$(".button.alert").click();
								}, 150);
							}, 150);
						}	
					}
				}, 150);
			}
		}
   }  
});

function is_good_date(date)
{
	if(localStorage.getItem("scan_to_date") && Date.parse(date) <= Date.parse(localStorage.getItem("scan_to_date"))) 
	{
		return true;
	} 
	else 
	{
		return false;
	}
}


function login_user(email,password)
{
	$("#user_email").val(email);
	setTimeout(function(){
		$("#user_password").val(password);
		setTimeout(function(){
			if($("label[for='policy_confirmed']").hasClass("checked")==false)
			{
				$("#policy_confirmed").parent().addClass('checked');
				$("#policy_confirmed").parent().parent().addClass('checked');
				$("#policy_confirmed").click();								
			}
			setTimeout(function(){
				$("input[name='commit']").click();
			}, 950);
		}, 950);
	}, 950); 
}


function create_scan_box()
{
	$("ul[role=menubar]").filter(".medium-horizontal").eq(1).append('<style>	.switch {	  position: relative;	  display: inline-block;	  width: 60px;	  height: 34px;	}	.switch input {	  opacity: 0;	  width: 0;	  height: 0;	}	.slider_scan {	  position: absolute;	  cursor: pointer;	  top: 0;	  left: 0;	  right: 0;	  bottom: 0;	  background-color: #ccc;	  -webkit-transition: .4s;	  transition: .4s;	}	.slider_scan:before {	  position: absolute;	  content: "";	  height: 26px;	  width: 26px;	  left: 4px;	  bottom: 4px;	  background-color: white;	  -webkit-transition: .4s;	  transition: .4s;	}	input:checked + .slider_scan {	  background-color: #2196F3;	}	input:focus + .slider_scan {	  box-shadow: 0 0 1px #2196F3;	}	input:checked + .slider_scan:before {	  -webkit-transform: translateX(26px);	  -ms-transform: translateX(26px);	  transform: translateX(26px);	}	.slider_scan.round {	  border-radius: 34px;	}	.slider_scan.round:before {	  border-radius: 50%;	}	</style>	<li role="menuitem" id="scan_box" class="is-dropdown-submenu-parent opens-left"aria-label="סריקה">	<a id="scan_box_link">	סריקה	</a>	<ul id="scan_box_menu" style="width:450px;right:-350px;padding-bottom: 20px;padding-top: 10px;" class="menu submenu is-dropdown-submenu first-sub vertical"role="menubar">	<li role="menuitem" class="is-submenu-item is-dropdown-submenu-item scan_box_style">	<div style="float: left;width:50%;"><input type="date" id="scan_to_date"></div><div style="width:50%;text-align:left;padding-left:20px;">תאריך מקסימלי לסריקה</div>	</li>	<li role="menuitem" class="is-submenu-item is-dropdown-submenu-item scan_box_style">	<div style="float: left;width:50%;"><input type="number" id="scan_speed" min="10" max="300"></div><div style="width:50%;text-align:left;padding-left:20px;">אינטרוול סריקה (שניות)</div>	</li>	<li role="menuitem" class="is-submenu-item is-dropdown-submenu-item scan_box_style" style="color: rgb(51, 51, 51); line-height: 1.5; padding: 0.75rem 1.25rem;">	<div style="float: left;width:50%;"><label class="switch">	  <input id="is_scan_status" type="checkbox">	  <span class="slider_scan round"></span>	</label></div><div style="width:50%;text-align:left;padding-left:20px;padding-top: 9px;">סטטוס</div>	</li>');


	$('.scan_box_style').css({'color': '#333', 'line-height': '1.5', 'padding': '0.75rem 1.25rem'}); 

	$("#scan_box_link").click(function(){
	  $("#scan_box_menu").toggle();
	});

	populate_scan_box();
}


function populate_scan_box()
{
	if(localStorage.getItem("scan_to_date"))
	{
		$("#scan_to_date").val(localStorage.getItem("scan_to_date"));
	}
	else
	{
		var date = new Date((new Date().getTime()+2592000000)).toISOString().split('T')[0];
		localStorage.setItem("scan_to_date",date);
		$("#scan_to_date").val(date);
	}


	if(localStorage.getItem("scan_speed") && localStorage.getItem("scan_speed").match(/[0-9]+/))
	{
		$("#scan_speed").val(localStorage.getItem("scan_speed"));
	}
	else
	{
		localStorage.setItem("scan_speed",30);
		$("#scan_speed").val(30);
	}


	if(localStorage.getItem("is_scan_status")=="on")
		$("#is_scan_status").prop('checked', true);

	setTimeout(function() {
		disable_scan_box();
	}, 250);
}


function close_false_scan()
{
	if($(".user-info-footer")[0].innerText.match(/ ([^\ \@]+\@[^\ \@\,]+)/)[1] && localStorage.getItem("scan_user_email"))
	{
		if($(".user-info-footer")[0].innerText.match(/ ([^\ \@]+\@[^\ \@\,]+)/)[1].toLowerCase()!=localStorage.getItem("scan_user_email").toLowerCase())
		{
			if($("#is_scan_status").is(":checked"))
			{
				$("#is_scan_status").click();
			}		
			$("#is_scan_status").attr("disabled", true);
			localStorage.setItem("is_scan_status","off");				
		}
	}
	if(window.location.href.includes('schedule') && window.location.href.includes('appointment'))
	{
		if(localStorage.getItem("scan_url")!=window.location.href)
		{
			if($("#is_scan_status").is(":checked"))
			{
				$("#is_scan_status").click();
			}		
			$("#is_scan_status").attr("disabled", true);
			localStorage.setItem("is_scan_status","off");				
		}
	}
}


function disable_scan_box()
{
	if(localStorage.getItem("scan_user_email")==null || localStorage.getItem("scan_user_password")==null  || localStorage.getItem("scan_url")==null)
	{
		if($("#is_scan_status").is(":checked"))
		{
			$("#is_scan_status").click();
		}		
		$("#is_scan_status").attr("disabled", true);
		localStorage.setItem("is_scan_status","off");	
	}
	else 
	{
		if(!window.location.href.includes('schedule') || !window.location.href.includes('appointment'))
		{
			if(!$("#is_scan_status").is(":checked"))
			{
				$("#is_scan_status").attr("disabled", true);
			}
		}
	}
}



$('input[name="commit"]').on( "click", function() {
	if(window.location.href.includes('users\/sign_in'))
	{
		if(localStorage.getItem("scan_user_email") && localStorage.getItem("scan_user_email")!='')
		{
			if(localStorage.getItem("scan_user_email").toLowerCase()!=$("#user_email").val().toLowerCase())
			{
			    localStorage.getItem("is_scan_status","off");
			    localStorage.removeItem("scan_to_date");
			    localStorage.removeItem("scan_url");
			}
		}
		localStorage.setItem("scan_user_email", $("#user_email").val().toLowerCase());
		localStorage.setItem("scan_user_password", $("#user_password").val());
	}
});

$("#scan_to_date").on('change', function(){
	localStorage.setItem("scan_to_date",$("#scan_to_date").val());
});


$("#scan_speed").on('change', function(){
	localStorage.setItem("scan_speed",$("#scan_speed").val());
});


$("#is_scan_status").on('change', function(){
	if($("#is_scan_status").is(":checked"))
	{
		if(localStorage.getItem("scan_user_email")!=null && localStorage.getItem("scan_user_password")!=null && localStorage.getItem("scan_url")!=null && (window.location.href.includes('schedule') && window.location.href.includes('appointment')))
		{
			localStorage.setItem("is_scan_status","on");
		}
		else
		{
			$("#is_scan_status").click();
			$("#is_scan_status").attr("disabled", true);
			localStorage.setItem("is_scan_status","off");		
		} 
	}
	else
	{
	  	localStorage.setItem("is_scan_status","off");
	}
});


