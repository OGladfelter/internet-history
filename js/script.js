function IsMobileCard() {
  var check =  false;

  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

  return check;   
}

instructions = "➀ Each dot represents one full 24-hour day of my internet history. ➁ Hover over any website label to get a more accurate description or example of how I use it. ➂ Hover over any dot to see what date it represents. ➃ Click on any dot to highlight it; click again to unhighlight. ➄ Use the below buttons to adjust the speed of the graph and the checkboxes to hide dots by days of the week. ➅ The slider on the graph can be used to jump around to different times of the day.";

if (IsMobileCard()){ // if mobile is detected, we need to tweak the instructions
  instructions = "➀ Each dot represents one full 24-hour day of my internet history. ➁ Tap any dot to highlight it and see what date it represents; tap again to unhighlight. ➂ Use the blue buttons to adjust the speed of the graph and the checkboxes to hide/unhide dots by days of the week. ➃ The slider on the graph can be used to jump around to different times.";
}

browsingData = []

// importing data from csv and organizing it into list of lists
d3.csv("data/data.csv", function(d) {
      webBrowsingData = d;
      
      browsingStages = [[webBrowsingData[0].website2,webBrowsingData[0].weekDay,webBrowsingData[0].date3]]

      for (i = 1; i < webBrowsingData.length; i++) { 
        if (webBrowsingData[i].date3 == webBrowsingData[i-1].date3) {
            browsingStages.push([webBrowsingData[i].website2,webBrowsingData[i].weekDay,webBrowsingData[i].date3])   
        }
        else {
            browsingData.push(browsingStages)
            browsingStages = [[webBrowsingData[i].website2,webBrowsingData[i].weekDay,webBrowsingData[i].date3]]
      }   
    }

    browsingData.push(browsingStages);

    // once the data has been imported and organized, begin the process
    doIt();
});

// create array of time stamp strings for time label
var x = 1; //minutes interval
var timeList = []; // time array
var tt = 0; // start time
var ap = ['AM', 'PM']; // AM-PM

//loop to increment the time and push results in array
for (var i=0;tt<24*60; i++) {
  var hh = Math.floor(tt/60); // getting hours of day in 0-24 format
  var mm = (tt%60); // getting minutes of the hour in 0-55 format
  if (hh == 0){
    timeList[i] = ("12:" + ("0" + mm).slice(-2) + " AM"); // pushing data in array in [00:00 - 12:00 AM/PM format]
  }
  else if (hh == 12){
    timeList[i] = ("12:" + ("0" + mm).slice(-2) + " PM"); // pushing data in array in [00:00 - 12:00 AM/PM format]
  }
  else {
    timeString = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + " " + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
    
    if (timeString[0]=="0"){
      timeString = timeString.slice(1,)
    }
    timeList[i] = timeString
  }
  tt = tt + x;
}
//////////////////

