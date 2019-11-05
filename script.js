/**************************************
 ***********QUIZ CONTROLLER************
 *************************************/
let quizController=(function(){

    //******Question Constructor****/
    function Question(id,questionText,options,correctAnswer){
        this.id=id;
        this.questionText=questionText;
        this.options=options;
        this.correctAnswer=correctAnswer;

    }

let questionLocalStorage={
       setQuestionCollection:function(newCollection){
           localStorage.setItem('questionCollection',JSON.stringify(newCollection));
       },
       getQuestionCollection:function(){
         return JSON.parse(localStorage.getItem('questionCollection'));   
       },
       removeQuestionCollection:function(){
           localStorage.removeItem('questionCollection');
       }

    };
    let quizProgress={
        questionIndex :0
    };

    /**PERSON CONSTRUCTOR ***/
    function Person(id,firstname,lastname,score){
        this.id=id;
        this.firstname=firstname;
        this.lastname=lastname;
        this.score=score;
    }

    let currPersonData={
        fullname:[],
        score:0
    };

    let adminFullName=['John','Smith'];

    let personLocalStorage={
        setPersonData:function(newPerssonData){
            localStorage.setItem('personData', JSON.stringify(newPerssonData) );
            
        },

        getPersonData:function(){
            return JSON.parse(localStorage.getItem('personData'));

        },

        removePersonData:function(){
            localStorage.removeItem('personData');
        }

    };

    

    return {
        getQuizProgress:quizProgress,
        getQuestionLocalStorage: questionLocalStorage,
        addQuestionToLocalStorage:function(newQuestText,opts){
            let optionsArr,corrAns, questionId, newQuestion,getStoredQuestions,isChecked;
            optionsArr=[];
            isChecked=false;

            if(questionLocalStorage.getQuestionCollection()!==null){
                questionId=questionLocalStorage.getQuestionCollection().length;
                
            }else{
                questionId=0;
            }
           

            for(i=0;i<opts.length;i++){
                if(opts[i].value!==''){
                    optionsArr.push(opts[i].value);
                    
                }
                if(opts[i].previousElementSibling.checked && opts[i].value!==''){
                  corrAns=opts[i].value;
                  isChecked=true;
                }
            }

            if(newQuestText.value!==''){
                if(optionsArr.length>=2){
                    if(isChecked){
                        newQuestion=new Question(questionId,newQuestText.value,optionsArr,corrAns);
         //   console.log(newQuestion);
            
            if(questionLocalStorage.getQuestionCollection()!==null){
                getStoredQuestions=questionLocalStorage.getQuestionCollection();
                getStoredQuestions.push(newQuestion);
                questionLocalStorage.setQuestionCollection(getStoredQuestions);
            }else{
                getStoredQuestions=[newQuestion];
                questionLocalStorage.setQuestionCollection(getStoredQuestions);
            }
               
            console.log(questionLocalStorage.getQuestionCollection());
            newQuestText.value='';
            for(let x=0;x<opts.length;x++){
                opts[x].value='';
                opts[x].previousElementSibling.checked=false;
                
            }         
            return true;

                    }else{
                        alert('You missed to check the correct answer');
                        return false;
                    }

                }else{
                  alert('you must write at least two answers');
                  return false;
                }

            }else{
                alert('you must write a question');
                return false;
            }
        },
        checkAnswer:function(ans){
            if(questionLocalStorage.getQuestionCollection()[quizProgress.questionIndex].correctAnswer===ans.textContent){
                currPersonData.score++;
                return true;
            }else{
                return false;
            }

        },
        isFinished:function(){
            return quizProgress.questionIndex+1 === questionLocalStorage.getQuestionCollection().length;
        },
        addPerson:function(){
            let newPerson,personId,personData;
            if(personLocalStorage.getPersonData()!==null){
                personId=personLocalStorage.getPersonData().length;
            }else{
                personId=0;
            }
            newPerson=new Person(personId,currPersonData.fullname[0],currPersonData.fullname[1],currPersonData.score );
            if(personLocalStorage.getPersonData()!==null){
                personData=personLocalStorage.getPersonData();
                personData.push(newPerson);
                personLocalStorage.setPersonData(personData);
               
            }else{
                personLocalStorage.setPersonData([]);
                personData=personLocalStorage.getPersonData();
                personData.push(newPerson);
                personLocalStorage.setPersonData(personData);
            }
            

        },
        getCurrPersonData:currPersonData,
        getAdminFullName:adminFullName,
        getPersonLocalStorage:personLocalStorage

    };
    

})();

