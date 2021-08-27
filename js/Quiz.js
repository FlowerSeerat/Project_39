class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    console.log("Inside play()")
    //write code here to hide question elements
      question.hide();
    //write code to change the background color here
       background("yellow");
    //write code to show a heading for showing the result of Quiz
      fill("blue");
      textSize(30);
      text("Result of the quiz",300,50);
      text("______________",300,50)
    //call getContestantInfo( ) here
      Contestant.getPlayerInfo();
    //write condition to check if contestantInfor is not undefined
      if(allContestants!==undefined){
        var displayNames=230;
        //console.log("Inside if()")
        fill("blue");
        textSize(20);
        text("**NOTE: Contestants who answered correct are highlighted in green colour!",130,230);
      }
    //write code to highlight contest who answered correctly
      for(var plr in allContestants){
         var correctAns="2";
         if(correctAns===allContestants[plr].answer)
         fill("green")
         else
         fill("red")

         displayNames+=30;
         textSize(20);
         text(allContestants[plr].name+" : "+allContestants[plr].answer,150,displayNames);
      }
  }

}