function doIt(){

var margin = {top: 16, right: 0, bottom: 0, left: 0},
    screenWidth = document.getElementById('chart').clientWidth;
    screenHeight = document.getElementById('chart').clientHeight;

if (screenWidth > screenHeight){
  var height = screenWidth / 2.1;
  var width = screenWidth  / 2.1;
}
else{
  var height = screenWidth * .9;
  var width = screenWidth * .9;
}
    
var node_radius = 6,
    padding = 1,
    cluster_padding = 10,
    num_nodes = browsingData.length;

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("align","center");

// Foci
var foci = {

    "Off": { x: (width + margin.left + margin.right)/2, y: height*.5, color: "#696969" },

    "Misc": { x : ((width + margin.left + margin.right)/2), y: height * .2, color: "#800080"},
    "YouTube": { x: ((width + margin.left + margin.right)*.8), y: height*.5, color: "#ff0000" },
    "Google Apps": { x: (width + margin.left + margin.right)/2, y: height * .8, color: "#0F9D58" },
    "Other Social Media": { x: (width + margin.left + margin.right)*.2, y: height * .5, color: "#0077B5" },

    "Wikipedia": { x: ((width + margin.left + margin.right)*.6147), y: height * .223, color: "#636466" },
    "Netflix": { x : (width + margin.left + margin.right)*.712, y: height * .71229, color: "#e50914"},
    "Google": { x: (width + margin.left + margin.right)*.288, y: height * .2877, color: "#0F9D58" },
    "Facebook": { x: (width + margin.left + margin.right)*.288, y: height * .71229, color: "#3360ff" },

    "News": { x : (width + margin.left + margin.right)*.3853, y: height * .777, color: "black"},
    "Twitter": { x: (width + margin.left + margin.right)*.6147, y: height * 0.777, color: "#1da1f2" },
    "Grubhub / Yelp": { x: (width + margin.left + margin.right)*.3853, y: height * .223, color: "#af0606 " },
    "Strava": { x: (width + margin.left + margin.right)*.712, y: height * 0.2877, color: "#fc4c02" },

    "Amazon": { x: (width + margin.left + margin.right)*.2229, y: height * .6152, color: "#FF9900" },
    "Slack": { x: (width + margin.left + margin.right)*.777, y: height * .6152, color: "#2EB67D" },
    "Work Apps": { x: (width + margin.left + margin.right)*.777, y: height * .3848, color: "#00aeef" },
    "GitHub / Coding Tutorials": { x: (width + margin.left + margin.right)*.2229, y: height * .3848, color: "#333" }

};

// Create node objects
var nodes = d3.range(0, num_nodes).map(function(o, i) {
	return {
		id: ["#faf0e6",.5, browsingData[i][0][1],browsingData[i][0][2]], // hex color code, transparency, day of week, and date all saved in ID
		x: foci.x + Math.random(),
		y: foci.y + Math.random(),
		radius: node_radius,
		choice: browsingData[i][0][0]
	}
});

// Force-directed layout
var force = d3.layout.force()
	.nodes(nodes)
	.size([width, height])
	.gravity(0)
	.charge(0)
	.friction(.8)
	.on("tick", tick)
	.start();
    
// Tool tip
var tooltip = d3.select("body")
  .append("div")
  .attr('class', 'tooltip');

// Draw circle for each node.
var circle = svg.selectAll("circle")
	.data(nodes)
    .enter().append("circle")
	.attr("id", ["#faf0e6",1]) // the id is where we're storing the color of the previous group and opacity
	.attr("class", "node")
	.style("fill", "#faf0e6");

// For smoother initial transition to settling spots.
circle.transition()
	.duration(900)
	.delay(function(d,i) { return i * 5; })
	.attrTween("r", function(d) {
		var i = d3.interpolate(0, d.radius);
		return function(t) { return d.radius = i(t); };
	});

// Create Time Title 
timeLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*.5)
            .attr("y", (height * .025))
            .attr('text-alignment','center')
            .attr("font-size","30px")
            .style("text-anchor", "middle")
            .attr("fill","black")
            .attr("id", "timeLabel")
            .text("Loading...");

// Rotating Text elements -----------------------------------------------------------------------
rotatingText = document.getElementById("paragraph");
subTitleText = document.getElementById("subtitle");

////////////////////////////////////////////////////////////////////

// Run function periodically to make things move.
var timeout;
stage = 540; // starts at 9:00 AM
secTillNext = 1000;

