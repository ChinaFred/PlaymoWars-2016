		//Weapons 
		function weapon(n, d,nbH,cbC, modifs) 
		{
			return  o ={
				"name":n,
				"description":d, 
				"nbrHands":nbH, // 1 ou 2 
				"canBeCombined":cbC, // 0 indique qu'elle ne peut pas être combinée avec une autre arme à une main // 1 indique le contraire  
				//Modificateurs sur les caracs
				"modifiers":modifs, // potentiellement deux modificateurs : 0 cac , 1 tir - si tir toujours possible arme de base au cac  
				"getTableHtml":function (){
					var html = 
						'<tr>'+
							'<td colspan="8" data-toggle="'+ this.description +'" data-placement="left">'+this.name+'</td>'+				
						'</tr>';  	
					for(var i =0; i< this.modifiers.length;i++)
						html +=	this.modifiers[i].getTableHtml();
					console.log (html);
					return html		;			
				}
			}
		}
		
		function caracModifier(t, cc,ct,s,k,aChar,aEnnemy,cd)
		{
			return  o ={
					"type": t,
					"cc":cc,
					"ct":ct,
					"strength":s,
					"attack":k,
					"armorChar":aChar,
					"armorEnnemy":aEnnemy,	
					"charism":cd,	
					"getTableHtml":function (){
						console.log("in" + getWeapontTypeLabel(this.type));
						var html = 
							'<tr>'+
								'<td data-toggle="tooltip" data-placement="left">'+getWeapontTypeLabel(this.type)+'</td>'+
								'<td>'+this.cc+'</td>'+
								'<td>'+this.ct+'</td>'+
								'<td>'+this.strength+'</td>'+													
								'<td>'+this.attack+'</td>'+
								'<td>'+this.armorChar+'</td>'+
								'<td>'+this.armorEnnemy+'</td>'+
								'<td>'+this.charism+'</td>'+
							'</tr>';  	
						return html;
					}
			}
		}
		
		var weaponTypesLabels = ["CàC", "Tir"] ;
		function getWeapontTypeLabel(i){
				return weaponTypesLabels[i];
		}
		
		
		
		// Characters 
		function character(i,n,p,d,m,cc,ct,s,e,k,l,c,a,weaps){
			return o  = {
				'id':i,
				'name':n,
				'picture' : p,
				'description':d,
				'move':m,
				'cc':cc,
				'ct':ct,
				'strength':s,			
				'endurance':e,
				'attack':k,
				'life':l,
				'charism':c,
				'armor':a,
				'weapons':weaps,
				'getCharacterCardHtml' : function (){
					
					ret =   
						'<div class="well well-sm">'+
							'<img class="img-circle img-responsive img-center" src="'+ this.picture+'" alt="'+ this.name +'">' +
								'<h2>'+this.name+'</h2>'+
									'<p>'+this.description+'</p>'+
											'<br/>'+
												this.getCaracsTableHtml()+
												this.getWeaponsTableHtml()+
						'</div>';
					
					return ret;
					
				},
				'getCaracsTableHtml' : function (){
					return	'<h4 class="text-left">Caractéristiques : </h4>' +
							'<div class="table-responsive">'+
										'<table class="table table-striped table-bordered ">'+
											'<thead>'+
												'<tr>'+
													
													'<th>Mvt</th>'+
													'<th>CC</th>'+	
													'<th>CT</th>'+
													'<th>Fo</th>'+	
													'<th>En</th>'+
													'<th>At</th>'+
													'<th>PV</th>'+
													'<th>Ar</th>'+
													'<th>Cd</th>'+
												'</tr>'+
											'</thead>'+
											'<tbody>'+
												'<tr>'+
													'<td>'+this.move+'</td>'+
													'<td>'+this.cc+'</td>'+
													'<td>'+this.ct+'</td>'+
													'<td>'+this.strength+'</td>'+													
													'<td>'+this.endurance+'</td>'+
													'<td>'+this.attack+'</td>'+
													'<td>'+this.life+'</td>'+
													'<td>'+this.armor+'</td>'+
													'<td>'+this.charism+'</td>'+
												'</tr>'+                                 
											'</tbody>'+
										'</table>'+
									'</div>' ;				
				},
				'getWeaponsTableHtml' : function (){
						var html =  '<h4 class="text-left">Armes : </h4>' +
									'<div class="table-responsive">'+
										'<table class="table table-striped table-bordered ">'+
											'<thead>'+
												'<tr>'+
													'<th>CC</th>'+	
													'<th>CT</th>'+
													'<th>Fo</th>'+	
													'<th>At</th>'+
													'<th>Ar</th>'+
													'<th>Ar Adv</th>'+
													'<th>Cd</th>'+
												'</tr>'+
											'</thead>'+
											'<tbody>';
											console.log(this.weapons.length + " this.weapons.length");
						for(var i = 0; i<this.weapons.length;i++)
							html += this.weapons[i].getTableHtml();		
						html +=	        	'</tbody>'+
										'</table>'+
									'</div>' ;		

						return html;
				}	
			}
		}
		
		
	/* Army  */ 	
		function army(i,n, p,d,sd, c){
			return o  = {
				'id':i,
				'name':n,
				'picture' : p,
				'description':d,
				'shortDesc':sd,
				'characters':c,
				'getArmyCard' : function (){
					return '<div class="col-lg-6 col-sm-6 text-center">'+								
								'<div class="well">'+
									'<img class="img-circle img-responsive img-center" src="' + this.picture +'" alt="'+this.name+'">'+
									'<h3>' + this.name + '  <small>' + this.shortDesc +'</small></h3>'+
									'<p>' + this.description +'</p>' + 
									'<p><a class="btn btn-primary" role="button" href="javascript:setPartyDetailsAndTitle('+this.id+');">Détails</a></p>';
								'</div>'+
							'</div>'			
				},
			}
		}
	
		
		function getArmyById(id)
		{
			
			return ret = $.grep(getArmies(), function(e){ return e.id == id; })[0];
			//var a = getArmies();
			// var ret =0;
			// for (var i = 0; i<a.length ;i++) 
			// {
				// if(a[i].id == id)
				// {
					// ret = a[i];
					// break;
				// }
			// }
			
			//return ret;
		}
		
		function getCharactersFromAllArmies(){
			var ret = []
			var a = getArmies();
			for (var i = 0; i<a.length;i++)				
				 $.merge( ret, a[i].characters )
			return ret;
		}
		
		function getCharacterById(id){
			return $.grep(getCharactersFromAllArmies(), function(e){ return e.id == id; })[0]
		}
		
		
		function getArmies(){
			console.log(caracModifier(0, 0,0,0,1,0,0,0).getTableHtml());
			var weaps =[ weapon("Arme de base","tous les types d'arme courant allant de l'épée, à la hache en passant par le gourdin ou le poignard",1,1, [caracModifier(0, 0,0,0,0,0,0,0)]),
					    weapon("Deux Armes de base","Combinaison de deux armes de base permettant de frapper de plus nombreuses fois.",1,1, [caracModifier(0, 0,0,0,1,0,0,0)]) ,
						weapon("Pistolet et épée","Au corps à corps est utilisé comme deux armes de base. A distance le pistolet peut tirer jusque 6 pas, il utilise une force de 4 et perce l'armure d'un point supplémentaire.",1,1, [caracModifier(0, 0,0,0,1,0,0,0),caracModifier(1, 0,0,4,0,0,-1,0)])	
						];
					
			var pirates  = army(1, 
								"Les pirates",
								"../Pictures/pirates.jpg",
								"Ces flibustiers donnent du fil à retordre à la couronne! Leur courage et leur détermination compense le manque de matériel. Ces redoutables combattants n'ont peur de rien et ne vive en pensant qu'au jour présent.",
								"Des brigands sans foi ni loi",
								[
								character(1,"John le rouge","../Pictures/Pirates.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,5,3,4,3,2,2,9,0,weaps),
								character(2,"John le vert","../Pictures/Pirates.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,3,3,3,3,1,1,9,0,weaps),
								character(3,"John le rouge","../Pictures/Pirates.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,3,3,3,3,1,2,9,0,weaps),
								character(4,"John le vert","../Pictures/Pirates.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,3,3,3,3,1,1,9,0,weaps),
								character(5,"John le noir","../Pictures/Pirates.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,3,3,3,3,1,1,9,0,weaps)
								]
								);
			var soldats = army(2, 
								"Les soldats",
								"../Pictures/soldats.jpg",
								"Envoyé par la couronne pour contrôler la région ces hommes sont bien entrainés et disposent d'un matériel de qualité. Ils suivent les ordres à la lettre et ne vivent que pour servir.",
								"Une armée régulière",
								[
								character(6,"Brice Mc kingsley","../Pictures/soldats.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,3,3,3,3,2,2,9,4,weaps),
								character(7,"Romuald Button","../Pictures/soldats.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,3,3,3,3,1,1,9,3,weaps),
								character(8,"Conrad Springfield","../Pictures/soldats.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,3,3,3,3,1,2,9,2,weaps),
								character(9,"John Marchin","../Pictures/soldats.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,3,3,3,3,1,1,9,0,weaps),
								character(10,"Ed Barney","../Pictures/soldats.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,3,3,3,3,1,1,9,0,weaps)
								]
								);
			var zombies = army(3, 
								"Les zombies",
								"../Pictures/zombies.jpg",
								"Ces marins issus originellement de tous les camps et morts en mer, reviennent hanter les vivants. Leurs motivations et l'explication de leur présence sont actuellement des énigmes.",
								"Les morts-vivants",
								[
								character(11,"Brice Mc kingsley","../Pictures/zombies.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,2,2,3,3,2,2,9,0,weaps),
								character(12,"Romuald Button","../Pictures/zombies.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,2,2,3,3,1,1,9,0,weaps),
								character(13,"Conrad Springfield","../Pictures/zombies.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,2,2,3,3,1,2,9,0,weaps),
								character(14,"John Marchin","../Pictures/zombies.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,2,2,3,3,1,1,9,0,weaps),
								character(15,"Ed Barney","../Pictures/zombies.jpg","Commandant en chef des pirates, il est considéré comme le meilleur et plus expérimenté pirate de la région",4,2,2,3,3,1,1,9,0,weaps)
								]
								);
			return [pirates, soldats,zombies];
		}
		
		
		// combat data
		var scoreCard = [0,6,5,4,3,2,2];
		function getScore(value){
			return scoreCard[(Math.min(Math.max(value,1),6))];
		}
		
		function getArmorRoll(value){
			
			var ret = 7;
			if (value >0)
					ret = getScore(value);
			return ret; 
		}
		
		function fightRound(attC, defC){
			return o = {
				"attackingChar":attC,
				"defendingChar":defC,
				"attackWeapon":0, // 0 CaC, 1 Tir
				"resultsHit":[],
				"nbHits":0,
				"resultsHurt":[],
				"nbHurts":0,
				"resultsArmor":[],
				"nbWounds":0,
				"scoreToHit":function(){return getScore( 3 + this.attackingChar.cc - this.defendingChar.cc);},
				"scoreToHurt":function(){return getScore( 3 + this.attackingChar.strength - this.defendingChar.endurance)},
				"scoreToArmor":function(){return getArmorRoll(this.defendingChar.armor - this.attackingChar.strength +3)},
				"getScoreToHitHtml":function(){
					return "<p> <strong>" + this.attackingChar.name + "</strong> dispose de <strong>" + this.attackingChar.attack + " attaque(s)</strong>. Pour toucher son adversaire, il devra faire <strong>"+ this.scoreToHit() +" +</strong> sur un D6.</p>"				
				},
				"getScoreToHurtHtml":function(){
					return "<p> Pour chaque touche, il devra faire <strong>" + this.scoreToHurt()  + "+</strong> sur un D6 pour blesser.</p>";
				},
				"getScoreToArmorHtml":function(){
					var armorHtml = "<p><strong>"  + this.defendingChar.name  + "</strong>";
														
					if (this.scoreToArmor()<=6)
						armorHtml += " pourra alors tenter un jet d'armure à <strong>" + this.scoreToArmor() + "+</strong> pour tenter d'amortir chaque blessure subie.";
					else 
						armorHtml += " ne pourra pas tenter de jet d'armure.";
					armorHtml += "</p>";
					return armorHtml;
				},
				"getFightRoundHtml":function(){
					return this.getScoreToHitHtml() +  this.getScoreToHurtHtml() + this.getScoreToArmorHtml();
				}
			}
			
		}
		
		
		
	