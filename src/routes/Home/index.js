import React from 'react'
import {Card, Row, Col, Divider, Tabs} from 'antd'
import './style.css'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
} from 'bizcharts';
import DataSet from '@antv/data-set'

const { TabPane } = Tabs

class Home extends React.Component {
  //tab
  onChange = e => {
    this.setState({ size: e.target.value });
  }

  render() {
    const { DataView } = DataSet;
    const dataPie = [
      {
        item: '事例一',
        count: 40,
      },
      {
        item: '事例二',
        count: 21,
      },
      {
        item: '事例三',
        count: 17,
      },
      {
        item: '事例四',
        count: 13,
      },
      {
        item: '事例五',
        count: 9,
      },
    ];
    const dv = new DataView();
    dv.source(dataPie).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const colsPie = {
      percent: {
        formatter: val => {
          val = val * 100 + '%';
          return val;
        },
      },
    };
    function getXY(c, { index: idx = 0, field = 'percent', radius = 0.5 }) {
      const d = c.get('data');
      if (idx > d.length) return;
      const scales = c.get('scales');
      let sum = 0;
      for (let i = 0; i < idx + 1; i++) {
        let val = d[i][field];
        if (i === idx) {
          val = val / 2;
        }
        sum += val;
      }
      const pt = {
        y: scales[field].scale(sum),
        x: radius,
      };
      const coord = c.get('coord');
      let xy = coord.convert(pt);
      return xy;
    }

    //Radar map
    const dataRadar = [
        { item: 'Design', user: 'PlatformEngineer', score: 30 },
        { item: 'Development', user: 'PlatformEngineer', score: 70 },
        { item: 'Marketing', user: 'PlatformEngineer', score: 60 },
        { item: 'Users', user: 'PlatformEngineer', score: 50 },
        { item: 'Test', user: 'PlatformEngineer', score: 70 },
        { item: 'Language', user: 'PlatformEngineer', score: 50 },
        { item: 'Technology', user: 'PlatformEngineer', score: 40 },
        { item: 'Support', user: 'PlatformEngineer', score: 40 },
        { item: 'Sales', user: 'PlatformEngineer', score: 40 },
        { item: 'UX', user: 'PlatformEngineer', score: 60 },
      ]
      const colsRadar = {
        score: {
          min: 0,
          max: 80
        }
      }

    //tab
    const size = 'small'
    //history data trend map
    const dataLine = [
      {
        month: "2015-01-01",
        acc: 84.0
      },
      {
        month: "2015-02-01",
        acc: 14.9
      },
      {
        month: "2015-03-01",
        acc: 17.0
      },
      {
        month: "2015-04-01",
        acc: 20.2
      },
      {
        month: "2015-05-01",
        acc: 55.6
      },
      {
        month: "2015-06-01",
        acc: 56.7
      },
      {
        month: "2015-07-01",
        acc: 30.6
      },
      {
        month: "2015-08-01",
        acc: 63.2
      },
      {
        month: "2015-09-01",
        acc: 24.6
      },
      {
        month: "2015-10-01",
        acc: 14.0
      },
      {
        month: "2015-11-01",
        acc: 9.4
      },
      {
        month: "2015-12-01",
        acc: 6.3
      }
    ];
    const colsLine = {
      month: {
        alias: "月份"
      },
      acc: {
        alias: "积累量"
      }
    }
    return (
      <Card style={styles.bg} className='home'>
        <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
          用户付出与模型
        </Divider>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
          <Chart
              width={600} 
              height={400}
              data={dv}
              scale={colsPie}
              padding={[80, 100, 80, 80]}
              forceFit
              onGetG2Instance={c => {
                const xy = getXY(c, { index: 0 });
                c.showTooltip(xy);
              }}
            >
              <Coord type="theta" radius={0.75} />
              <Axis name="percent" />
              <Legend
                position="right"
                offsetY={-window.innerHeight / 2 + 115}
                offsetX={0}
              />
              <Tooltip
                //triggerOn='none'
                showTitle={false}
                itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
              />
              <Geom
                type="intervalStack"
                position="percent"
                color="item"
                tooltip={[
                  'item*percent',
                  (item, percent) => {
                    percent = percent * 100 + '%';
                    return {
                      name: item,
                      value: percent,
                    };
                  },
                ]}
                style={{
                  lineWidth: 1,
                  stroke: '#fff',
                }}
              >
                <Label
                  content="percent"
                  formatter={(val, item) => {
                    return item.point.item + ': ' + val;
                  }}
                />
              </Geom>
            </Chart>
          </Col>
          <Col className="gutter-row" span={12}>
          <Chart
              data={dataRadar}
              padding="auto"
              scale={colsRadar}
              height={400}
            >
              <Coord type="polar" radius={0.8} />
              <Axis
                name="item"
                line={null}
                tickLine={null}
                grid={{
                  lineStyle: {
                    lineDash: null,
                  },
                  hideFirstLine: false,
                }}
              />
              <Tooltip />
              <Axis
                name="score"
                line={null}
                tickLine={null}
                grid={{
                  type: 'circle',
                  lineStyle: {
                    lineDash: null,
                  },
                  alternateColor: 'rgba(0, 0, 0, 0.04)',
                }}
              />
              <Legend name="user" marker="circle" offset={30} />
              <Geom type="area" position="item*score" color="user" />
              <Geom type="line" position="item*score" color="user" size={2} />
              <Geom
                type="point"
                position="item*score"
                color="user"
                shape="circle"
                size={4}
                style={{
                  stroke: '#fff',
                  lineWidth: 1,
                  fillOpacity: 1,
                }}
              />
            </Chart>
          </Col>
        </Row>
        <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
          实时数据
        </Divider>
        <Row gutter={16}>
        <Col span={6}>
          <div style={{height:'120px', backgroundColor:'#0092ff'}}>col-4</div>
        </Col>
        <Col span={6}>
          <div style={{height:'120px', backgroundColor:'#0092ff'}}>col-4</div>
        </Col>
        <Col span={6}>
          <div style={{height:'120px', backgroundColor:'#0092ff'}}>col-4</div>
        </Col>
        <Col span={6}>
          <div style={{height:'120px', backgroundColor:'#0092ff'}}>col-4</div>
        </Col>
        </Row>

        <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
          历史数据
        </Divider>
        <Row>
          <Tabs defaultActiveKey="1" type="card" size={size}>
            <TabPane tab="Card Tab 1" key="1">
              <Chart height={400} data={dataLine} scale={colsLine} forceFit>
                <Axis
                  name="month"
                  title={null}
                  tickLine={null}
                  line={{
                    stroke: "#E6E6E6"
                  }}
                />
                <Axis
                  name="acc"
                  line={false}
                  tickLine={null}
                  grid={null}
                  title={null}
                />
                <Tooltip />
                <Geom
                  type="line"
                  position="month*acc"
                  size={1}
                  color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                  shape="smooth"
                  style={{
                    shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                    shadowBlur: 60,
                    shadowOffsetY: 6
                  }}
                />
              </Chart>
            </TabPane>
            <TabPane tab="Card Tab 2" key="2">
              <Chart height={400} data={dataLine} scale={colsLine} forceFit>
                  <Axis
                    name="month"
                    title={null}
                    tickLine={null}
                    line={{
                      stroke: "#E6E6E6"
                    }}
                  />
                  <Axis
                    name="acc"
                    line={false}
                    tickLine={null}
                    grid={null}
                    title={null}
                  />
                  <Tooltip />
                  <Geom
                    type="line"
                    position="month*acc"
                    size={1}
                    color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                    shape="smooth"
                    style={{
                      shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                      shadowBlur: 60,
                      shadowOffsetY: 6
                    }}
                  />
                </Chart>
            </TabPane>
            <TabPane tab="Card Tab 3" key="3">
              <Chart height={400} data={dataLine} scale={colsLine} forceFit>
                  <Axis
                    name="month"
                    title={null}
                    tickLine={null}
                    line={{
                      stroke: "#E6E6E6"
                    }}
                  />
                  <Axis
                    name="acc"
                    line={false}
                    tickLine={null}
                    grid={null}
                    title={null}
                  />
                  <Tooltip />
                  <Geom
                    type="line"
                    position="month*acc"
                    size={1}
                    color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                    shape="smooth"
                    style={{
                      shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                      shadowBlur: 60,
                      shadowOffsetY: 6
                    }}
                  />
                </Chart>
            </TabPane>
          </Tabs>
        </Row>
      </Card>
    )
  }
}

const styles = {
  bg:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%'
  }
}

export default Home