function timer() {
    // as we move into subsequent stage, update location of every node using a for loop
    for (panelist = 0; panelist < browsingData.length; panelist++) { 
      // Update node
      if (stage > 0) {
        nodes[panelist].cx = foci[browsingData[panelist][stage][0]].x;
        nodes[panelist].cy = foci[browsingData[panelist][stage][0]].y;
        nodes[panelist].choice = browsingData[panelist][stage][0];
      if (nodes[panelist].id[0] != "#e4e8eb"){
        nodes[panelist].id[0] = foci[browsingData[panelist][stage][0]].color; // the color of their new group is now saved as the id, to be used in the next stage
        //nodes[panelist].id[1] = 1 // return to full opacity 
        }
      }
      else {
        nodes[panelist].cx = foci[browsingData[panelist][stage][0]].x;
        nodes[panelist].cy = foci[browsingData[panelist][stage][0]].y;
        nodes[panelist].choice = browsingData[panelist][stage][0];
      }
    }

    timeLabel.text(timeList[stage]);
    timeSlider.value = stage;
    if (stage < 60) {
      subTitleText.innerHTML = "Revealing My Status As A Night Owl";
      rotatingText.innerHTML = "Even late at night, I'm often still active on Wikipedia, Netflix, Youtube, and social media. You may notice I typically try to get to bed by midnight, although there are a few days I'm still online past that mark - usually a result of getting trapped in a fascinating Wikipedia Loop.";
      
    }
    if (stage < 170){
      subTitleText.innerHTML = "Offline For The Night...Usually";
      rotatingText.innerHTML = "92% of the time I’m offline by 1:00am. The exceptions are usually Saturday nights (technically early morning Sundays), which isn't very surprising. Now what's more interesting (and embarrassing) is that one time I was up till 2:00am on a Thursday morning watching The Office on Netflix.";
      
    }
    else if (stage < 400){
      subTitleText.innerHTML = "Acknowledgement";
      rotatingText.innerHTML = "This entire project was inspired and heavily influenced by <a target='_blank' href='https://flowingdata.com/2015/12/15/a-day-in-the-life-of-americans/'>A Day in the Life of Americans</a> by Nathan Yu. If you’re interested in learning more about data visualization, I highly recommend his tutorials, especially <a target='_blank' href='https://flowingdata.com/2016/08/23/make-a-moving-bubbles-chart-to-show-clustering-and-distributions/'>the one I used to build this project</a>.";
    }
    else if (stage < 570){
      subTitleText.innerHTML = "Instructions";
      rotatingText.innerHTML = instructions;
      
    }
    else if (stage < 600){
      subTitleText.innerHTML = "Morning Messages";
      rotatingText.innerHTML = "This is usually when I get to work and gear up for the day. This involves reading through emails and Slack messages, checking my calendar, and launching all of my work apps. I also like to use this time to read the news.";
      
    }
    else if (stage < 660){
      subTitleText.innerHTML = "Trying To Be Productive";
      rotatingText.innerHTML = "By this hour, my day is usually in full swing if it’s a work day. This involves switching back and forth between several websites (G Suite, work-specific apps, and Slack). The big exception during this time period is weekends: I'm rarely online on Saturdays and Sunday mornings.";
      
    }
    else if (stage < 780){
      subTitleText.innerHTML =("Business As Usual")
      rotatingText.innerHTML = "Working lunches are fairly common at my company, so I’m my internet traffic holds more steady one might expect. Granted, even if I’m not getting away from my desk, I can still take breaks, which explains the increased traffic in miscellaneous groups such as news sites and Amazon.";
      
    }
    else if (stage < 990){
      subTitleText.innerHTML = "Peak Internet Usage";
      rotatingText.innerHTML = "This point of day is when I'm most likely to be online: I was using the internet 61 out of 90 days during this time period. On work days, this is when I get back from lunch and get busy trying to finish whatever I need done for that day. On weekends, this is around the time I finish my morning run and am ready to unwind.";
      
    }
    else if (stage < 1080){
      subTitleText.innerHTML = "Wrapping Up Work";
      rotatingText.innerHTML = "I usually finish work at around this time, leading to a big drop in activity on Google Apps, Work Apps, and Slack. It’s also the time of day during normal waking hours where I’m most likely to be offline.";
      
    }
    else if (stage < 1110){
      subTitleText.innerHTML = "Getting Home";
      rotatingText.innerHTML = "No discernible patterns here. This is the time of day I typically get home and switch from my work computer to my personal laptop, so there's a decline in work-related sites, followed by a later increase in social media, Netflix, YouTube, etc.";
      
    }
    else if (stage < 1170){
      subTitleText.innerHTML = "At Night, G Suite Usage Falls In Favor Of...Another Google Product";
      rotatingText.innerHTML = "From 9:00 AM to 6:00 PM, G Suite was used more than any other group (excluding the ‘Off’ category). This current hour marks the point at which G Suite gets dethroned - by YouTube. So essentially I'm just swapping out Google for a Google subsidiary.";
      
    }
    else if (stage < 1320){
      subTitleText.innerHTML = "Facebook Is My Go-To Evening Social Media";
      rotatingText.innerHTML = "This is the time of day I’m most likely to be on Facebook. I originally assumed all of my social media usage across various platforms would correlate match up, but that doesn't seem to be the case at all. For example, I don’t use Twitter much during this time period, instead opting to tweet more at late night (see 10:00-11:00 PM) and during the work day (see 1:30 PM, 11:00 AM). Why I feel comfortable using Twitter during the work day but not Facebook is anyone’s guess.";
      
    }
    else if (stage < 1410){
      subTitleText.innerHTML = "Passive Websites Are Popular For Background Noise";
      rotatingText.innerHTML = "I'm most likely to be on Netflix and Youtube later at night. It’s no coincidence passive website usage spikes around the same time I'm also performing end of day rituals (meal prep, ironing clothes, brushing my teeth). In other words, I can have Netflix or YouTube videos playing in the background while I’m doing chores.";
      
    }
    else {
      subTitleText.innerHTML = "Revealing My Status As A Night Owl";
      rotatingText.innerHTML = "Even late at night, I'm often still active on Wikipedia, Netflix, Youtube, and social media. You may notice I typically try to get to bed by midnight, although there are a few days I'm still online past that mark - usually a result of getting trapped in a fascinating Wikipedia Loop.";
    }
    
    ////////////////////////////////////////////////////////
    
    // get the nodes moving
    force.resume();
    stage++;
    // once we hit the end of the day (and data), reset
    if (stage > browsingData[0].length - 1) {
        stage = 0
    }
    // once the graph hits 3:40am, there's no activity, so skip ahead to 8:30am
    else if (stage == 220){
        stage = 510;
    }
    // Run it again in a few seconds.
    timeout = setTimeout(timer, secTillNext);  
}

