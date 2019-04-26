var ComponentsKnobDials = function () {

    return {
        //main function to initiate the module
        
        init: function (fw,kd,maxFw,sj) {
            //knob does not support ie8 so skip it
            if (!jQuery().knob || Metronic.isIE8()) {
                return;
            }

            // general knob
            var d = $(".knob").knob({
                'dynamicDraw': true,
                'thickness': 0.2,
                'tickColorizeValues': true,
                'skin': 'tron'
            },fw,kd,maxFw,sj);  
			
			return d;
        }

    };

}();