/**************************************
 ***********UI CONTROLLER************
 *************************************/
let UIController=(function(){

    
    let domItems={
        /********Admin Panel Elements*********/
        insertedQuestionWrapper:document.querySelector('.inserted-questions-wrapper'),
        questInsertBtn:document.getElementById('question-insert-btn'),
        newQuestionText:document.getElementById('new-question-text'),
        adminOptions:document.querySelectorAll('.admin-option'),
        adminOptionsContainer:document.querySelector('.admin-options-container'),
        questUpdateBtn:document.getElementById('question-update-btn'),
        questDeleteBtn:document.getElementById('question-delete-btn'),
        clearListBtn:document.getElementById('questions-clear-btn'),
        /**Quiz section elements*/
        askedQuestionText:document.getElementById('asked-question-text'),
        quizOptionWrapper:document.querySelector('.quiz-options-wrapper'),
        progressBar:document.querySelector('progress'),
        progressPar:document.getElementById('progress'),
        instantAnswerContainer:document.querySelector('.instant-answer-container'),
        instantAnswerTxt:document.getElementById('instant-answer-text'),
        instantAnsDiv:document.getElementById('instant-answer-wrapper'),
        emotionIcon:document.getElementById('emotion'),
        nextQuestBtn:document.getElementById('next-question-btn'),
        /**LANDI?G PAGE ELEMENTS */
        startQuizBtn:document.getElementById('start-quiz-btn'),
        firstNameInput:document.getElementById('firstname'),
        lastNameInput:document.getElementById('lastname'),
        landingPageSection:document.querySelector('.landing-page-container'),
        quizSection:document.querySelector('.quiz-container'),
        adminPanelSection:document.querySelector('.admin-panel-container'),
        finalScoreText:document.getElementById('final-score-text'),
        finalResultSection:document.querySelector('.final-result-container'),
        resultListWrapper:document.querySelector('.results-list-wrapper'),
        resutlClearBtn:document.getElementById('results-clear-btn')

    };

    return {
        getDomItems:domItems,
        addInputsDinamically:function(){

            let addInputs=function(){
                let inputHTML,z;

                z=document.querySelectorAll('.admin-option').length;
                inputHTML='<div class="admin-option-wrapper"><input type="radio" class="admin-option-'+z+'" name="answer" value="'+z+'"><input type="text" class="admin-option admin-option-'+z+'" value=""></div>';
                domItems.adminOptionsContainer.insertAdjacentHTML('beforeend',inputHTML);
                domItems.adminOptionsContainer.lastElementChild.previousElementSibling.lastElementChild.removeEventListener('focus',addInputs);
                domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus',addInputs);
            };
            
            domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus',addInputs);
        },
        createQuestionList:function(getQuestions){
            let questionHTML;
             

            domItems.insertedQuestionWrapper.innerHTML='';
            if(getQuestions.getQuestionCollection()!==null){
                for(i=0;i<getQuestions.getQuestionCollection().length;i++){

                    questionHTML='<p><span>'+(i+1)+'. '+getQuestions.getQuestionCollection()[i].questionText +'</span><button id="question-'+getQuestions.getQuestionCollection()[i].id+'">Edit</button></p>';
                    domItems.insertedQuestionWrapper.insertAdjacentHTML('afterbegin',questionHTML);
                }
            }
            
        },
        editQuestionList:function(event,storageQuestionList,addInputsDynFn,updateQuestionListFn){
            let getId,getStorageQuestionList,foundItem,placeInArr,optionHTML;
            if('question-'.indexOf(event.target.id)){

                getId=parseInt(event.target.id.split('-')[1]);
                getStorageQuestionList=storageQuestionList.getQuestionCollection();
                for(i=0;i<getStorageQuestionList.length;i++){
                    if(getStorageQuestionList[i].id===getId){
                        foundItem=getStorageQuestionList[i];
                        placeInArr=i;
                    }
                }
                domItems.newQuestionText.value=foundItem.questionText;
                domItems.adminOptionsContainer.innerHTML='';
                optionHTML='';
                for(x=0;x<foundItem.options.length;x++){
                optionHTML+='<div class="admin-option-wrapper"><input type="radio" class="admin-option-'+x+'" name="answer" value="'+x+'"><input type="text" class="admin-option admin-option-'+x+'" value="'+foundItem.options[x]+'"></div>';
                }
                domItems.adminOptionsContainer.innerHTML=optionHTML;
                console.log(optionHTML);
                domItems.questDeleteBtn.style.visibility='visible';
                domItems.questUpdateBtn.style.visibility='visible';
                domItems.questInsertBtn.style.visibility='hidden';
                domItems.clearListBtn.style.pointerEvents='none';
                addInputsDynFn();

            }
            let backDefaultView=function(){

                let updatedOptions;

                domItems.newQuestionText.value='';
                updatedOptions=document.querySelectorAll('.admin-option');
                            for(i=0;i<updatedOptions.length;i++){
                                updatedOptions[i].value='';
                                updatedOptions[i].previousElementSibling.checked=false;
                            }
                            
                            domItems.questDeleteBtn.style.visibility='hidden';
                domItems.questUpdateBtn.style.visibility='hidden';
                domItems.questInsertBtn.style.visibility='visible';
                domItems.clearListBtn.style.pointerEvents='';
                updateQuestionListFn(storageQuestionList);

            };
            updateQuestion=function(){
                let newOptions,optionEls ;
                newOptions=[];
                optionEls=document.querySelectorAll('.admin-option');
                foundItem.questionText=domItems.newQuestionText.value;
                foundItem.correctAnswer='';
                for(i=0;i<optionEls.length;i++){
                    if(optionEls[i].value!==''){
                        newOptions.push(optionEls[i].value);
                        if(optionEls[i].previousElementSibling.checked){
                            foundItem.correctAnswer=optionEls[i].value;
                        }
                    }
                }    
                foundItem.options=newOptions;
                if(foundItem.questionText!==''){
                    if(foundItem.options.length>1){
                        if(foundItem.correctAnswer!==''){
                            getStorageQuestionList.splice(placeInArr,1,foundItem);
                            storageQuestionList.setQuestionCollection(getStorageQuestionList);

                            backDefaultView();
                            
                        }else{
                            alert('you didnt check the correct answer');
                        }

                    }else{
                        alert('you must fill two answers at least');
                    }

                }else{
                    alert('please, insert question');
                }
            };
            domItems.questUpdateBtn.onclick=updateQuestion;


            let deleteQuestion=function(){
              getStorageQuestionList.splice(placeInArr,1);
              storageQuestionList.setQuestionCollection(getStorageQuestionList);
              backDefaultView();
            };
            domItems.questDeleteBtn.onclick=deleteQuestion;

        },
        clearQuestionList:function(storageQuestionList){
            if(storageQuestionList.getQuestionCollection()!==null){
                let conf=confirm('Warning! you will lose entire question list');
                if(conf){
                    storageQuestionList.removeQuestionCollection();
                    domItems.insertedQuestionWrapper.innerHTML='';
                }
                
            }

        },
        displayQuestion:function(storageQuestionList,progress){
            let newOptionHTML,characterArr;
            characterArr=['A','B','C','D','E','F'];
        if(storageQuestionList.getQuestionCollection()!==null){
            domItems.askedQuestionText.textContent=storageQuestionList.getQuestionCollection()[progress.questionIndex].questionText;
            domItems.quizOptionWrapper.innerHTML='';
            for(i=0;i<storageQuestionList.getQuestionCollection()[progress.questionIndex].options.length;i++){
                newOptionHTML='<div class="choice-'+i+'"><span class="choice-'+i+'">'+characterArr[i]+'</span><p  class="choice-'+i+'">'+storageQuestionList.getQuestionCollection()[progress.questionIndex].options[i]+'</p></div>';
                domItems.quizOptionWrapper.insertAdjacentHTML('beforeend',newOptionHTML);
            }
        }

        },
        displayProgress:function(storageQuestionList,progress){
            if(storageQuestionList.getQuestionCollection()!==null){
                domItems.progressBar.max=storageQuestionList.getQuestionCollection().length;
                domItems.progressBar.value=progress.questionIndex+1;
            domItems.progressPar.textContent=(progress.questionIndex+1)+'/'+storageQuestionList.getQuestionCollection().length;
            }
            

        },
        newDesign:function(ansResult,selectedAnswer){
            let index=0;
            if(ansResult){
                index=1;
            }
            let twoOptions={
                instantAnswerTxt:['This is a wrong answer','This is a correct answer'],
                 instantAnswerClass:['red','green'],
                 emotion:['images/sad.png','images/happy.png'],
                 optionSpanBg:['rgba(200,0,0,.7)','rgba(0,250,0,.2)']
            };
            domItems.quizOptionWrapper.style.cssText='opacity:0.6; pointer-events:none;';
            domItems.instantAnswerContainer.style.opacity='1';
            domItems.instantAnswerTxt.textContent=twoOptions.instantAnswerTxt[index];
            domItems.instantAnsDiv.className=twoOptions.instantAnswerClass[index];        
            domItems.emotionIcon.setAttribute('src',twoOptions.emotion[index]);
            selectedAnswer.previousElementSibling.style.backgroundColor=twoOptions.optionSpanBg[index];
        },
        
        resetDesign:function(){
            domItems.quizOptionWrapper.style.cssText='';
            domItems.instantAnswerContainer.style.opacity='0';

        },

        getFullName:function(currPerson,storageQuestList,admin){
            if(domItems.firstNameInput.value!=='' && domItems.lastNameInput.value!==''){
            if(!(domItems.firstNameInput.value===admin[0] && domItems.lastNameInput.value===admin[1])){
                if(storageQuestList.getQuestionCollection()!==null){
            currPerson.fullname.push(domItems.firstNameInput.value);
            currPerson.fullname.push(domItems.lastNameInput.value);
            domItems.landingPageSection.style.display='none';
            domItems.quizSection.style.display='block';
            console.log(currPerson);
                }else{
                    alert('Quiz is not ready please contact to admin'); 
                }
            }else{
                domItems.landingPageSection.style.display='none';
            domItems.adminPanelSection.style.display='block';
            }
        }else{
            alert('please enter your first name and last name');
        }
        },

        finalResult:function(currperson){
            domItems.finalScoreText.textContent=currperson.fullname[0]+' '+currperson.fullname[1]+' ,your final score is '+currperson.score;
            domItems.quizSection.style.display='none';
            domItems.finalResultSection.style.display='block';

        },

        
        addResultPNPanel:function(userData){
            let personPar;
            
            if(userData.getPersonData()!==null){
                domItems.resultListWrapper.innerHTML='';
                for(i=0;i<userData.getPersonData().length;i++){
                
                    personPar='<p class="person person-'+i+'"><span class="person-'+i+'">'+userData.getPersonData()[i].firstname+' '+userData.getPersonData()[i].lastname+' - '+userData.getPersonData()[i].score+' Points</span><button id="delete-result-btn_'+i+'" class="delete-result-btn">Delete</button></p>';
                    domItems.resultListWrapper.insertAdjacentHTML('afterbegin',personPar);
                }

               
            }

        },
    

        deleteResult:function(event,userData){
            let getId,personsArr;
            personsArr=userData.getPersonData();
                if('delete-result-btn_'.indexOf(event.target.id)){
                    getId=parseInt(event.target.id.split('_')[1]);
                    for(i=0;i<personsArr.length;i++){
                        if(personsArr[i].id===getId){
                            console.log(personsArr);
                            personsArr.splice(i,1);
                            userData.setPersonData(personsArr);
                        }
                    }
                
                }

        },

        clearResultsList:function(personLocalStorage){
            if(personLocalStorage.getPersonData()!==null){
                let conf=confirm('Warning! you will lose entire result list');
                if(conf){
                    personLocalStorage.removePersonData();
                    domItems.resultListWrapper.innerHTML='';
                }
                
            }

        }


    };
   
})();
 
