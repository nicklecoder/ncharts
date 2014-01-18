(function($) {
	var name = "nCharts";
	
	$.fn.nchart = function(optsOrMethod) {
		return $(this).filter("canvas").each(function() {
			if(!$.data(this, "api_" + name)) {
				if(optsOrMethod && $.type(optsOrMethod) !== "object") {
					throw new Error("nCharts: invalid options format");
				}
				var type = null;
				if($(this).data("chart")) {
					type = $(this).data("chart");
				} else if(optsOrMethod.chart) {
					type = optsOrMethod.chart;
				} else {
					throw new Error("nCharts: no chart parameter given");
				}
				switch(type) {
					case "line":
						if(typeof $.fn.nchart.line.LineChart === "function") {
							console.log("class detected");
							$.data(this, 'api_' + name, new $.fn.nchart.line.LineChart($(this), optsOrMethod));
						}
						break;
					default:
						throw new Error("nCharts: " + type + " is not a valid chart type");
						break;
				}
			} else if($.isFunction($(this).data("api_" + name)[optsOrMethod])) {
				$(this).data("api_" + name)[optsOrMethod]();
			}
		});
	}
})(jQuery);
