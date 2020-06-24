import React from 'react';

class ProgressBar extends React.Component{
    
    render(){
        const {score}=this.props
        return(
            
            <div className="row">
              
            <div className="col-6 text-left">
                    <span>Score: {Math.round(score[1].displayVal)}%</span>
                </div>
                
                <div className="col-6 text-right">
                    <span>Max Score: {Math.round(score[2].displayVal)}%</span>
                </div>
            
            
            
            <div
            className="barProgress"
            >
            {score.map((item,index)=>{
                return (
                    <div
                    key={index}
                    style={{
                        "width":item.value + "%",
                        "backgroundColor":item.color
                    }}
                    className="partialBarProgress"
                    />
                )
            })}
            </div>
            
            </div>
            
        )
        }
}

export default ProgressBar;