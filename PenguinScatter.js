//title of scatterplot
var setTitle = function(msg)
    {
        d3.select("body h2")
        .text (msg)
    }

//grade on final
var getFinalGrade = function(final)
    {
        return final.grade
    }
var getPenguinFinal = function(penguin)
    {
        var FinalGrade = penguin.final.map(getFinalGrade)
        return FinalGrade
    }

//mean grade on homework
var getHWGrade = function(HW)
    {
        return HW.grade
    }
var getPenguinHW = function(penguin)
    {
        var HWGrade = penguin.homework.map(getHWGrade)
        var meanHW = d3.mean(HWGrade)
        return meanHW.toFixed(2)
    }
//mean grade on quiz
var getQuizGrade = function(quiz)
    {
        return quiz.grade
    }
var getPenguinQuiz = function(penguin)
    {
        var QuizGrade = penguin.quizes.map(getQuizGrade)
        var meanQuiz=d3.mean(QuizGrade)
        return meanQuiz.toFixed(2)
    }
//mean grade on test
var getTestGrade = function(test)
    {
        return test.grade
    }
var getPenguinTest = function(penguin)
    {
        var TestGrade = penguin.test.map(getTestGrade)
        var meanTest = d3.mean(TestGrade)
        return meanTest.toFixed(2)
    }

//Overall Grade

var getGrade = function(penguin)
    { 
        var FinalGrades = penguin.final.map(getFinalGrade)
        var TestGrades = penguin.test.map(getTestGrade)
        var TestMean = d3.mean(TestGrades)
        var QuizGrades = penguin.quizes.map(getQuizGrade)
        var QuizesMean = d3.mean(QuizGrades)
        var HomeworkGrades = penguin.homework.map(getHWGrade)
        var HomeworkMean = d3.mean(HomeworkGrades)
        var totalGrade = FinalGrades*.35 + TestMean*.30 + QuizesMean*.20 + HomeworkMean*.15
        return totalGrade.toFixed(2)
    }

var sortByProperty = function(property)
    { console.log("sort")
        var outcome = function(a,b)
        {
            if(a[property] == b[property])
                {
                    return 0
                }
            else if (a[property] < b[property])
                {
                    return 1
                }
            else
                {
                    return -1
                }
        }
        return outcome
    }

//add padding
var padding = 20

//tooltip

var drawToolTip = function(penguin)
{
    d3.select("#tooltip div")
        .remove();

    
    var xPosition = d3.event.pageX;
    var yPosition = d3.event.pageY;

    var base = d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPosition+"px")
        .style("left",xPosition+"px")
        .append("div")
    
    base.append("div")
        .classed("tt-Title",true)
        .text("Penguin:");
    
    base.append('img')
        .attr("id","photo")
        .attr('src','imgs/'+penguin.picture);
    
}




