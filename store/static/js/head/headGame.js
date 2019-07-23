
//Definición de variables a usar
var headGame = new Kiwi.Game();
var sCampo = new Kiwi.State( "sCampo" );

//En la parte del preload se cargan todas las herramientas necesarias a la hora de iniciar el juego.
sCampo.preload = function () {
    Kiwi.State.prototype.preload.call(this);
	
    // Adds a basic score widget to the defaultHUD of the game.
    
    // Creación de la barra de puntaje (score) y el título del juego.
    this.score = new Kiwi.HUD.Widget.BasicScore( this.game, 120, 60, 0 );
    this.scoreBest = new Kiwi.HUD.Widget.BasicScore( this.game, this.game.stage.width-50,60, 0 );
    this.title = new Kiwi.HUD.Widget.TextField( this.game, "Head 21 GAME", this.game.stage.width * 0.5-120, 20, "#000", 80, 'normal', 'Impact' );
    this.scoreText = new Kiwi.HUD.Widget.TextField( this.game, "Score:", 50, 60, "#000", 80, 'normal', 'Impact' );
    this.scoreBestText = new Kiwi.HUD.Widget.TextField( this.game, "Best Score:", this.game.stage.width - 170, 60, "#000", 80, 'normal', 'Impact' );

    
    this.title.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
    
    //Implementación del puntaje y el título en la pantalla del juego. 
    this.game.huds.defaultHUD.addWidget( this.title );
    this.game.huds.defaultHUD.addWidget( this.score );
    this.game.huds.defaultHUD.addWidget( this.scoreBest );
    this.game.huds.defaultHUD.addWidget( this.scoreText);
    this.game.huds.defaultHUD.addWidget( this.scoreBestText );

    
    //this.score.style.color = 'blue';

    //this.scoreText.style.background = 'white';
    //this.scoreBestText.style.background = 'white';

    //this.title.style.background = 'white';

    //Designación y agregación de estilo al título, al puntaje y al mejor puntaje
    this.title.style.fontSize = '30px';
    this.title.style.color = ' #f79ec4 ';
    this.title.style.textShadow = '2px 2px 3px orange';

    this.scoreText.style.textShadow = '2px 2px 2px white';
    this.scoreText.style.color = '  #d9d3d5  ';
    this.scoreText.style.fontSize = '20px';

    this.scoreBestText.style.textShadow = '2px 2px 2px white';
    this.scoreBestText.style.color = '  #d9d3d5  ';
    this.scoreBestText.style.fontSize = '20px';

    //this.scoreBest.style.background = 'white'; 
    this.scoreBest.style.textShadow = '2px 2px 2px orange';
    this.scoreBest.style.color = ' #f79ec4 ';
    this.scoreBest.style.fontSize = '32px';
    this.scoreBest.text = localStorage.getItem("scoreBest");

    //this.score.style.background = 'white';    
    this.score.style.color = ' #87e5f9 ';
    this.score.style.fontSize = '32px';
    this.score.style.textShadow = '2px 2px 2px orange';
    
    //Se añaden los sprites de las imagenes a utilizar, asignando nombre, ruta y el recorte del sprite
    this.addSpriteSheet( 'jugador1', globals.jugador1, 100, 100 );
    this.addImage( 'background', globals.background);
    this.addSpriteSheet('piso', globals.piso,131,65);
    this.addSpriteSheet('arco1', globals.arco1,133,241);
    this.addSpriteSheet('arco2', globals.arco2,133,241);
    this.addSpriteSheet('balon', globals.balon,60,60);

    
}