timeout = setTimeout(timer, 200);

// Force-directed boiler plate functions

movementSpeed = .5;

function tick(e) {
  circle
	.each(gravity(movementSpeed * e.alpha))
  	.each(collide(.05))
  	.style("fill", function(d) { return d.id[0]; }) // change color to whatever hex code is saved in the id (set by filter buttons)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("fill-opacity", function(d) { return .8; }) // change opacity to whatever is saved in the id 
    ;
}

// Move nodes toward cluster focus.
function gravity(alpha) {
  return function(d) {
    d.y += (foci[d.choice].y - d.y) * alpha;
    d.x += (foci[d.choice].x - d.x) * alpha;
  };
}

// Resolve collisions between nodes.
function collide(alpha) {
  var quadtree = d3.geom.quadtree(nodes);
  return function(d) {
	  var r = d.radius + node_radius + Math.max(padding, cluster_padding),
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.choice === quad.point.choice ? padding : cluster_padding);
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}    

// Labels and Title ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
if (document.getElementById('chart').clientWidth < 1500){
    var labelFontSize = "16px";
}
else{
    var labelFontSize = "20px";
}

if (IsMobileCard()){
  var labelFontSize = "25px";
}

// Off  Label
offLabel = svg.append("text")
            .attr("x", ((width + margin.left + margin.right)/2))
            .attr("y", height*.4)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .attr("fill","#696969")
            .style("pointer-events","none")
            .text("Offline");

// Misc Label
miscLabel = svg.append("text")
            .attr("x", ((width + margin.left + margin.right)/2))
            .attr("y", height * .1)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("One-offs")
            .attr("id","misc")
            .attr("fill","#800080");

// Youtube  Label
youtubeLabel = svg.append("text")
            .attr("x", ((width + margin.left + margin.right)*.9))
            .attr("y", height * .5)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("YouTube")
            .attr("id","youtube")
            .attr("fill","#ff0000");

// Wikipedia  Label
wikipediaLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*.653)
            .attr("y", height * .130)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .attr("fill","#636466")
            .attr("id","wikipedia")
            .text("Wikipedia");

// Netflix Label
netflixLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*0.783)
            .attr("y", height * .783)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("Netflix")
            .attr("id","netflix")
            .attr("fill","#e50914");

// Google Label
googleLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*.217)
            .attr("y", height * .217)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("Google search")
            .attr("id","google")
            .attr("fill","#0F9D58");

// Facebook Label
facebookLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*0.217)
            .attr("y", height*.783)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("Facebook")
            .attr("id","facebook")
            .attr("fill","#3360ff");

// Google Apps Label
googleAppsLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*.5)
            .attr("y", height * .9)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .attr("fill","#0F9D58")
            .attr("id","googleApps")
            .text("G Suite");

// News Label
newsLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*.3469)
            .attr("y", height*.87)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("News")
            .attr("id","news")
            .attr("fill","black");

// Twitter Label
twitterLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*.653)
            .attr("y", height*.87)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("Twitter")
            .attr("id","twitter")
            .attr("fill","#1da1f2");

// Grubhub Label
grubhubLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*.3469)
            .attr("y", height*.130)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("Yelp")
            .attr("id","grubhub")
            .attr("fill","#af0606");

// Strava Label
stravaLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*.783)
            .attr("y", height*.217)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("Strava")
            .attr("id","strava")
            .attr("fill","#fc4c02");

// Other Social Media Label
otherSocialMediaLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*.1)
            .attr("y", height*.5)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("LinkedIn")
            .attr("fill","#0077B5")
            .attr("id","otherSocialMedia");