/**************************************
 *************CONTROLLER***************
 *************************************/
let controller=(function(quizCtrl,UICtrl){

    let selectedDomITems=UICtrl.getDomItems;
  
    UICtrl.addInputsDinamically();
    UICtrl.createQuestionList(quizCtrl.getQuestionLocalStorage);
        selectedDomITems.questInsertBtn.addEventListener('click',function(){
            let adminOptions=document.querySelectorAll('.admin-option');
            let checkBoolean=quizCtrl.addQuestionToLocalStorage(selectedDomITems.newQuestionText,adminOptions);
            if(checkBoolean){
                UICtrl.createQuestionList(quizCtrl.getQuestionLocalStorage);
            }
    
         });

   selectedDomITems.insertedQuestionWrapper.addEventListener('click',function(e){

    UICtrl.editQuestionList(e,quizCtrl.getQuestionLocalStorage,UICtrl.addInputsDinamically,UICtrl.createQuestionList);
   });
   selectedDomITems.clearListBtn.addEventListener('click',function(){
       UICtrl.clearQuestionList(quizCtrl.getQuestionLocalStorage);
   });
   UICtrl.displayQuestion(quizCtrl.getQuestionLocalStorage,quizCtrl.getQuizProgress);
   UICtrl.displayProgress(quizCtrl.getQuestionLocalStorage,quizCtrl.getQuizProgress);
   selectedDomITems.quizOptionWrapper.addEventListener('click',function(e){
       let updatedOptionsDiv=selectedDomITems.quizOptionWrapper.querySelectorAll('div');
       for(i=0;i<updatedOptionsDiv.length;i++){
           if(e.target.className==='choice-'+i){
               let answer=document.querySelector('.quiz-options-wrapper div p.'+e.target.className);
               let answerResult= quizCtrl.checkAnswer(answer);
               UICtrl.newDesign(answerResult,answer);

               if(quizCtrl.isFinished()){
                   selectedDomITems.nextQuestBtn.textContent='Finish';
               }
               let nextQuestion=function(questionData,progress){
                   if(quizCtrl.isFinished()){
                       //**finish quiz */
                       quizCtrl.addPerson();
                       UICtrl.finalResult(quizCtrl.getCurrPersonData);
                       console.log('finished');
                   }else{
                       UICtrl.resetDesign();
                       quizCtrl.getQuizProgress.questionIndex++;
                       UICtrl.displayQuestion(quizCtrl.getQuestionLocalStorage,quizCtrl.getQuizProgress);
                       UICtrl.displayProgress(quizCtrl.getQuestionLocalStorage,quizCtrl.getQuizProgress);
                           


                   }
               };
               selectedDomITems.nextQuestBtn.onclick=function(){
                   nextQuestion(quizCtrl.getQuestionLocalStorage,quizCtrl.getQuizProgress);
               };
               
           }
       }

   });
   selectedDomITems.startQuizBtn.addEventListener('click',function(){
       UICtrl.getFullName(quizCtrl.getCurrPersonData,quizCtrl.getQuestionLocalStorage,quizCtrl.getAdminFullName);

   });

   selectedDomITems.lastNameInput.addEventListener('focus',function(){
       selectedDomITems.lastNameInput.addEventListener('keypress',function(e){
           if(e.keyCode===13){
            UICtrl.getFullName(quizCtrl.getCurrPersonData,quizCtrl.getQuestionLocalStorage,quizCtrl.getAdminFullName);
           }
       });
   });

   UICtrl.addResultPNPanel(quizCtrl.getPersonLocalStorage);
   selectedDomITems.resultListWrapper.addEventListener('click',function(e){
       UICtrl.deleteResult(e,quizCtrl.getPersonLocalStorage);
       UICtrl.addResultPNPanel(quizController.getPersonLocalStorage);

   });
   selectedDomITems.resutlClearBtn.addEventListener('click',function(){
       UICtrl.clearResultsList(quizCtrl.getPersonLocalStorage);
   });
})(quizController,UIController);