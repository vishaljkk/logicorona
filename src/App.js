import React, { Component } from 'react';
import {Typography, Grid ,Paper , Container } from '@material-ui/core'
import { withStyles , MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Chart from './functions/Chart'
import TextCard from './functions/TextCard'
import AppBar from './functions/AppBar'
import clsx from 'clsx'
import TopCards from './functions/TopCards';

import VerticalBarChart from './functions/barchart';

const gold_y = [  -0.04410143329658214, -0.7777777777777778, 0.0, -0.8516360376512775, 0.0, 0.02240645305848084, -4.8390885600187925, -0.8051148472649774, -2.5]
const corona_y = [ 4.43021812065762, 6.1327914193200215, 1.9687760695983791, 13.128881201156277, 7.5079377104956855, 7.272540904839392, 8.40927821506635, 8.602026144871012, 9.012792809244099]
const date = [ '10 ','11 ','12 ','13','14','15','16','17','18' ]
const gold_stats_x = ['2020-01-22', '2020-01-23', '2020-01-24', '2020-01-25', '2020-01-26', '2020-01-27', '2020-01-28', '2020-01-29', '2020-01-30', '2020-01-31', '2020-02-01', '2020-02-02', '2020-02-03', '2020-02-04', '2020-02-05', '2020-02-06', '2020-02-07', '2020-02-08', '2020-02-09', '2020-02-10', '2020-02-11', '2020-02-12', '2020-02-13', '2020-02-14', '2020-02-15', '2020-02-16', '2020-02-17', '2020-02-18', '2020-02-19', '2020-02-20', '2020-02-21', '2020-02-22', '2020-02-23', '2020-02-24', '2020-02-25', '2020-02-26', '2020-02-27', '2020-02-28', '2020-02-29', '2020-03-01', '2020-03-02', '2020-03-03', '2020-03-04', '2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11', '2020-03-12', '2020-03-13', '2020-03-14', '2020-03-15', '2020-03-16', '2020-03-17', '2020-03-18']
const gold_stats_y = [4121, 4091, 4097, 4095, 4093, 4145, 4139, 4164, 4126, 4182, 4183, 4186, 4181, 4185, 4159, 4146, 4140, 4133, 4148, 4179, 4168, 4167, 4165, 4161, 4175, 4175, 4179, 4182, 4213, 4217, 4244, 4244, 4359, 4361, 4416, 4337, 4361, 4359, 4365, 4266, 4266, 4270, 4313, 4306, 4460, 4455, 4538, 4537, 4535, 4500, 4500, 4462, 4462, 4463, 4257, 4223, 4120, 4196]

const url_gold = ""

const theme = createMuiTheme({

  palette: {
    primary: {
      main: '#212121',
      contrastText: '#ffffff'
    },
    secondary: {
      main : '#6e6e6e',
      contrastText: '#ffffff'
    },
    background : {
      paper : "#252525",
      main: "000000"
    },
  },

})

const styles = theme => (

  {

    root : {
      backgroundColor: "#343a40", 
      fontStyle: 'italic',
    },
    container : {
      paddingTop : theme.spacing(4),
      paddingBottom : theme.spacing(4),
    },

    paper : {
      padding: theme.spacing(2,2,2,2),
      height: 240
    },

    paper2 : {
      padding: theme.spacing(2,2,2,2),
      height: '80%',
    },

    appBarSpacer: theme.mixins.toolbar,

    givePadding : {
      padding : theme.spacing(3,3,3,3)
    }
  }
)

class App extends Component {

  state={
    pointer : 0,
    gold : [],
    corona : [],
    cardData  :[{title:"GOLD PRICE",text:"1570"},{title:"CONFIRMED",text:"392780"},{title:"DEATH",text:"17159"},{title:"RECOVERED",text:"102980"}]
  }

  componentDidMount(){
    this.initializeChart()
    this.updateCharts()
    setInterval(this.updateCharts,3000)
  }

  generate_corona =  (p) => {

    var f = corona_y.slice(0,p)
    var m = corona_y.slice(p,p+1)
    var l = corona_y.slice(p+1,)

    return([f,m,l])
  }

  generate_gold = (p) =>{

    var f = gold_y.slice(0,p)
    var m = gold_y.slice(p,p+1)
    var l = gold_y.slice(p+1,)

    return([f,m,l])
  }

  generate_chart_gold = (gold)=>{

      var f = gold[0]
      var m = gold[1]
      var l = gold[2]

      var chart = []

      var i = 0;
      for(i = 0 ; i < f.length; i++){
        chart.push({ date : date[chart.length] , f : f[i] });
      }

      chart.push({ date : date[chart.length], f : m[0] , m : m[0]})
      chart.push({ date : date[chart.length ] , m: l[0] , l : l[0] })

      for(i = 1 ; i < l.length; i++){
        chart.push({ date : date[chart.length] , l : l[i] });
      }

      return(chart)
  }

  generate_chart_corona = (corona)=>{

    // console.log(this.state)
    var f = corona[0]
    var m = corona[1]
    var l = corona[2]

    var chart = []

    var i = 0;
    for(i = 0 ; i < f.length; i++){
      chart.push({ date : date[chart.length] , f : f[i] });
    }

    chart.push({ date : date[chart.length], f : m[0] , m : m[0]})
    chart.push({ date : date[chart.length ] , m: l[0] , l : l[0] })

    for(i = 1 ; i < l.length; i++){
      chart.push({ date : date[chart.length] , l : l[i] });
    }

    return(chart)
}

  initializeChart = () =>{
    
    var ret_array = []
    for( var i = 0; i< gold_stats_x.length ; i++){
      ret_array.push({f :  gold_stats_y[i] , date : gold_stats_x})
    }

    this.setState({
      gold_stats : ret_array
    })
  }

  updateCharts = () =>{
    var p = this.state.pointer + 1
    if( p >= date.length - 2){
      p = 0
    }

    var gold = this.generate_gold(p+1)
    var corona = this.generate_corona(p)

    var chart_gold = this.generate_chart_gold(gold)
    var chart_corona = this.generate_chart_corona(corona)

    this.setState({
      pointer : p,
      gold : chart_gold,
      corona : chart_corona
    })
  }

 

  render() {

    const mystyle = {  
      color: "Green",   
      padding: "10px",
      fontStyle: "italic",
      height: '100vh'
    }; 

    const { classes} = this.props
    return (
      <div className={clsx('App',classes.root)}>
        <MuiThemeProvider theme={theme}>
          <AppBar/>
          <div className={classes.appBarSpacer}/>
            <Container className={classes.container} maxWidth="lg" >
              <TopCards cardData={this.state.cardData}/>
              <br/>
              <Grid container direction='row' spacing={3} >
                <Grid item sm={6} xs={12} >
                    <Paper className={classes.paper2} elevation={6} >
                      <Typography color="secondary">
                        <span style={{ color: '#b5a099' , alpha:'0.8' }}>Correlation can have a value :</span> <br/>
                        <p>
                          <ul>
                            <li> <b>1</b> is a perfect positive correlation</li>
                            <li> <b>0</b> is no correlation (the values don't seem linked at all)</li>
                            <li> <b>-1</b> is a perfect negative correlation</li>
                          </ul>
                        </p> 
                      </Typography>
                    </Paper>
                  </Grid>
                <Grid item sm={6} xs={12} >
                  <Paper className={classes.paper2} elevation={6}>
                    <Typography color="secondary">
                        <span style={{ color: '#b5a099' , alpha:'0.8' }}>Corona slope and gold between the time analysed : </span> <br/>
                        <p>
                          <ul>
                            <li> Corona slope +ve w.r.t previous day slope gold +ve</li>
                            <li> Corona slope -ve w.r.t previous day slope gold -ve</li>
                          </ul>
                        </p> 
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              <br/>
              <Grid container spacing={2}  alignItems="center" >
                <Grid item xs={12} md={6} lg={4} xl={4} >
                    <TextCard />
                </Grid>
                <Grid item xs={12} md={6} lg={8} xl={8} >
                  <Paper className={classes.paper}  elevation={6}>
                    <Chart data={this.state.corona} xLabel="March 2020" yLabel="Growth Rate" title="COVID19" toolTipIntro ={[]} toolTipDesp ={[]} />
                  </Paper>
                  <br/>
                  <Paper className={classes.paper} elevation={6}>
                    <Chart data={this.state.gold} xLabel="March 2020" yLabel="Change in Price" title="GOLD" toolTipIntro ={[]} toolTipDesp ={[]} />
                  </Paper>
                </Grid>
              </Grid>
              <VerticalBarChart/>
              <br/>
              <Paper className={classes.givePadding}>
                <Typography color="secondary" align="center">
                <p>We found that with each day rising or falling patient it had an effect the other day during the tested sample period and also that this relation in time may come to direct impact in real time soon but it may happen different.</p>
                  <span style={{ color: '#b5a099'  }} >But the main thing to say was that any investment in the market is actually a deep analysis of all different data points.<br/> So invest according to the data points that are visible and try to found out as much as possible data points and then invest.<br/> There are relation to many things we just need to find the biggest thing that can impact at a particular point and there by invest and also should get a deep view by analysing the entire data points combination as a whole. </span>
                </Typography>
              </Paper>
              <br/>
              <Paper className={classes.givePadding}>
                <Typography color="secondary" >
                  <span style={{color:'#f20231'}}> Correlation is Not Causation </span><br/>
                  <p>What it <b>really</b> means is that a correlation does <b>not prove </b> one thing causes the other : 
                      <ul>
                        <li>One thing <b>might</b> cause the other</li>
                        <li>The other <b>might</b> cause the first to happen</li>
                        <li>They may be linked by a different thing</li>
                        <li>Or it could be a random chance!</li>
                      </ul>
                      There can be many reasons the data has a good correlation.
                  </p>
                  
                </Typography>
              </Paper>
              <br/>
              <br/>
              <Paper className={classes.paper} elevation={6} >
                <Chart data={this.state.gold_stats} xLabel="YEAR 2020" yLabel="rate of gold" title="GOLD STATISTICS" toolTipIntro ={[]} toolTipDesp ={[]} />
              </Paper>
            </Container>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);