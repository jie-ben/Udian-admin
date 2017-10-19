import React from 'react'
import styles from './screen.less'
import  { DatePicker, Radio, Row,Button,Input   } from 'antd'
const monthFormat = 'YYYY/MM';
import moment from 'moment';
import 'moment/locale/zh-cn';
import MonthCom from './monthCon'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
moment.locale('zh-cn');
const { MonthPicker, RangePicker } = DatePicker
function disabledDate(current) {
  return current && current.valueOf() > Date.now();
}
const NowDate = new Date()
const NowYear = NowDate.getFullYear();    //获取完整的年份(4位,1970-????)
const NowMonth = NowDate.getMonth();       //获取当前月份(0-11,0代表1月)
const NowBay = NowDate.getDate();
class download extends React.Component {
  state = {
      SeleData:"bay",
      Screen:false,
      YearEle:-1,
      BayEle:7,
      monthEle:-1
   }
   componentDidMount(){
        document.onclick=this.onAllHide;
    }
    onStopImmediatePropagation(e){
        e.nativeEvent.stopImmediatePropagation();
    }
    onAllHide =(e)=>{
        this.setState({
          Screen:false,
          SeleData:"bay"
        })
    }
  render() {
    const {onOk}=this.props
    const onPanelChange =()=>{

    }
    const onRadioGroup=(e)=>{
      this.setState({
        SeleData:e.target.value,
      })
    }
    const onScreenShow =()=>{
      this.setState({
        Screen:true
      })
    }
    const onScreenHide=()=>{
      this.setState({
        Screen:false
      })
    }
    const onBayData=(e)=>{
      this.setState({
        BayEle:e.target.getAttribute("value"),
        monthEle:-1,
        YearEle:-1,
      })
    }
    const onYearData=(e)=>{
      this.setState({
        YearEle:e.target.getAttribute("value"),
        BayEle:-1,
        monthEle:-1,
      })
    }
    const onMonthPicker=(e)=>{
      this.setState({
        BayEle:-1,
        YearEle:e.year,
        monthEle:e.month
      })
    }

    const addDate =(a,i)=>{ //天数向减
      let d = new Date(a)
      d = d.valueOf()
      d = d + i * 24 * 60 * 60 * 1000
      d = new Date(d)
      return d;
    }
    const monthComp =(Y,M)=>{ //判断月份是否是12月、
      let ret = ""
      if(M == 12 ){
        ret = (Y+1)+"-"+"1-2"+" " +"23:59:59" 
      }else{
        ret = Y + "-" + (M+1) + "-2"+" " +"23:59:59" 
      }
      console.log(ret)
      return ret 
    }
    //点击确认回调
    const confirm =()=>{
      let SeleData = this.state.SeleData
      let startDate = '',endDate=''
      if(SeleData =="bay"){
        let NextNow  = addDate((NowMonth+1)+"/"+NowBay+"/"+NowYear,-(this.state.BayEle));
        let Y = NextNow.getFullYear();
        let M = NextNow.getMonth()+1;
        let D = NextNow.getDate();
        startDate = NowYear+"-"+ (NowMonth+1)+"-"+ NowBay +" "+"0:0:0";
        endDate = Y+"-"+M+"-"+D+" "+ "23:59:59"
      }else if(SeleData =="month"){
        startDate = this.state.YearEle + "-"+this.state.monthEle + "-1"+" "+"0:0:0"
        endDate = monthComp(this.state.YearEle,this.state.monthEle)
      }else{
        startDate = this.state.YearEle + "-1-1"+" "+"0:0:0"
        endDate = (parseInt(this.state.YearEle) + 1) +" "+ "-1-2"+" "+"23:59:59"
      }
      const data = {
        startDate:startDate,
        endDate:endDate
      }
      onOk(data)
    }
    const mnthProps={
      monthEle:this.state.monthEle,
      yearEle:this.state.YearEle,
    }
    const ScreenInput = {
       display:this.state.Screen ? '':'none'
    }
    const bayDisplay ={
      display:this.state.SeleData=="bay"? '':'none'
    }
    const monthDisplay ={
      display:this.state.SeleData=="month"? '':'none',
      height:'250px'
    }
    const yearDisplay ={
      display:this.state.SeleData=="year"? '':'none'
    }
    let YearArryData=[]
    for(let i=0;i<10;i++){
      YearArryData.push(<Row className={ this.state.YearEle == NowYear-i ? styles.bayDataEle : styles.bayData} value={(NowYear-i)} onClick={onYearData}>{(NowYear-i)}年</Row>)
    }
    return (
      <div className={styles.Calendarbx} onClick={this.onStopImmediatePropagation}>
        <div className={styles.CalendarbxInput}>
          <Input className={styles.CalendarbxIn} placeholder="选择筛选条件" onClick={onScreenShow} />
          <div className={styles.CalendarbxRight} style={ScreenInput}>
            <div className={styles.tabs}>
              <RadioGroup defaultValue={this.state.SeleData} size="small" onChange={onRadioGroup}>
                <RadioButton value="bay" >日</RadioButton>
                <RadioButton value="month">月</RadioButton>
                <RadioButton value="year">年</RadioButton>
              </RadioGroup>
            </div>
            <div style={bayDisplay}>
              <div>
                <Row className={this.state.BayEle == 7 ? styles.bayDataEle : styles.bayData} value="7" onClick={onBayData}>最近7天</Row>
                <Row className={this.state.BayEle == 15 ? styles.bayDataEle : styles.bayData} value="15" onClick={onBayData}>最近15天</Row>
                <Row className={this.state.BayEle == 30 ? styles.bayDataEle : styles.bayData} value="30" onClick={onBayData}>最近30天</Row>
              </div>
            </div>
            <div style={monthDisplay}>
              <MonthCom 
                onChange={onMonthPicker}
                {...mnthProps}
                />
            </div>
            <div style={yearDisplay}>
              <div className={styles.YearData}>{YearArryData}</div>
            </div>
            <div className={styles.DataButton}>
              <Button size="small" style={{marginRight:10}} onClick={onScreenHide}>取消</Button>
              <Button size="small" type="primary" onClick={confirm}>确认</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default download