/*En la parte de create  */
sCampo.create = function(){

    this.menuWidth = 100;
    //Se crea y da estilo al menú el cual es el botón que da la opción de jugar de nuevo.
    this.volverJugarBtn = new Kiwi.HUD.Widget.MenuItem( this.game, 'Jugar otra vez', 0, 0 );
    this.volverJugarBtn.style.color = 'white';
    this.volverJugarBtn.style.display = 'block';
    this.volverJugarBtn.style.boxSizing = 'border-box';
    this.volverJugarBtn.style.width = (this.menuWidth * 2).toString() + 'px';
    this.volverJugarBtn.style.textAlign = 'center';
    this.volverJugarBtn.style.cursor = 'pointer';
    this.volverJugarBtn.style.padding = '0.5em 1em';
    this.volverJugarBtn.style.backgroundColor = '#da503c';
    this.volverJugarBtn.style.boxShadow = '2px 2px 7px red';
    this.menu = new Kiwi.HUD.Widget.Menu( this.game, this.game.stage.width/2 -50, this.game.stage.height/2 );
    this.menu.addMenuItem( this.volverJugarBtn );
    this.game.huds.defaultHUD.addWidget( this.menu );
    this.menu.style.display = "none";

    this.menu.getMenuItem(0).input.onDown.add( this.resetButton, this.game );
    

    //Se dan las especificaciones de la física que tendrá el juego.
    this.GRAVITY = 50;
    this.JUMP_SPEED = -150;
    this.jumping = false;
    this.jumps = 1;

    Kiwi.State.prototype.create.call( this );
 
    this.piso = new Kiwi.Group(this);
    this.balon = new Kiwi.GameObjects.Sprite(this, this.textures.balon, this.game.stage.width/2-32,0);
    this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.background, 0, 0 );
    this.background.transform = new Kiwi.Geom.Transform(0,0,0.4,0.3,0,0)

    //Se determinan los controles de juego y como son los mivimientos del jugador
    this.jugador1 = new Kiwi.GameObjects.Sprite( this, this.textures.jugador1, this.game.stage.width/2-32, this.game.stage.height-200);
    this.leftKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.A );
    this.rightKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.D );
    this.jumpKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.W );
    this.kickKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.S );
    this.jugador1.animation.add( "idleright", [ 0 ], 0.1, false );
    this.jugador1.animation.add( "moveright", [ 1, 2, 3, 4, 5 ], 0.1, true );
    this.jugador1.animation.add( "idleleft", [ 0 ], 0.1, false );
    this.jugador1.animation.add( "moveleft", [ 5, 4, 3, 2, 1], 0.1, true );
    this.jugador1.animation.add( "jumpup", [6,7], 0.01, true );
    this.jugador1.animation.add( "jumpdown", [7,6], 0.1, true );
    this.jugador1.animation.add( "kick", [8], 0.1, true );
    
    
    //this.balon.box.hitbox = new Kiwi.Geom.Rectangle(0,0,60,60);
    //Se le agregan las fisicas al balón
    this.balon.physics = this.balon.components.add(new Kiwi.Components.ArcadePhysics(this.balon, this.balon.box));
    this.balon.physics.acceleration.y = this.GRAVITY;
    this.balon.physics.elasticity = 0.8;
    this.balon.physics.mass = 0.5;
    // Como en el caso del balón, también se la agregan las fisicas al jugador
    this.jugador1.physics = this.jugador1.components.add(new Kiwi.Components.ArcadePhysics(this.jugador1, this.jugador1.box));
    this.jugador1.physics.acceleration.y = this.GRAVITY;

    //Se crean unas restricciones para evitar incoherencias físicas en las colisiones
    this.facing = "right";    
    for(var x=0;x<headGame.stage.width;x+=131){
        var blockPiso = new Kiwi.GameObjects.Sprite(this, this.textures.piso,x,this.game.stage.height-65);
        blockPiso.physics = blockPiso.components.add(new Kiwi.Components.ArcadePhysics(blockPiso,blockPiso.box));
        blockPiso.physics.immovable = true;
        this.piso.addChild(blockPiso);
    }
 
    /*Se crean los dos arcos o canchas, con sus respectivas especificaciones y postariormente se
    agregan al escenario*/
    var arco1 = new Kiwi.GameObjects.Sprite(this, this.textures.arco1,0,this.game.stage.height-241);
    //arco1.box.hitbox = new Kiwi.Geom.Rectangle(33,0,100,0);
    //arco1.physics = arco1.components.add(new Kiwi.Components.ArcadePhysics(arco1,arco1.box));
    //arco1.physics.immovable = true;

    var arco2 = new Kiwi.GameObjects.Sprite(this, this.textures.arco2,this.game.stage.width-133,this.game.stage.height-241);
    //arco2.box.hitbox = new Kiwi.Geom.Rectangle(0,0,100,0);
    //arco2.physics = arco2.components.add(new Kiwi.Components.ArcadePhysics(arco2,arco2.box));
    //arco2.physics.immovable = true;

    this.arcos = new Kiwi.Group(this);
    this.arcos.addChild(arco1);
    this.arcos.addChild(arco2);
    this.jugador1.animation.play( "idleright" );

    this.addChild( this.background );
    this.addChild(this.arcos);
    this.addChild( this.jugador1 );
    this.addChild(this.piso);
    this.addChild(this.balon);
    
}

//Se reinician los valores de las variables para poder empezar un juego nuevo
sCampo.resetButton = function () {    
    
    headGame.states.current.balon.transform.x = headGame.stage._width/2-32;
    headGame.states.current.balon.transform.y = 0;
    headGame.states.current.balon.physics.velocity.x = 0;
    headGame.states.current.balon.physics.velocity.y = 0;
    headGame.states.current.jugador1.visible = true;
    headGame.states.current.jugador1.transform.x = headGame.stage._width/2-32;
    headGame.states.current.jugador1.transform.y = headGame.stage.height-200; 
    headGame.states.current.menu.style.display = "none";

    headGame.states.current.score.counter.current = 0;
}

