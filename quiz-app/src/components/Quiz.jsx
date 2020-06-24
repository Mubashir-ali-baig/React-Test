import React from 'react'
import questions from '../questions.json';
import StarRatings from 'react-star-ratings';
import ProgressBar from './ProgressBar';
;
class Quiz extends React.Component{
    state={
        currQuestion:0,
        question:"",
        totalLength:questions.length,
        answer:"",
        category:"",
        answerStatus:"",
        options:[],
        classname:'optionList',
        starRating:0,
        score:[
            {
                value:0,
                color:'black'
            },
            {
                value:0,
                displayVal:0,
                color:'grey',
                number:0
            },
            {
                value:100,
                displayVal:100,
                color:'silver'
            }
        ],
    }
    
    decodeString=(encodedString)=>{
        const decoded=decodeURIComponent(encodedString)
        return decoded;
    }

    

    getQuestion=(currQuestion)=>{
        
        if(currQuestion>this.state.totalLength){    
            window.location.reload()
        }
        else{
        const Options=[];
        let rating;
        const Question = this.decodeString(questions[currQuestion-1].question)
        const Category = this.decodeString(questions[currQuestion-1].category)
        const correctAnswer=this.decodeString(questions[currQuestion-1].correct_answer)
        Options.push(correctAnswer)
        questions[currQuestion-1].incorrect_answers.forEach(answer=>{
            Options.push(this.decodeString(answer))
        })
        const questionDifficulty = this.decodeString(questions[currQuestion-1].difficulty)
        if(questionDifficulty==='easy'){
            rating=1
        }
        else if(questionDifficulty==='medium'){
            rating=2
        }
        else{
            rating=3
        }
        
        this.setState({
            currQuestion:currQuestion,
            score:this.state.score,
            question:Question,
            category:Category,
            options:Options,
            answer:correctAnswer,
            starRating:rating,
            answerStatus:""
        })
            
        }
}


    handleOptionClick=(e)=>{
        const {textContent} = e.currentTarget
        const {score}=this.state
        
        let status=""
        const currQuestion=this.state.currQuestion
        if(textContent === this.state.answer ){
            status="Correct"
            
            document.getElementById('selectBtn').className = "correct col-6 mb-5 col-md-5";
            score[1].number += 1;
            
            let sc0 = (score[1].number / 20) * 100;
            let sc1 = (score[1].number/ currQuestion) * 100
            
            

            let sc2= ((score[1].number + (20 - currQuestion))/ 20) * 100

            score[1].displayVal = sc1;
            score[2].displayVal = sc2;

            score[1].value = sc1 - sc0
            score[0].value = sc0
            score[2].value = sc2 - (score[1].value + sc0)
            
            
        }
        else{
            status = "Wrong!"
            document.getElementById('selectBtn').className = "wrong col-6 mb-5 col-md-5";
            score[0].value = (score[1].number / 20) * 100;
            let sc1 = (score[1].number/ currQuestion) * 100

            let sc2 = ((score[1].number + (20 - this.state.currtQuestion))/ 20) * 100
            score[1].displayVal = sc1;
            score[2].displayVal = sc2;

            score[1].value = sc1 - score[0].value
            score[2].value = sc2 - (score[1].value + score[0].value)
        }

        this.setState({
            answerStatus:status,
            score:score,
            answer:"",
            options:[]
        })
        

    }

    handleNextButton=()=>{
        
        const{currQuestion}=this.state;
        
        this.getQuestion(currQuestion + 1)
    }

    getStatus=()=>{
        return(
            this.state.answerStatus?<div><h5>{this.state.answerStatus}</h5><button className="next" onClick={this.handleNextButton}>Next Question</button></div>:''
        )
        
    }

    componentDidMount(){
        
        this.getQuestion(1)
        
    }

   

    render(){

        return(
            
            <div className="container mt-5 mb-5" id="mainContainer">
            <div style={{"marginLeft":"-15px","borderTop":"10px solid darkgray","width":(this.state.currQuestion/20)*100 + "%" }}> </div>
            <h3 className="ml-5 mb-5 mt-4">{`Question ${this.state.currQuestion} of ${this.state.totalLength}`}</h3>
            <p className="category ml-5">{this.state.category}</p>
            <div className="stars ml-5">
            <StarRatings
            rating={this.state.starRating}
            starRatedColor="black"
            starDimension="10px"
            starSpacing="2px"
            numberOfStars={5}
            name='Difficulty'
            />
            </div>
            <h4 className="ml-5">{this.state.question}</h4>
            <div className="row ml-4">{this.state.options.map((i,option)=>(
                <button id="selectBtn" className={`${this.state.classname} col-6 mb-5 col-md-5`} key={i} onClick={this.handleOptionClick}>{i}</button>
                 
            )
            )
            
        }
        {this.getStatus()} 
            </div>
           <ProgressBar score={this.state.score} style={{"marginTop":"100px"}}/> 
           
           </div>
        )
    
    }
}

export default Quiz