// Amazon Label
amazonLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*.130)
            .attr("y", height*.6531)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("Amazon")
            .attr("id","amazon")
            .attr("fill","#FF9900");

// Slack Label
slackLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*.86955)
            .attr("y", height*.6531)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("Slack")
            .attr("id","slack")
            .attr("fill","#2EB67D");

// Work Apps Label
workAppsLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*.86955)
            .attr("y", height*.3469)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("Work apps")
            .attr("id","workApps")
            .attr("fill","#00aeef");

// GitHub Label
githubLabel = svg.append("text")
            .attr("x", (width + margin.left + margin.right)*.130)
            .attr("y", height*.3469)
            .attr('text-alignment','center')
            .attr("font-size",labelFontSize)
            .attr("font-weight","bold")
            .style("text-anchor", "middle")
            .text("Coding stuff")
            .attr("id","github")
            .attr("fill","#333");

// Time Slider
var slider = document.getElementById("timeSlider");
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  stage = parseInt(slider.value);
  timeLabel.text(timeList[stage]);
}

var timeLabel_x = document.getElementById("timeLabel").getBoundingClientRect().x;
var timeSlider_x = document.getElementById("timeSlider").getBoundingClientRect().x;
var x_diff = timeLabel_x - timeSlider_x;
var timeLabel_y = document.getElementById("timeLabel").getBoundingClientRect().y;
var timeSlider_y = document.getElementById("timeSlider").getBoundingClientRect().y;
var y_diff = timeLabel_y - timeSlider_y;
var y_diff = y_diff + document.getElementById("timeLabel").getBoundingClientRect().height;

document.getElementById("timeSlider").style.transform = "translate(" + x_diff + "px," + y_diff + "px)";
                    
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// functions for buttons to control speed of step progression~~~~~~~~~~~~~~
function speedChange(stepDelay, speed) {
  secTillNext = stepDelay;
  movementSpeed = speed;
  clearTimeout(timeout);
  timeout = setTimeout(timer, 1000);
}

var paused = 0;
var buttons = [...document.getElementsByTagName("button")];

document.getElementById("slow").addEventListener("click", function() {
  speedChange(1000, 0.25);
  buttons.forEach(button => button.style.backgroundColor = "#baeaf9");
  this.style.backgroundColor = "#00aeef";
});
document.getElementById("normal").addEventListener("click", function() {
  speedChange(500, 0.75);
  buttons.forEach(button => button.style.backgroundColor = "#baeaf9");
  this.style.backgroundColor = "#00aeef";
});
document.getElementById("fast").addEventListener("click", function() {
  speedChange(250, 1);
  buttons.forEach(button => button.style.backgroundColor = "#baeaf9");
  this.style.backgroundColor = "#00aeef";
});
document.getElementById("FF").addEventListener("click", function() {
  speedChange(50, 4);
  buttons.forEach(button => button.style.backgroundColor = "#baeaf9");
  this.style.backgroundColor = "#00aeef";
});
document.getElementById("pause").addEventListener("click", function() {
  if (paused == 0) { // currently not paused, so pause it
    clearTimeout(timeout);
    paused = 1;
    buttons.forEach(button => button.style.backgroundColor = "#baeaf9");
    this.style.backgroundColor = "#00aeef";
  }
  else {
    speedChange(500, 0.75); // already paused, so unpause it and resume at normal speed
    paused = 0;
    buttons.forEach(button => button.style.backgroundColor = "#baeaf9");
    document.getElementById("normal").style.backgroundColor = "#00aeef";
  }
});

// functions for check boxes
var filteredOpacity = .15;
var filteredColor = "#e4e8eb";

var checkboxes = document.querySelectorAll("input[type='checkbox']");
checkboxes.forEach(checkbox => checkbox.addEventListener("change", function() {
    highlightByDay(this.id);
  }
));

function highlightByDay(weekday) {
  if (document.getElementById(weekday).checked){ // The box is CHECKED, uncheck it
    for (panelist = 0; panelist < browsingData.length; panelist++) { 
      // Check if the day matches the button
      if (browsingData[panelist][0][1] == weekday) {
        nodes[panelist].id[0] = foci[browsingData[panelist][stage-1][0]].color; // save the color to their ID, which will change the color in the next stage
        nodes[panelist].id[1] = .5; // return to full opacity
      } 
    }
  }
  else { // The box is UNCHECKED, turn check it
    for (panelist = 0; panelist < browsingData.length; panelist++) { 
      // Check if the day matches the button
        if (browsingData[panelist][0][1] == weekday) {
          nodes[panelist].id[0] = filteredColor;
          nodes[panelist].id[1] = filteredOpacity;
        }
    }
  }   
};

