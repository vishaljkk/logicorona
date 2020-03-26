import React from 'react'
import { Paper , Typography } from '@material-ui/core'
import { makeStyles , useTheme } from '@material-ui/core/styles'


const useStyles = makeStyles( theme =>({

    paper : {
        display: 'block',
        padding : theme.spacing(4,3,3,3),
        height : 517,
        overflow: 'hidden',
        [theme.breakpoints.down('sm')] : {
            height : 'auto'
        },
    },
}))
function TextCard(props) {

    const classes = useStyles()
    return (
        <React.Fragment>
            <Paper className={classes.paper} elevation={6}>
                <br/>
                <Typography  color="secondary" variant="body1" align="center" >We took a sample data of gold and corona from <span style={{ color: '#b5a099' }}>10/03/2020 to 18/03/2020</span> there by calculated the change of gold price and growth rate of corona and then tested the analysis based on the difference of slope of growth rate of corona from its previous day and then found that there was a relative rise or fall between the two data variables and found the <span style={{ color:"#b5a099"}}><b>Pearson correlation</b></span> to be <span style={{ color:"#f20231"}}><b> 0.755 </b></span>
                      which was a pretty gold result and we also analysed results of the entire month and found that gold and corona had an increasing relationship meaning initial in the month of January the rate changed in gold occured in a few days but eventually we saw that this relationship with time has got stronger and then we found that in the month of March it had a one to one relationship as per the pearson correlation we achieved. <br/>
                   </Typography>
            </Paper>
        </React.Fragment>
    )
}

export default TextCard