function send_by_ajax(score){

    var ajax_url = 'http://127.0.0.1:8000/store/save/score';
    var params = 'id_user=' +globals.id_user+ '&key_name=' +globals.key_game+ '&score=' + score;

    ajax_url += '?' + params;
    var ajax_request = new XMLHttpRequest();
    ajax_request.open( "GET", ajax_url, true );
    ajax_request.send();

    return true;
}
/*Se actualizan todas las variables del juego en el transcurso del mismo, como en el 
caso de la colisión del jugador con el balón lo que da un punto y se tendría que 
acualizar el puntaje, además de las posiciones de lo elementos en cuestión. */
sCampo.update = function() {
	
    Kiwi.State.prototype.update.call( this );
 
    this.jugador1.physics.overlapsGroup(this.piso, true);
    
    //this.jugador1.physics.overlapsGroup(this.arcos, true);        
    
    
    this.balon.physics.overlapsGroup(this.piso, true);

    //this.balon.physics.overlapsGroup(this.arcos, true);

    this.jugador1.physics.overlaps(this.balon, true);

    /*Se trabajan las colisiones tanto del balon con el jugador, como del balón con el suelo, separando 
    cada una y así poder tener una pauta de en que momento se concede un punto y en que momento se pierde el juego. */
    var jugadorColisionBalon = Kiwi.Components.ArcadePhysics.collide(this.balon,this.jugador1);
    var onTheGround = this.jugador1.physics.isTouching( Kiwi.Components.ArcadePhysics.DOWN );
    var underArco = this.jugador1.physics.isTouching(Kiwi.Components.ArcadePhysics.UP);
    var balonPiso = this.balon.physics.isTouching(Kiwi.Components.ArcadePhysics.DOWN);
	if(balonPiso && !underArco){
        if(localStorage.getItem("scoreBest")<=this.score.counter.current){
            localStorage.setItem("scoreBest",this.score.counter.current);
            this.scoreBest.counter.current=this.score.counter.current;
        }
        send_by_ajax(this.score.counter.current);
        this.score.counter.current=0;
        this.menu.style.display = "block";
        this.jugador1.visible = false;	
        
	}
	var ale = Math.random()*(3-0)+0;
	ale = ale|0;
	if(underArco){
		this.score.counter.current += 1;
		if(this.score.counter.current % 21==0){
			this.balon.physics.velocity.x+=15;
		}
		if (ale == 1){
			this.balon.physics.velocity.x+=15;
		}else if(ale == 2){
			this.balon.physics.velocity.x-=15;
		}
		
		
	}


	if(this.balon.transform.y> this.game.stage.height-125){
        this.balon.transform.y =this.game.stage.height-125;
    }
    if(jugadorColisionBalon && this.jugador1.transform.x<this.balon.transform.x){
        this.balon.physics.velocity.x = 10;
    }else if(jugadorColisionBalon && this.jugador1.transform.x>this.balon.transform.x){
        this.balon.physics.velocity.x = -10;
    }
    if(!jugadorColisionBalon){
        this.jugador1.physics.velocity.x = 0;
    }
    
    if(underArco && onTheGround){
        //this.jugador1.transform.y =this.game.stage.height-165;		
		this.balon.physics.velocity.y -=100;
    }

    if(this.jugador1.transform.y>this.game.stage.height-165){
        this.jugador1.transform.y =this.game.stage.height-165
    }
    
    if (onTheGround) {     
        this.jumps=1;
        this.jumping = false;
    }

    if (this.jumps>0 && !this.jumping && this.jumpKey.isDown) {
        // Jump when the player is touching the ground and the up arrow is pressed
        this.jugador1.physics.velocity.y = this.JUMP_SPEED;
        this.jumping = true;
        this.jugador1.animation.play("jumpup");
    }
    if (this.jumpKey.isDown && this.jumping) {
        this.jumping = false;   
        this.jumps--;  
    }     
    
    if(underArco){
        this.jumping = false;   
        this.jumps--;         
    }
    
    if ( this.leftKey.isDown ) {
        this.facing = "left";
        if ( this.jugador1.transform.x > 3 ) {
            this.jugador1.transform.x -= 3;
        }
        if ( this.jugador1.animation.currentAnimation.name !== "moveleft" ) {
            this.jugador1.animation.play( "moveleft" );
        }
    }
    else if( this.kickKey.isDown){
        this.jugador1.animation.play("kick");
        if(jugadorColisionBalon){
            console.log("entra");
            this.balon.physics.velocity.x=20;
            this.balon.physics.velocity.y=-100;
        }
    }
     else if ( this.rightKey.isDown ) {
        this.facing = "right";
        if ( this.jugador1.transform.x < this.game.stage.width-100 ) {
            this.jugador1.transform.x += 3;
        }
        if ( this.jugador1.animation.currentAnimation.name !== "moveright" ) {
            this.jugador1.animation.play( "moveright" );
        }
    } 
     else {
        if ( this.jugador1.animation.currentAnimation.name !==
            "idle" + this.facing ) {
 
            this.jugador1.animation.play( "idle" + this.facing );
         }
    }

    if(!(this.balon.transform.x < this.game.stage.width-50)){
        this.balon.physics.velocity.x = -10;

    }
    if(!(this.balon.transform.x > 0)){
        this.balon.physics.velocity.x = 10;

    }
}


sCampo.mouseClicked = function () {
	
	this.score.counter.current += 10;
}

headGame.states.addState( sCampo );
headGame.states.switchState( "sCampo" );