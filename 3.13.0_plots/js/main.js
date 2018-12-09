/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/
var data1 = [
	{
		"month": "January",
		"revenue": "13432",
		"profit": "8342"
	},
	{
		"month": "February",
		"revenue": "19342",
		"profit": "10342"
	},
	{
		"month": "March",
		"revenue": "17443",
		"profit": "15423"
	},
	{
		"month": "April",
		"revenue": "26342",
		"profit": "18432"
	},
	{
		"month": "May",
		"revenue": "34213",
		"profit": "29434"
	},
	{
		"month": "June",
		"revenue": "50321",
		"profit": "45343"
	},
	{
		"month": "July",
		"revenue": "54273",
		"profit": "47452"
	}
];
var margin = {top: 100, botton: 100, right: 100, left: 100};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.botton;
var flag = true;

var svg = d3.select("#chart-area").append("svg").attr("width", "600").attr("height","400");
var data = data1;
data.forEach(val => {
    val.revenue = +val.revenue;
    val.profit = +val.profit;
});

var x = d3.scaleBand()
.range([0,width])
.paddingInner(0.3)
.paddingOuter(0.3);
var y = d3.scaleLinear()
        .range([height,0]);

var g = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

var XAxisCall =  g.append("g")
.attr("class","x axis")
.attr("transform","translate(0,"+height+")");

var YAxisCall = g.append("g")
            .attr("class","y axis");

g.append("text").attr("class","x axis-label")
            .text("Month")
            .attr("y", height+50)
            .attr("font-size", "20px")
            .attr("x", width/2)
            .attr("text-anchor", "middle");

var ylabel = g.append("text").attr("class", "y axis-label")
            .attr("y",-60)
            .attr("x",-height/2)
            .attr("font-size","20px")
            .attr("transform","rotate(-90)")
            .text("revenue")
            .attr("text-anchor", "middle");
            


    setInterval(function() {
        var datanew = flag ? data : data.slice(1);
        update(datanew);
        flag = !flag;
    }, 1000);

    function update(data) {
        console.log(data);
        
        var t = d3.transition().duration(750);

        let value = flag ? "revenue" : "profit";
        x.domain(data.map((val) => {
            return val.month;
        }));

        y.domain([0,d3.max(data,(val) =>{
            return val[value];
        })]);

        //X Axis
        var xAxisCall = d3.axisBottom(x);
        XAxisCall.transition(t).call(xAxisCall);

        //Y Axix
        var yAxisCall = d3.axisLeft(y)
                        .tickFormat((d) =>{
                            return "$"+ d;
                        });
        YAxisCall.transition(t).call(yAxisCall);

        var rects = g.selectAll("circle").data(data, (d) => {
            return d.month;
        });
        
        rects
            .exit()
            .attr("fill","red")
            .transition(t)
            .attr("cy",y(0))
            .attr("r", "5")
            .remove();

        //  rects
        //  .transition(t)
        // .attr("x", (d) => {return x(d.month)})
        // .attr("y", (d) => {return y(d[value])})
        // .attr("height", (d) => {return height - y(d[value])})
        // .attr("width",  x.bandwidth );

       
        rects.enter().append("circle")
            .attr("cx",(d) => {
                return x(d.month) + x.bandwidth() /2;
            })
            .attr("cy", y(0))
            .attr("fill","grey")
            .attr("r", "5")
            .merge(rects)
            .transition(t)
            .attr("r", "5")
            .attr("cx",(d) => {
                return x(d.month) + x.bandwidth() /2;
            })
            .attr("cy", (d) => {
                return y(d[value]);
            });
            ylabel.text(value);

    }