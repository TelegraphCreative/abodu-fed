window.Vue = require("vue");

import property_calculator from './components/PropertyCalculator'

var app = new Vue({
    el: '#app',
    components: {
        property_calculator
    }
})