$(document).ready(function() {

    
    var timeLeft = 25;
    var questionNumber = 0;
    var runningTimer;

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
        
        if(timeLeft > 0){
        //console.log("from show time");
            $("#timer").html("Time left: " + timeLeft);
            runningTimer = setTimeout(keepTime, 1000);
            //timeLeft--;
        }
        else{
            questionNumber++;
            timeLeft = 25;
            $("#question").empty();
            $("#choices").empty();
            
            setTimeout(keepTime, 1000);
            
            loadQuestion();
        }
    }

    function loadQuestion(){          
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
                        nextQuestion();
                        
                    }else{
                        console.log("no!");
                        nextQuestion();
                    }                 
                });              
              questionDiv.append(newAnswer);                
            }            
    }

    function nextQuestion(){
        timeLeft = 25;
        clearInterval(runningTimer);
        $("#question").empty();
        $("#choices").empty();
        questionNumber++;
        /*loadQuestion();
        keepTime();*/        
    }

});