var displayFinalvsHW = function(penguins)
{ console.log("displaying")
    var width = 750;
    var height = 400;
    
    var svg = d3.select("#scatterplot")
        .attr("width", width)
        .attr("height", height)
        
    
    var xScale = d3.scaleLinear()
        .domain([d3.min(penguins,getPenguinFinal), d3.max(penguins,getPenguinFinal)])
        .range([padding,width-padding])
       
    
    var yScale = d3.scaleLinear()
        .domain ([d3.min(penguins, getPenguinHW),d3.max(penguins, getPenguinHW)])
        .range([height-padding,padding]);
     
    
    var colorScale = d3.scaleOrdinal(["#fb8072","#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]);

svg.selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
         {
            return xScale(getPenguinFinal(penguin));
        })
    .attr("cy",function(penguin)
         {
            return yScale(getPenguinHW(penguin));
        })
    .attr("r",5)
    .attr("fill",function(penguin)
         {
            return colorScale(getGrade(penguin));
        })
    .on("mouseover",function(penguin){
            drawToolTip(penguin)
        })
    
        .on("mouseout",function() 
            {
                d3.select("#tooltip")
                    .classed("hidden",true);
            })
        
        
svg.append("line")
    .attr("x1", xScale(d3.min(penguins,getPenguinFinal)))
    .attr("x2", xScale(d3.max(penguins,getPenguinFinal)))
    .attr("y1", yScale(d3.mean(penguins, getPenguinHW)))
    .attr("y2", yScale(d3.mean(penguins,getPenguinHW)))
    .attr("stroke", "purple")
svg.append("line")
    .attr("x1", xScale(d3.mean(penguins,getPenguinFinal)))
    .attr("x2", xScale(d3.mean(penguins,getPenguinFinal)))
    .attr("y1", yScale(d3.min(penguins, getPenguinHW)))
    .attr("y2", yScale(d3.max(penguins,getPenguinHW)))
    .attr("stroke", "purple")
        
        
}

var displayHWvsQuiz = function(penguins)
{
    var width = 750;
    var height = 400;
    
    var svg = d3.select("#scatterplot")
        .attr("width", width)
        .attr("height", height)
        
    
    var xScale = d3.scaleLinear()
        .domain([d3.min(penguins,getPenguinHW, d3.max(penguins,getPenguinHW))])
        .range([padding,width-padding])
       
    
    var yScale = d3.scaleLinear()
        .domain([d3.min(penguins, getPenguinQuiz),d3.max(penguins, getPenguinQuiz)])
        .range([height-padding,padding]);
     
    
    var colorScale = d3.scaleOrdinal(["#fb8072","#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]);

svg.selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
         {
            return xScale(getPenguinHW(penguin));
        })
    .attr("cy",function(penguin)
         {
            return yScale(getPenguinQuiz(penguin));
        })
    .attr("r",5)
    .attr("fill",function(penguin)
         {
            return colorScale(getGrade(penguin));
        })
    .on("mouseover",function(penguin){
            drawToolTip(penguin)
        })
    
        .on("mouseout",function() 
            {
                d3.select("#tooltip")
                    .classed("hidden",true);
            })
        
        
svg.append("line")
    .attr("x1", xScale(d3.min(penguins,getPenguinHW)))
    .attr("x2", xScale(d3.max(penguins,getPenguinHW)))
    .attr("y1", yScale(d3.mean(penguins,getPenguinQuiz)))
    .attr("y2", yScale(d3.mean(penguins,getPenguinQuiz)))
    .attr("stroke", "purple")
svg.append("line")
    .attr("x1", xScale(d3.mean(penguins,getPenguinHW)))
    .attr("x2", xScale(d3.mean(penguins,getPenguinHW)))
    .attr("y1", yScale(d3.min(penguins, getPenguinQuiz)))
    .attr("y2", yScale(d3.max(penguins,getPenguinQuiz)))
    .attr("stroke", "purple")
        
        
        
}

var displayTestvsFinal = function(penguins)
{
    var width = 750;
    var height = 400;
    
    var svg = d3.select("#scatterplot")
        .attr("width", width)
        .attr("height", height)
       
    
    var xScale = d3.scaleLinear()
        .domain([d3.min(penguins,getPenguinTest, d3.max(penguins,getPenguinTest))])
        .range([padding,width-padding])
       
    
    var yScale = d3.scaleLinear()
        .domain([d3.min(penguins, getPenguinFinal),d3.max(penguins, getPenguinFinal)])
        .range([height-padding,padding]);
     
    
    var colorScale = d3.scaleOrdinal(["#fb8072","#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]);

svg.selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
         {
            return xScale(getPenguinTest(penguin));
        })
    .attr("cy",function(penguin)
         {
            return yScale(getPenguinFinal(penguin));
        })
    .attr("r",5)
    .attr("fill",function(penguin)
         {
            return colorScale(getGrade(penguin));
        })
    .on("mouseover",function(penguin){
            drawToolTip(penguin)
        })
    
        .on("mouseout",function() 
            {
                d3.select("#tooltip")
                    .classed("hidden",true);
            })
        
        
svg.append("line")
    .attr("x1", xScale(d3.min(penguins,getPenguinTest)))
    .attr("x2", xScale(d3.max(penguins,getPenguinTest)))
    .attr("y1", yScale(d3.mean(penguins,getPenguinFinal)))
    .attr("y2", yScale(d3.mean(penguins,getPenguinFinal)))
    .attr("stroke", "purple")
svg.append("line")
    .attr("x1", xScale(d3.mean(penguins,getPenguinTest)))
    .attr("x2", xScale(d3.mean(penguins,getPenguinTest)))
    .attr("y1", yScale(d3.min(penguins, getPenguinFinal)))
    .attr("y2", yScale(d3.max(penguins,getPenguinFinal)))
    .attr("stroke", "purple")
        
        
        
}

var displayTestvsQuiz = function(penguins)
{
    var width = 750;
    var height = 400;
    
    var svg = d3.select("#scatterplot")
        .attr("width", width)
        .attr("height", height)
        
    
    var xScale = d3.scaleLinear()
        .domain([d3.min(penguins,getPenguinTest, d3.max(penguins,getPenguinTest))])
        .range([padding,width-padding])
       
    
    var yScale = d3.scaleLinear()
        .domain([d3.min(penguins, getPenguinQuiz),d3.max(penguins, getPenguinQuiz)])
        .range([height-padding,padding]);
     
    
    var colorScale = d3.scaleOrdinal(["#fb8072","#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]);

svg.selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
         {
            return xScale(getPenguinTest(penguin));
        })
    .attr("cy",function(penguin)
         {
            return yScale(getPenguinQuiz(penguin));
        })
    .attr("r",5)
    .attr("fill",function(penguin)
         {
            return colorScale(getGrade(penguin));
        })
    .on("mouseover",function(penguin){
            drawToolTip(penguin)
        })
    
        .on("mouseout",function() 
            {
                d3.select("#tooltip")
                    .classed("hidden",true);
            })
        
svg.append("line")
    .attr("x1", xScale(d3.min(penguins,getPenguinTest)))
    .attr("x2", xScale(d3.max(penguins,getPenguinTest)))
    .attr("y1", yScale(d3.mean(penguins,getPenguinQuiz)))
    .attr("y2", yScale(d3.mean(penguins,getPenguinQuiz)))
    .attr("stroke", "purple")
svg.append("line")
    .attr("x1", xScale(d3.mean(penguins,getPenguinTest)))
    .attr("x2", xScale(d3.mean(penguins,getPenguinTestl)))
    .attr("y1", yScale(d3.min(penguins, getPenguinQuiz)))
    .attr("y2", yScale(d3.max(penguins,getPenguinQuiz)))
    .attr("stroke", "purple")
        
        
        
}

var clearTable = function()
    {
        console.log("clearingtable")
        d3.selectAll("#scatterplot circle")
            .remove();
        d3.selectAll("#scatterplot line")
            .remove();
        d3.selectAll("#tooltip div")
            .remove();
        
    }


var initButtons = function(penguins)
{

    d3.select("#FinalvsHW")
        .on("clicked", function()
          { 
            clearTable()
            console.log ("clearedtable")
            setTitle("Final vs HW Mean");

            penguins.sort(sortByProperty("experiment"));
            console.log("finish sort")
           displayFinalvsHW(penguins)
            console.log("display table")
        });
    d3.select("#HWvsQuiz")
        .on("clicked", function()
          {
            clearTable()
           
            setTitle("HW Mean vs Quiz Mean");

            penguins.sort(sortByProperty("experiment"));
             displayHWvsQuiz(penguins)
        });
    d3.select("#TestvsFinal")
        .on("clicked", function()
          {
            clearTable()
            
            setTitle("Test Mean vs Final Mean")
            penguins.sort(sortByProperty("experiment"));
            displayTestvsFinal(penguins)
        });
    d3.select("#TestvsQuiz")
        .on("clicked", function()
          {
            clearTable()
            
            setTitle("Test Mean vs Quiz Mean");

            penguins.sort(sortByProperty("experiment"));
             displayTestvsQuiz(penguins)
        });
}

var classDataPromise = d3.json("classData.json")
classDataPromise.then(function(penguins)
                     {
                        console.log("worked",penguins);
                        setTitle("Final vs HW Mean");
                        penguins.sort(sortByProperty("experiment"));
                        displayFinalvsHW(penguins);
                        initButtons(penguins);
                        console.log('Worked: initialized buttons')
                        
                     });
                     (function(err){console.log("failed", err)})