import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadPiChartData } from "../../store/actions/actions";
import EnhancedComponent from "../HOC/index";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../../css/allCharts.css";
import Loader from 'react-loader-spinner';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);



class PiChart extends React.Component {



    componentDidMount() {
        this.props.loadPiChartData();
    }


    componentDidUpdate() {
        var chart = am4core.create("Pichartdiv", am4charts.PieChart);
        chart.data = this.props.data.data;
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
    }

    render() {

        if (this.props.data.data) {
            return (
                <React.Fragment>
                    <div className="pi chart">
                        <div className="Pichartdiv"></div>
                        {/* <br></br> */}

                        {/* <h3>pi chart</h3> */}
                        <hr></hr>
                        <Container>
                            <Row>
                                <Col className="btn1 btnchart"><button className="btnswap" disabled>Placeholder</button></Col>
                                <Col className="btn2 btnchart"><button className="btnswap" disabled>Placeholder</button></Col>
                                <Col className="btn3 btnchart"><button className="btnswap">Swap</button></Col>
                            </Row>
                        </Container>
                    </div>

                </React.Fragment>
            )
        } else {
            return (<div className="loaderDiv"><Loader
                type="ThreeDots"
                color="#00BFFF"
                height="100"
                width="100"
            /></div>)
        }

    }
}

const mapStateToProps = (state) => {
    return {
        data: state.mainReducer.pichartData,
        errMessage: state.mainReducer.errMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loadPiChartData: loadPiChartData,
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)((PiChart));