///////////////////////////////////////////////////////

// highlight dot when clicked on, unhighlight if already highlighted
d3.select("#chart").selectAll("circle").on("click", function() {
    if (d3.select(this).style("stroke") == 'none') {
      d3.select(this)
        .style("stroke","cyan")
        .style("stroke-width",5);
    }
    else {
      d3.select(this)
        .style("stroke","none")
    }
});

// when cursor is hovered above a dot, have a tooltip of date
d3.select("#chart").selectAll("circle").on("mouseover", function(d) {
    return tooltip
    .style("visibility", "visible")
    .text(d.id[2] + ", " + d.id[3]);
  })
  .on("mousemove", function() {
    return tooltip.style("top", (event.pageY - 15) + "px")
      .style("left", event.pageX + 10 + "px");
  })
  .on("mouseout", function() {
    return tooltip.style("visibility", "hidden");
  });

// when cursor is hovered above a text label, have a tooltip describing the text
  d3.select("#chart").selectAll("text").on("mouseover", function(d) {
    if (d3.select(this).attr("id") == "misc"){
      return tooltip.style("visibility", "visible").text("Websites I typically only visit a few times, such as a restaurant's when I want to look at their menu");
    }
    else if (d3.select(this).attr("id") == "wikipedia"){
      return tooltip.style("visibility", "visible").text("70% learning, 30% Wikiracing");
    }
    else if (d3.select(this).attr("id") == "news"){
      return tooltip.style("visibility", "visible").text("NYT, WaPo, Politico, Vox, FiveThirtyEight, The Atlantic, Vice");
    }
    else if (d3.select(this).attr("id") == "grubhub"){
      return tooltip.style("visibility", "visible").text("Useful for when living in a city with seemingly infinite food and drink options");
    }
    else if (d3.select(this).attr("id") == "googleApps"){
      return tooltip.style("visibility", "visible").text("Mostly Gmail, but also Google Calendar, Hangouts, Docs, and Drive");
    }
    else if (d3.select(this).attr("id") == "strava"){
      return tooltip.style("visibility", "visible").text("Social media for running. This group also includes other running-related sites.");
    }
    else if (d3.select(this).attr("id") == "netflix"){
      return tooltip.style("visibility", "visible").text("Currently rewatching The Office for the upteempth time...");
    }
    else if (d3.select(this).attr("id") == "twitter"){
      return tooltip.style("visibility", "visible").text("This group would have a lot more traffic if I had included my phone’s browsing history");
    }
    else if (d3.select(this).attr("id") == "youtube"){
      return tooltip.style("visibility", "visible").text("Mostly running documentaries and the occassional How-To");
    }
    else if (d3.select(this).attr("id") == "slack"){
      return tooltip.style("visibility", "visible").text("Mainly for work, but I also a few personal channels, like the Data Visualization Society");
    }
    else if (d3.select(this).attr("id") == "facebook"){
      return tooltip.style("visibility", "visible").text("Inexplicably often the last site I check at the end of the day");
    }
    else if (d3.select(this).attr("id") == "amazon"){
      return tooltip.style("visibility", "visible").text("I try to use Amazon only when absolutely necessary, so it was interesting to see the traffic to this site");
    }
    else if (d3.select(this).attr("id") == "github"){
      return tooltip.style("visibility", "visible").text("GitHub, Stack Overflow, W3Schools, and tutorials");
    }
    else if (d3.select(this).attr("id") == "google"){
      return tooltip.style("visibility", "visible").text("This group only includes search bar queries");
    }
    else if (d3.select(this).attr("id") == "workApps"){
      return tooltip.style("visibility", "visible").text("Stuff I use for work: Jira, Concur, other company-licensed SaaS stuff.");
    }
    else if (d3.select(this).attr("id") == "otherSocialMedia"){
      return tooltip.style("visibility", "visible").text("The one social media I don't feel guilty checking at work");
    }
  })
  .on("mousemove", function() {
    return tooltip.style("top", event.pageY + 10 + "px")
      .style("left", event.pageX + 10 + "px");
  })
  .on("mouseout", function() {
    return tooltip.style("visibility", "hidden");
  });

}