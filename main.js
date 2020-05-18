// DATA MODULE
var DataController = (function(){
    //private
    var data = {
        lists:{
            questions:[{
                question:'what is your name?',
                ans1:'mariam',
                ans2: 'ahmed',
                ans3:'mona',
                ans4:'saeed',
                correctAns: 'ans1'
            },{
                question:'what is your age?',
                ans1:'26',
                ans2: '23',
                ans3:'32',
                ans4:'20',
                correctAns:'ans2'
            },
            {
                question:'What is the color of the sky?',
                ans1:'Black',
                ans2: 'Green',
                ans3:'Blue',
                ans4:'Yellow',
                correctAns: 'ans3'
            },{
                question:'How many pyramids we have in Egypt?',
                ans1:'15',
                ans2: '16',
                ans3:'3',
                ans4:'7',
                correctAns: 'ans3'
            },{
                question:'The wonders of the world are ___?',
                ans1:'ten',
                ans2: 'seven',
                ans3:'awesome',
                ans4:'None of the above',
                correctAns: 'ans2'
            }],
            randomQs: [],
            userAnswers: [sizeOfRandomQ]
        }
    }

    var sizeOfRandomQ=5;
    var newQuIndex;
    while(data.lists.randomQs.length<sizeOfRandomQ)
    {
        newQuIndex = Math.floor(Math.random()*sizeOfRandomQ);
            if(data.lists.randomQs.indexOf(newQuIndex) === -1)
            {
                data.lists.randomQs.push(newQuIndex);
            }
    }
    for(var i=0; i<sizeOfRandomQ; i++)
    {
        data.lists.userAnswers[i]="NULL";
    }
    //public
    return{
        noOfQs:sizeOfRandomQ,
        getUserAnswer: function(i)
        {
            return data.lists.userAnswers[i];
        },
        setUserAnswer: function(answer, index)
        {
            data.lists.userAnswers[index]=answer;
        },
        getQuestion: function(i)
        {
            return data.lists.questions[data.lists.randomQs[i]].question;
        },
        getAnswers: function(i)
        {
            var ansList=[];
            ansList.push(data.lists.questions[data.lists.randomQs[i]].ans1);
            ansList.push(data.lists.questions[data.lists.randomQs[i]].ans2);
            ansList.push(data.lists.questions[data.lists.randomQs[i]].ans3);          
            ansList.push(data.lists.questions[data.lists.randomQs[i]].ans4);
            return ansList;       
        },
        TEST:function(){
            return data;
        },
        Length: data.lists.randomQs.length,
        finalResult: function()
        {
            var result=0;
            for(var i=0; i<sizeOfRandomQ; i++)
            {
                if(data.lists.questions[data.lists.randomQs[i]].correctAns === data.lists.userAnswers[i])
                {
                    result++
                }
            }
            return result;
        }
    }
})();

//UI MODULE
var UIController = (function(){
    //private
    var email = document.querySelector('#mail');
    var pass = document.querySelector('#password');
    //public
    return{
        getUserAnswerUI: function(index){
            var ansCheck = document.querySelectorAll('.answers input');
            var answer;
            for(var i=0; i<ansCheck.length; i++)
            {
                if(ansCheck[i].checked===true)
                {
                    answer = ansCheck[i].value;
                    break;
                }
                else
                {
                    answer="NULL";
                }
            }
            if(answer==="NULL")
            {
                document.querySelector('button[value="'+index+'"]').classList.remove('btn--navigate-arrow');
                document.querySelector('button[value="'+index+'"]').classList.add('btn--warning');
            }
            else{
                document.querySelector('button[value="'+index+'"]').classList.add('btn--navigate-arrow');
                document.querySelector('button[value="'+index+'"]').classList.remove('btn--warning');
                document.querySelector('button[value="'+index+'"]').style.backgroundColor = "#03a9f4";
                document.querySelector('button[value="'+index+'"]').style.color = "#fff";
            }
            return answer;
        },
        displayUserAnswerUI: function(answer, index){
            if(answer!=="NULL")
            {
                document.querySelector('input[value="'+answer+'"]').checked=true;
            }
        },
        mail: email,
        password: pass,
    }
})();

