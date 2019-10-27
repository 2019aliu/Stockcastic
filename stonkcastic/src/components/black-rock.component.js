import React, { Component } from 'react';

export default class BlackRock extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/r/bs-3.3.5/jq-2.1.4,dt-1.10.8/datatables.min.css" />
                <script src="https://cdn.datatables.net/r/bs-3.3.5/jqc-1.11.3,dt-1.10.8/datatables.min.js"></script>
                <script src="https://code.highcharts.com/stock/highstock.js"></script>
                <script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
                <script src="https://www.blackrock.com/tools/api/js/hackathon"></script>

                <div class="container">
                    <h2>
                        Holdings
                </h2>
                    <table id="holdings" class="table table-striped table-bordered" cellspacing="0" width="100%"></table>
                </div>
                <h2>
                    Performance ($10,000 Investment)
            </h2>
                <div id="returns" style={{ height: "400px", minMidth: "310px", minHeight: "400px", display: "block" }}></div>
            </div>

            
        )
    }
}