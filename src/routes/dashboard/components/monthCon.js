import React from 'react'
import styles from './monthCon.less'
import {Icon,Row,Col } from 'antd'
const NowDate = new Date()
const NowYear = NowDate.getFullYear();    //获取完整的年份(4位,1970-????)
const NowMonth =NowDate.getMonth();       //获取当前月份(0-11,0代表1月)
class month extends React.Component {
  state = {
      year:NowYear,
      monthId:NowMonth + 1,
      yearEle:NowYear,
   }
  componentWillReceiveProps(nextProps){
    this.setState({
      monthId:nextProps.monthEle,
      yearEle:nextProps.yearEle,
    })
  }
  render() {
    const {onChange} = this.props
    const onDoubleLeft =()=>{
      let CurrentYear = parseInt(this.state.year)
      if(CurrentYear > 2010 && CurrentYear <= 2030){
        this.setState({
          year:CurrentYear-1
        })
      }
    }
    const onDoubleRight =()=>{
      let CurrentYear = parseInt(this.state.year)
      if(CurrentYear >= 2010 && CurrentYear< 2030){
        this.setState({
          year:CurrentYear+1
        })
      }
    }
    const onMonthDataEle=(e)=>{
      this.setState({
        monthId:e,
        yearEle:this.state.year
      })
      const data = {
        month:e,
        year:this.state.year
      }
      onChange(data)
    }
    const MonthData = [
      {id:1,month:"1月"},
      {id:2,month:"2月"},
      {id:3,month:"3月"},
      {id:4,month:"4月"},
      {id:5,month:"5月"},
      {id:6,month:"6月"},
      {id:7,month:"7月"},
      {id:8,month:"8月"},
      {id:9,month:"9月"},
      {id:10,month:"10月"},
      {id:11,month:"11月"},
      {id:12,month:"12月"},
    ]
    
    // AllNameStyles = item.id == this.state.monthId ? styles.smonthEleStyle :styles.smonthStyle
    let allArrData = []
    for(let i=0;i<MonthData.length;i++){
      if(NowYear == this.state.year){
        if((NowMonth+1) >= MonthData[i].id){
          allArrData.push(<Col span={8} key={MonthData[i].id} className={styles.MonthDataCol}><a onClick={(e)=>onMonthDataEle(MonthData[i].id)} className={MonthData[i].id == this.state.monthId &&this.state.yearEle==this.state.year? styles.smonthEleStyle :styles.smonthStyle}>{MonthData[i].month}</a></Col>)
        }else{
          allArrData.push(<Col span={8} key={MonthData[i].id} className={styles.MonthDataCol}><a className={styles.smonthEleAllowed}>{MonthData[i].month}</a></Col>)
        }
      }else if(NowYear < this.state.year){
        allArrData.push(<Col span={8} key={MonthData[i].id} className={styles.MonthDataCol}><a className={styles.smonthEleAllowed}>{MonthData[i].month}</a></Col>)
      }else{
        allArrData.push(<Col span={8} key={MonthData[i].id} className={styles.MonthDataCol}><a onClick={(e)=>onMonthDataEle(MonthData[i].id)} className={MonthData[i].id == this.state.monthId &&this.state.yearEle==this.state.year ? styles.smonthEleStyle :styles.smonthStyle}>{MonthData[i].month}</a></Col>)
      }
    }
    return (
      <div>
        <div className={styles.monthTitle}>
          <div className={styles.doubleLeft} onClick={onDoubleLeft}><Icon type="double-left"/></div>
          <div>{this.state.year}</div>
          <div className={styles.doubleRight} onClick={onDoubleRight}><Icon type="double-right"/></div>
        </div>
        <div>
          <Row gutter={24}>{allArrData}</Row>
        </div>
      </div>
    );
  }
}

export default month  