//APP CONTROLLER
var AppController = (function(UICtrl, DataCtrl){
    //private
    //LOGIN PAGE
    UICtrl.mail.value="";
    password = "123";
    document.querySelector('.login .login__btn').addEventListener('click', function(e){
        e.preventDefault();
        if(!validateEmail(UICtrl.mail.value) || UICtrl.password.value !== password)
        {
            UICtrl.mail.value="";
            console.log(UICtrl.password.value);
            UICtrl.password.value="";
            console.log(UICtrl.password.value);
            document.querySelector('.wrong-entry').style.visibility="initial";
        }
        else{
            document.querySelector('.login').classList.add('deactive');
            document.querySelector('.quiz-container').classList.remove('deactive');

        }
        function validateEmail(mail) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(mail).toLowerCase());
        }
    });
    document.querySelector("#submit").classList.add('deactive');
    
    //Quiz Page
    var i=0;
    //display first question
    document.querySelector('.question').textContent=DataCtrl.getQuestion(i);
    //display answers
    var displayAns = document.querySelectorAll('.answers input +span');
    var innerAns = DataCtrl.getAnswers(i);
    for(var a=0; a<displayAns.length; a++)
    {
        displayAns[a].textContent= innerAns[a];
    }
    //Uncheck the radio btns
    var radioUncheck= document.querySelectorAll('.answers input');
    for(var a=0; a<displayAns.length; a++)
    {
        radioUncheck[a].checked=false;
    }
    //display number of questions
    for(; i<DataCtrl.Length; i++)
    {
        document.querySelector('.q-num').insertAdjacentHTML('beforeend', '<button class="btn btn--navigate-arrow" value=""></div>');
        document.querySelector('.q-num').lastChild.setAttribute("value", i);
        document.querySelector('.q-num').lastChild.textContent=i+1;
    }
    //Reset Index
    i=0;
    //Event listener for NEXT BUTTON
    document.querySelector('#nxt').addEventListener('click',function(){
        if(i<DataCtrl.Length-2)
        {
            //get naswer form UI
            //save user answer in data
            DataCtrl.setUserAnswer(UICtrl.getUserAnswerUI(i),i);
            
            //display next question UI
            i++;
            //display next question
            document.querySelector('.question').textContent=DataCtrl.getQuestion(i);
            //display answers
            var displayAns = document.querySelectorAll('.answers input +span');
            var innerAns = DataCtrl.getAnswers(i);
            for(var a=0; a<displayAns.length; a++)
            {
                displayAns[a].textContent= innerAns[a];
            }
            //Uncheck the radio btns
            var radioUncheck= document.querySelectorAll('.answers input');
            for(var a=0; a<displayAns.length; a++)
            {
                radioUncheck[a].checked=false;
            }
            //display User answer
            if(DataCtrl.getUserAnswer(i) != "NULL"){
                UICtrl.displayUserAnswerUI(DataCtrl.getUserAnswer(i), i);
            }
        }
        else{
            
            document.querySelector("#nxt").classList.add('deactive');
            document.querySelector("#submit").classList.remove('deactive');
            //get naswer form UI
            //save user answer in data
            DataCtrl.setUserAnswer(UICtrl.getUserAnswerUI(i),i);
            
            //display next question UI
            i++;
            //display next question
            document.querySelector('.question').textContent=DataCtrl.getQuestion(i);
            //display answers
            var displayAns = document.querySelectorAll('.answers input +span');
            var innerAns = DataCtrl.getAnswers(i);
            for(var a=0; a<displayAns.length; a++)
            {
                displayAns[a].textContent= innerAns[a];
            }
            //Uncheck the radio btns
            var radioUncheck= document.querySelectorAll('.answers input');
            for(var a=0; a<displayAns.length; a++)
            {
                radioUncheck[a].checked=false;
            }
            //display User answer
            if(DataCtrl.getUserAnswer(i) != "NULL"){
                UICtrl.displayUserAnswerUI(DataCtrl.getUserAnswer(i), i);
            }
        }
    });
    //Event Listener for PREV BUTTON
    document.querySelector('#prev').addEventListener('click',function(){
        if(i!==0)
        {
            //get current answer form UI
            //save user answer in data
            DataCtrl.setUserAnswer(UICtrl.getUserAnswerUI(i),i);
            //display Prev question UI
            i--;
            //display Prev question
            document.querySelector('.question').textContent=DataCtrl.getQuestion(i);
            //display answers
            var displayAns = document.querySelectorAll('.answers input +span');
            var innerAns = DataCtrl.getAnswers(i);
            for(var a=0; a<displayAns.length; a++)
            {
                displayAns[a].textContent= innerAns[a];
            }
            //Uncheck the radio btns
            var radioUncheck= document.querySelectorAll('.answers input');
            for(var a=0; a<displayAns.length; a++)
            {
                radioUncheck[a].checked=false;
            }
            //display User answer
            UICtrl.displayUserAnswerUI(DataCtrl.getUserAnswer(i), i);
            //Is "Finish" Button is shown?
            if(i===DataCtrl.noOfQs-2)
            {
                document.querySelector("#nxt").classList.remove('deactive');
                document.querySelector("#submit").classList.add('deactive');
            }
        }
    });

    //Final Result
    document.querySelector("#submit").addEventListener('click', function()
    {
        //deactivate PREV button
        document.querySelector("#prev").classList.add('deactive');
        //Save the last question answer in Data
        //get current answer form UI
        //save user answer in data
        
        DataCtrl.setUserAnswer(UICtrl.getUserAnswerUI(i),i);
        //Print the result
        var res= DataController.finalResult();
        document.querySelector("#result").classList.remove('deactive');
        document.querySelector("#result").textContent="YOUR RESULT IS "+res;

        
        //Deactivate "Finish" Button
        document.querySelector("#submit").classList.add('deactive');
        //Remove questions
        document.querySelector('.q-num').classList.add('deactive');
        //remove side bar
        document.querySelector('.q-display').classList.toggle('deactive');
    });

    // document.querySelector('.q-num button').addEventListener('click', function())
    var navBtns = document.querySelectorAll('.q-num button');

    for(var a=0; a < navBtns.length; a++)
    {
        navBtns[a].addEventListener('click', function(e){
            
        if(i<DataCtrl.Length)
        {
            //get naswer form UI
            //save user answer in data
            DataCtrl.setUserAnswer(UICtrl.getUserAnswerUI(i),i);
            // console.log(e.target.value);
            //display question UI
            i = e.target.value;
            console.log(i);
            if(i==DataCtrl.noOfQs-1)
            {
                document.querySelector("#nxt").classList.add('deactive'); //diplay none
                document.querySelector("#submit").classList.remove('deactive'); // display
            }
            else
            {
                document.querySelector("#nxt").classList.remove('deactive'); //diplay 
                document.querySelector("#submit").classList.add('deactive'); // display none
            }
            //display next question
            document.querySelector('.question').textContent=DataCtrl.getQuestion(i);
            //display answers
            var displayAns = document.querySelectorAll('.answers input +span');
            var innerAns = DataCtrl.getAnswers(i);
            for(var a=0; a<displayAns.length; a++)
            {
                displayAns[a].textContent= innerAns[a];
            }
            //Uncheck the radio btns
            var radioUncheck= document.querySelectorAll('.answers input');
            for(var a=0; a<displayAns.length; a++)
            {
                radioUncheck[a].checked=false;
            }
            //display User answer
            if(DataCtrl.getUserAnswer(i) != "NULL"){
                UICtrl.displayUserAnswerUI(DataCtrl.getUserAnswer(i), i);
            }  
        }
        });
    }
    //public
    return{
    }
})(UIController, DataController);