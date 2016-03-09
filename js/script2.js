// JavaScript Document
var wheel = {
                index: 0, //now position
                count: 0, //total position
                timer: 0, //timer name
				init_interval:0,//init change position speed
                interval: 0, //change position speed
                times: 0, //change position count
                cycle: 50, //limit change position count
                target: 0, //target
				flag: 0,
                init: function(group, init_interval) {
					var len = $("#" + group).find("." + group + "-unit").length;
                    if (len > 0) {
                        this.obj = $("#" + group);
                        this.count = len;
                    }
					this.init_interval = init_interval;
					this.interval = init_interval;
                },
                change_pos: function() {
					this.obj.find(".wheel-unit-" + this.index + " img").attr("src","img/1.png");  //revert prev
                    this.index++;
					this.index = this.index % this.count ;
                    this.obj.find(".wheel-unit-" + this.index + " img").attr("src","img/2.png");  //change next
                }
            };

function roll() {
	wheel.times++;
	wheel.change_pos();
	if (wheel.times > wheel.cycle + 2*wheel.count  && wheel.index == wheel.target ) {
		clearTimeout(wheel.timer);
		wheel.obj.attr("target_unit",  wheel.target );
		wheel.times = 0;
		wheel.interval = wheel.init_interval;
		click = false;
	} else {
		if (wheel.times < wheel.cycle && wheel.interval >= 40) {
			wheel.interval -= 20;
		} else if(wheel.interval < 40) {
			wheel.interval = 40;
		} else {
			wheel.interval += 20;
		}
		wheel.timer = setTimeout(roll, wheel.interval);
	}
}

/*
function roll() {
	wheel.change_pos();
	if (wheel.times > 2*wheel.count  && wheel.index == wheel.target ) {
		clearTimeout(wheel.timer);
		wheel.obj.attr("target_unit",  wheel.target );
		wheel.times = 0;
		wheel.interval = wheel.init_interval;
		click = false;
		wheel.flag = false;
	} else if(wheel.flag) {
		wheel.times++;
		wheel.interval += 20;
		wheel.timer = setTimeout(roll, wheel.interval);
	} else{
		wheel.interval -= 20;
		if(wheel.interval < 40){
			wheel.interval = 40;	
		}
		wheel.timer = setTimeout(roll, wheel.interval);
	}
}
*/
var click = false;
$(function() {
	wheel.init('wheel', 200);
		
	$(".button").click(function() {
		 if (!click) {
			/*Change position*/
			wheel.target = Math.floor(Math.random() * (wheel.count));
			roll();
			click = true;
			
			/*Change background color*/
			function change_bg_fn(){
				if(click){
					wheel.obj.css('background-color',"rgb("+Math.floor(Math.random() * 256)+","+
														 Math.floor(Math.random() * 256)+","+
														 Math.floor(Math.random() * 256)+")");	
					change_bg = setTimeout(change_bg_fn,wheel.interval)
				}else{
					clearTimeout(change_bg);
				}
			}
			var change_bg = setTimeout(change_bg_fn, wheel.interval);
		}
	});
	
});