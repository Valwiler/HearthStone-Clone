class particules{

    
    constructor(width, heigth){
        this.screenH = heigth - 20;
        this.screenW = width -20;
        this.CursorMinDistance = 150;
        this.x = Math.floor(Math.random() *width ) ;
        this.y = Math.floor(Math.random() *heigth ) ;        
        this.node = document.createElement("div");
        this.node.className = "cercle";
        this.node.style.left = this.x+ "px";
        this.node.style.top = this.y + "px";
        let ratio = (10 - (Math.floor(Math.random() * 10 ))) +2 ;
        this.node.style.height =  (20 - ratio)+"px";
        this.node.style.width =  (20 - ratio)+"px";
        this.speed = ratio * 0.25;
        this.direction = this.generate_random_dir();
        this.dirx = this.direction[0];
        this.diry =  this.direction[1];
        //this.dirx = 0 ;
        //this.diry = 0 ;
        
        document.body.append(this.node);   
    }

    generate_random_dir(){
        let dirx = 0;
        let diry = 0;
        let direction = Math.floor(Math.random() *100 )% 8 ;
        
        switch(direction) {
            case 0:   {dirx =  1 ; diry =  1 ; break;}
            case 1:   {dirx =  1 ; diry =  0 ; break;}
            case 2:   {dirx =  1 ; diry = -1 ; break;}
            case 3:   {dirx =  0 ; diry =  1 ; break;}
            case 4:   {dirx =  0 ; diry = -1 ; break;}
            case 5:   {dirx = -1 ; diry =  0 ; break;}
            case 6:   {dirx = -1 ; diry =  1 ; break;}
            case 7:   {dirx = -1 ; diry = -1 ; break;}
            
            default: {dirx = 1; diry = 0 ;break;}

        }
        return [dirx, diry];
    }

    tick(cursorX, cursorY){
        let currentY = this.node.offsetTop;
        let currentX = this.node.offsetLeft;
        this.update_position(cursorX, cursorY, currentX, currentY);

    }

    flipY(){
        this.diry = this.diry < 0 ? 1 : -1 ; 
    }    

    flipX(){
        this.dirx = this.dirx < 0 ? 1 : -1 ;
    }


    DiagisTooClose(x1,x2,y1,y2){
        let tooClose = false;
        if(Math.sqrt(Math.pow(y2 - y1,2) + Math.pow(x2 - x1,2) ) < this.CursorMinDistance){
            tooClose = true;
            console.log(" is too close" );
        }
        
        return tooClose;
    }

    update_position(cursorX, cursorY, x , y ){
        
        let currentY = y;
        let currentX = x;
        
        let xdirection = 0 ;
        let ydirection = 0 ;
        let Xdiff = cursorX - currentX;
        let Ydiff = cursorY - currentY;

        if(this.DiagisTooClose(cursorX, currentX, cursorY, currentY)){
            if(Ydiff != 0){ydirection = (Ydiff > 0)? -1 : 1;} 
            if(Xdiff != 0){xdirection = (Xdiff > 0)? -1 : 1; }
            currentY +=  ydirection * 4;
            currentX +=  xdirection * 4;
            this.diry = ydirection;
            this.dirx = xdirection;
        }
        else{
            currentY += this.diry * this.speed;
            currentX += this.dirx * this.speed;
        }
        if(currentX <= 0 ){currentX = 0; this.flipX();}
        if(currentX >= this.screenW ){currentX = this.screenW ;this.flipX();}
        if(currentY <= 0 ){currentY = 0; this.flipY();}
        if(currentY >= this.screenH ){currentY = this.screenH; this.flipY(); }
        this.node.style.top = currentY + "px";
        this.node.style.left = currentX + "px";

    }
    

}