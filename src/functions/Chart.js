import React from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Line , ResponsiveContainer , Tooltip, Label} from 'recharts'
import { Typography } from '@material-ui/core'


function Chart(props) {

    const getTipIntro = (label)=>{

        var index = parseInt(label)
        // console.log(index,label)
        return props.toolTipIntro[index - 1]
    }
    
    const getTipDiscription = (label)=>{
    
        var index = parseInt(label)
    
        return props.toolTipDesp[index - 1]
    }
    
    const CustomTooltip = ({ active, payload , label}) => {
    
        if(active){
    
            const style={
                    backgroundColor: 'rgba(52, 52, 52, 0.4)',
                    color : '#aaaaaa'
                }
            return(
                <div className="custom-tooltip" style = {style}>
                    <p className="label">{`${label} : ${payload[0].value}`}</p>
                    <p className="intro">{getTipIntro(label)}</p>
                    <p className="desc">{getTipDiscription(label)}</p>
                </div>
            )
        }
    
        return null;
    }

    return (
        <React.Fragment>
            <Typography variant="h6" style={{ color: '#f20231' }} align="center" >{props.title}</Typography>
            <ResponsiveContainer>
                <LineChart  margin={{top: 16,right: 16, bottom: 50, left: 16}} data={props.data}>
                    <Line type='linear' dataKey="f" stroke="#f8e4cc" dot={false} activeDot={{ r: 3 }} strokeWidth={2}/>
                    <Line type='linear' dataKey="l" stroke="#f8e4cc" dot={false} activeDot={{ r: 3 }} strokeWidth={2}/>
                    <Line type='linear' dataKey='m' stroke="#f20231" dot={false} activeDot={{ r: 3 }} strokeWidth={2}/>
                    <CartesianGrid stroke="#aaaaaa" strokeDasharray="2 2" />
                    <XAxis dataKey="date" tick={{ fill: '#f8e4cc' , fontSize: 10}}>
                        <Label value={props.xLabel} position="bottom" style={{ fill: 'grey'}} />
                    </XAxis>
                    <YAxis tick={{ fill: '#f8e4cc' , fontSize: 10}} >
                        <Label value={props.yLabel} angle={-90}  position="insideBottomLeft" style={{ fill: 'grey'}} />
                    </YAxis>
                    <Tooltip content={<CustomTooltip/>}/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    )
}

export default Chart
