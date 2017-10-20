import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card ,Tabs } from 'antd'
import { Screen } from './components'
import styles from './index.less'
import { color } from '../../utils'
import { PieChart, Pie, Sector, Cell,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,LineChart,Line } from 'recharts'
const TabPane = Tabs.TabPane;
const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

const data = [
      {name: '2017-6-1', uv: 4000},
      {name: '2017-6-2', uv: 3000},
      {name: '2017-6-3', uv: 2000},
      {name: '2017-6-4', uv: 2780},
      {name: '2017-6-5', uv: 1890},
      {name: '2017-6-6', uv: 2390},
      {name: '2017-6-7', uv: 3490},
      {name: '2017-6-8', uv: 3490},
      {name: '2017-6-9', uv: 3490},
      {name: '2017-6-10', uv: 3490},
      {name: '2017-6-11', uv: 3490},
      {name: '2017-6-12', uv: 3490},
      {name: '2017-6-13', uv: 3490},
      {name: '2017-6-14', uv: 3490},
      {name: '2017-6-15', uv: 3490},
      {name: '2017-6-16', uv: 3490},
      {name: '2017-6-17', uv: 3490},
      {name: '2017-6-18', uv: 3490},
      {name: '2017-6-19', uv: 3490},
      {name: '2017-6-20', uv: 3490},
      {name: '2017-6-21', uv: 3490},
      {name: '2017-6-22', uv: 3490},
      {name: '2017-6-23', uv: 3490},
      {name: '2017-6-24', uv: 3490},
      {name: '2017-6-25', uv: 3490},
      {name: '2017-6-26', uv: 3490},
      {name: '2017-6-27', uv: 3490},
      {name: '2017-6-28', uv: 3490},
      {name: '2017-6-29', uv: 3490},
      {name: '2017-6-30', uv: 3490},
      {name: '2017-6-31', uv: 3490},
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#FFF009','#FF3049'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}  dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomizedAxisTick = React.createClass({
  render () {
    const {x, y, stroke, payload} = this.props;
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
});
 const style = {
    top: 20,
    left: 200,
    lineHeight: '24px',
    color:'#fff'
  };
function Dashboard ({  location, dispatch, dashboard, loading  }) {
  const { allOrderNumber, allCountNumber,allCustomerNumber,BayEarningsArry} = dashboard
  const allCountNumberData = [{name: '已激活', value:allCountNumber.activatedCount}, 
                              {name: '未激活', value: allCountNumber.unactivationCount},
                              {name: '可用', value: allCountNumber.availableCount},
                              {name: '初始化', value: allCountNumber.initCount},
                              {name: ' 异常', value: allCountNumber.exceptionCount},
                              {name: ' 维修', value: allCountNumber.repairingCount}];
  const allCustomerNumberData =[
                                {name: '已充押金', value: allCustomerNumber.depositCount},
                                {name: '欠费用户', value: allCustomerNumber.arrearsCount},
                                {name: '正在使用充电宝', value: allCustomerNumber.usingCount},
                              ]
  let BayEarningsArryData =[]
  for(let x in BayEarningsArry){
    if(BayEarningsArry[x].length){
      for(let i=0;i<BayEarningsArry[x].length;i++){
        let num = BayEarningsArry[x].length - (i+1) 
        let DateN = new Date(BayEarningsArry[x][num].createdDate)
        const DateY = DateN.getFullYear();   
        const DateM = DateN.getMonth();     
        const DateD = DateN.getDate();
        BayEarningsArryData.push({name:DateY+"-"+DateM+"-"+DateD,uv:parseInt(BayEarningsArry[x][num].result)})
      }
    }else{
      BayEarningsArryData.push({name:x,uv:parseInt(BayEarningsArry[x])})
    }
  }
  let BayEarningsArryDom = []
  if(BayEarningsArry == {}){
    console.log("有",BayEarningsArry)
  }else{
    console.log("无",BayEarningsArry)
  }
  function callback(key) {
    console.log(key);
  }
  const moneyProps = {
    onOk(data){
      dispatch({
          type: 'dashboard/earningDay',
          payload:data
        })
    }
  }
  return (
    <Row gutter={24}>
      <Col lg={18} md={24}>
        <Card bordered={false} bodyStyle={{
          padding: '24px 36px 24px 0',
        }}>
        <div className={styles.qieoten}>
              <div className={styles.box}>
                <div className={styles.tet}>总计充电宝</div>
                <div className={styles.centen}>{allCountNumber.allCount}</div>
              </div>
              <div className={styles.box}>
                <div className={styles.tet}>总计订单数量</div>
                <div className={styles.centen}>{allOrderNumber}</div>
              </div>
              <div className={styles.box}>
                <div className={styles.tet}>注册用户数量</div>
                <div className={styles.centen}>{allCustomerNumber.regCount}</div>
              </div>
        </div>
        </Card>
        <Card bordered={false} bodyStyle={{
          padding: '24px 36px 24px 0',height:600,
        }}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="资金统计" key="1">
              <div style={{width:'100%',height:'400px'}}>
                <div className={styles.ScreenBx}><Screen {...moneyProps}/></div>
                <LineChart className={styles.LineChartCount} width={1200} height={400} data={BayEarningsArryData}
                        margin={{top: 20, right: 30, left: 20, bottom: 10}}>
                   <XAxis dataKey="name" height={100} tick={<CustomizedAxisTick/>}/>
                   <YAxis/>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <Tooltip/>
                   <Legend verticalAlign="bottom" height={36}/>
                   <Line type="monotone" name="盈利统计(元)" dataKey="uv" />
                </LineChart>
                </div>
              </TabPane>
              <TabPane tab="订单统计" key="2">Content of Tab Pane 2</TabPane>
              <TabPane tab="充电宝统计" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
        </Card>
      </Col>
      <Col lg={6} md={24}>
        <Row gutter={24}>
          <Col lg={24} md={12}>
            <Card bordered={false} className={styles.quote}  bodyStyle={{
              padding: 0,
              background: color.blue,
            }}>
              <div className={styles.tit} >用户统计</div>
              <div className={styles.total} >总计：{allCustomerNumber.regCount}</div>
              <PieChart width={300} height={200}>
                    <Pie
                      data={allCustomerNumberData}
                      cx={90}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80} 
                      fill="#8884d8"
                    >
                      {
                        allCustomerNumberData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                      }
                    </Pie>
                    <Tooltip />
                    <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
                </PieChart>
            </Card>
          </Col>
          <Col lg={24} md={12}>
            <Card bordered={false} className={styles.quote} bodyStyle={{
              padding: 0,
              background: color.peach,
            }}>
              <div className={styles.tit} >充电柜统计</div>
              <div className={styles.total} >总计：{allCountNumber.allCount}</div>
              <PieChart width={300} height={200}>
                    <Pie
                      data={allCountNumberData} 
                      cx={90} 
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80} 
                      fill="#8884d8"
                    >
                      {
                        allCountNumberData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                      }
                    </Pie>
                    <Tooltip />
                    <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
                </PieChart>
            </Card>
          </Col>
        </Row>
      </Col>
   
    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
