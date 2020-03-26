import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Grid , Paper , Typography} from '@material-ui/core'


const useStyles = makeStyles( theme =>({

    paper : {
        display: 'block',
        padding : theme.spacing(2,1,1,1),
        height : 100,
        overflow: 'hidden',
    },
}))

function TopCards(props) {

    const classes = useStyles()

    return (
        <React.Fragment>
            <Grid container  direction='row' spacing={3} alignItems="center" >
                {
                    props.cardData.map( data=>(
                        <Grid item xs>
                            <Paper className={classes.paper} elevation={3}>
                                <Typography align="center" variant="h6" style={{  whiteSpace:'nowrap' ,color : '#f8e4cc'}}  >{data.title}</Typography>
                                <br/>
                                <Typography style={{ color : '#f20231'}} variant="subtitle1" align="center" >{data.text}</Typography>
                            </Paper>
                        </Grid>
                    ))
                }
            </Grid>
        </React.Fragment>
    )
}

export default TopCards