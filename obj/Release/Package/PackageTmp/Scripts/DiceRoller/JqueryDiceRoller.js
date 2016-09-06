var picturesBaseUrl= "../js/DiceRoller/";


function rand6()
{
	return Math.floor((Math.random() * 6) + 1);
}

function Dice(d) 
{
	return d = {
				"id" : "",
				"result":-1,
				"animationInterval" : 75,
				"animationDuration" : 900,
				"animationDestination": d,
				"nbAnimations":0,
				"roll":function (){				
					this.result = rand6();
					return this.result;
				},
				"animateRoll":function (){
					
					if(this.animationDestination!="")
					{
						this.roll();
						$(this.animationDestination).html("");
						
						jQuery("<img>")					
							.attr("id","imgDiceResult" + this.id)	
							.appendTo($(this.animationDestination));
						jQuery("<span>")					
							.attr("id","spanDiceResult" + this.id)	
							.text(this.result)
							.attr("style", "display:none")
							.appendTo($(this.animationDestination));
						this.animate();
					}
					else 
						console.log("JqueryDiceRoller: Error in the animationRoll - animationDestination has to been set." ) ;
				},
				"changeToDicet": function(){
					$(this.animationDestination +">img").attr("src",picturesBaseUrl + "dicet-" + rand6() +".gif" ) ;
					var me = this ;
					setTimeout(function () {me.animate()},this.animationInterval );
				},
				"changeToDices": function(){
					$(this.animationDestination +">img").attr("src",picturesBaseUrl + "dices-" + rand6() +".gif" ) ;
					var me = this ;
					setTimeout(function () {me.animate()},this.animationInterval);
				},			
				"showResult": function(){
					$(this.animationDestination +">img").attr("src",picturesBaseUrl + "die-" + this.result +".gif" ) ;
				},
				"animate":function() {
					this.nbAnimations++;
					
					if(this.nbAnimations * this.animationInterval < this.animationDuration)
					{
						if (this.nbAnimations %2 )
							this.changeToDicet();
						else 
							this.changeToDices();
					}
					else 
						this.showResult();
				}
	}
}



/// has to run once

