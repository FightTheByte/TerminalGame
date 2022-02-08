const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field{
    constructor(field){
      this.field = field;    
    }
    
    print(){
      this.field.forEach(index => {
        console.log(index.join(''));
      });
    }

    Movement(x,y){
      this.print();
      let xAxis = x;
      let yAxis = y;
      const move = prompt('move to where?, options are r,l,u,d (right, left, up, down): ' );
      switch(move){
        case 'r':
          if(y < this.field[x].length-1 && this.field[x][y+1] != '*'){
            y += 1;
          } else {
            console.log("Can't move right, please choose another direction");
            this.Movement(xAxis,yAxis);
          } 
          break;  
        case 'l':
          if(y > 0 && this.field[x][y-1] != '*'){
            y -= 1;
          } else {
            console.log("Can't move left, please choose another direction");
            this.Movement(xAxis,yAxis);
          }
          break;
        case 'u':
          if(x > 0 && this.field[x-1][y] != '*'){
            x -= 1;
          } else {
            console.log("Can't move  up, please choose another direction");
            this.Movement(xAxis,yAxis);
          }
          break;
        case 'd':
          if(x < this.field.length-1 && this.field[x+1][y] != '*'){
            x += 1;
          } else {
            console.log("Can't move down, please choose another direction");
            this.Movement(xAxis,yAxis);
          }
          break;     
      }
      this.resultOfMovement(x,y);
    }

    resultOfMovement(xAxis,yAxis){
      let arrayPosition = this.field[xAxis][yAxis];
      switch(arrayPosition){
        case '^':
          console.log('congratulations, you win');
          process.exit();
        case 'O':
          console.log("Whoops, you've lost");
          process.exit();
        case '░':
          this.field[xAxis].splice(yAxis, 1, '*');
          this.Movement(xAxis, yAxis);      
      }
    }

    hardModeResult(xAxis,yAxis){
      let arrayPosition = this.field[xAxis][yAxis];
      switch(arrayPosition){
        case '^':
          console.log('congratulations, you win');
          return process.exit(1);
        case 'O':
          console.log("Whoops, you've lost");
          return process.exit(1);
        case '░':
          this.field[xAxis].splice(yAxis, 1, '*');
          this.hardModeMovement(xAxis, yAxis);      
      }
    }
    
    hardModeMovement(x,y){
      let xAxis = x;
      let yAxis = y;
      let randomXAxis = Math.floor(Math.random()*this.field.length);
      let randomYAxis = Math.floor(Math.random()*this.field[0].length);
      if(this.field[randomXAxis][randomYAxis] != '^' && this.field[randomXAxis][randomYAxis] != '*'){
        if(this.field[randomXAxis][randomYAxis] != 'O'){
          this.field[randomXAxis][randomYAxis] = 'O';
        } else {
          this.hardModeMovement(xAxis,yAxis);
        };
      } else {
        this.hardModeMovement(xAxis,yAxis);
      }; 
      this.print();
      const move = prompt('move to where?, options are r,l,u,d (right, left, up, down): ' );
      switch(move){
        case 'r':
          if(y < this.field[x].length-1 && this.field[x][y+1] != '*'){
            y += 1;
          } else {
            console.log("Can't move right, please choose another direction");
            this.hardModeMovement(xAxis,yAxis);
          } 
          break;  
        case 'l':
          if(y > 0 && this.field[x][y-1] != '*'){
            y -= 1;
          } else {
            console.log("Can't move left, please choose another direction");
            this.hardModeMovement(xAxis,yAxis);
          }
          break;
        case 'u':
          if(x > 0 && this.field[x-1][y] != '*'){
            x -= 1;
          } else {
            console.log("Can't move  up, please choose another direction");
            this.hardModeMovement(xAxis,yAxis);
          }
          break;
        case 'd':
          if(x < this.field.length-1 && this.field[x+1][y] != '*'){
            x += 1;
          } else {
            console.log("Can't move down, please choose another direction");
            this.hardModeMovement(xAxis,yAxis);
          }
          break;     
      }
      this.hardModeResult(x,y);
    }
    
    runGame(){
      let xAxis=Math.floor(Math.random()*this.field.length);
      let yAxis=Math.floor(Math.random()*this.field[0].length);
      if(this.field[xAxis][yAxis] != 'O' && this.field[xAxis][yAxis] != '^'){
      this.resultOfMovement(xAxis,yAxis)
      } else {
        this.runGame();
      }
    }

    hardMode(){
      let xAxis=Math.floor(Math.random()*this.field.length);
      let yAxis=Math.floor(Math.random()*this.field[0].length);
      if(this.field[xAxis][yAxis] != 'O' && this.field[xAxis][yAxis] != '^'){
      this.hardModeResult(xAxis,yAxis);
      } else {
        this.hardMode();
      }
    }

    static generateField(height, length){
      const field = [];
      const randomiserArray = ['O','░'];
      let index = 2;
      let counter = 0;
      for(let i = 0; i < length; i++){
         for(let j = 0; j < height; j++){
            if(!field[i]){
               field[i] = [];
            };
            let randomNumber = Math.floor(Math.random()*index)
            
            let fieldItem = randomiserArray[randomNumber]
            
            if(counter === 0){
              field[i][j] = '░';
              counter ++;
            } else if(j === height-1 && i === length-1){
              field[i][j] = '^';
            } else if(i===0){
              field[i][j] = fieldItem;
            } else if(i===0 && j===1){
              field[i][j] = '░';
            } else if(i > 0 && field[i-1][j+1] === 'O'){
              field[i][j] = '░';
            } else if(i > 0 && field[i-1][j-1] === 'O'){
              field[i][j] = '░';
            } else if(field[i][j-2] && field[i][j-1] === 'O'){
              field[i][j] = '░';
            } else {
              field[i][j] = fieldItem;
            }
            
        }  
              
              
        
      }
      return field;
    }  


}   


let playingField =  Field.generateField(10,10);


const game = new Field(playingField);

game.hardMode();

