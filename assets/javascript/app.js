$(document).ready(function() {

    
    var timeLeft = 10;
    //var quickTime = 3;
    var questionNumber = 0;
    var checkAnswer;
    var numberRight = 0;
    var numberWrong = 0;

    //main timer
    var runningTimer;
    
    //timer to show answer before moving on
    var quickTimer;
    

    var triviaQ = [
        {
            ask: "In Aladdin, what is the name of Jasmine's pet tiger?",
            answer: ["Rajah", "Bo", "Iago", "Jack"],
            correct: 0 
        },
        {
            ask: "In Peter Pan, Captain Hook had a hook on which part of his body?",
            answer: ["Right Foot", "Left Hand", "Left Foot", "Right Hand"],
            correct: 1    
        },
        {
            ask: "After being on earth, where did Hercules first meet his father Zeus?",
            answer: ["Mount Olympus", "Greece", "In the Temple of Zeus", "Elysian   Fields"],
            correct: 2
    
        },];       

    $("#startButton").on("click", function() { 
        
            keepTime();
            console.log("from start button"); 
            loadQuestion();              
    });

    $(".list-group").on("click", "li", function() {       
        console.log(this);                      
    });    

    function keepTime() {
        $("#startButton").hide();
        timeLeft--;
        
        if(timeLeft >= 0){
        //console.log("from show time");
            $("#timer").html("Time left: " + timeLeft);
            runningTimer = setTimeout(keepTime, 1000);
            //timeLeft--;
        }
        else{
            questionNumber++;
            timeLeft = 10;
            $("#question").empty();
            $("#choices").empty();
            
            setTimeout(keepTime, 1000);
            
            loadQuestion();
        }
    }

    function loadQuestion(){  
          //keepTime(); 
          clearInterval(quickTimer);     
          var rightAnswer = triviaQ[questionNumber].correct;
          
          var questionDiv = $("<ul>")
          questionDiv.text(triviaQ[questionNumber].ask);
          $("#question").append(questionDiv);
    
          for(var i=0; i<triviaQ[questionNumber].answer.length; i++){
              var newAnswer = $("<li>");
              newAnswer.text(triviaQ[questionNumber].answer[i]);
              newAnswer.val(i);

              newAnswer.on("click", function(){                   
                    console.log($(this).val());
                    console.log();
                    if($(this).val() === rightAnswer){
                        console.log("yes!!");
                        numberRight++;
                        checkAnswer = "You got this one right! ";
                        clearTimeout(runningTimer);
                        display();
                        quickTimer = setInterval(nextQuestion, 3000);
                        
                        //nextQuestion();
                        
                    }else{
                        console.log("no!");
                        numberWrong++;
                        checkAnswer = "You got this one wrong - the correct answer was ";
                        display();
                        clearTimeout(runningTimer);
                        display();
                        quickTimer = setInterval(nextQuestion, 3000);
                        //nextQuestion();
                    }                 
                });              
              questionDiv.append(newAnswer);                
        }            
    }

    function nextQuestion(){
        timeLeft = 10;
        //setTimeout(keepTime,1000);
        //clearInterval(quickTimer);
        $("#update").empty();
        $("#question").empty();
        $("#choices").empty();
        questionNumber++;
        //setInterval(runningTimer);
        keepTime();
        loadQuestion();
               
    }

    function display(){
            $("#update").html(checkAnswer + "So far " + numberRight + " correct, and " + numberWrong + " incorrect");                   
    }

    function emptyDiv(){
        $("#update").empty();
        $("#question").empty();
        $("#choices").empty();
    }

});