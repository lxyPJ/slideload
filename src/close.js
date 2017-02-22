    if(typeof(module) !== 'undefined' && module.exports){
        module.exports = Slideload;
    }else if(typeof define == "function" && define.amd){
        define(function(){ return Slideload; });
    }else{
        window.Slideload = Slideload;
    }
}(window,document,Math);