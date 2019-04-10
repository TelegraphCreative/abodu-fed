
<template>
  <div v-bind:class="{ '-loading': active }" class="loading-strip">
    <div class="row | center-xs start-md">
      <div class="calculator__content | col-xs-10 col-md-10 | col-md-offset-1">
        <!-- Header -->
        <div class="calculator__header">
          <h1 class="heading --dash --rust">Increased Home Value</h1>

          <!-- Input -->
          <p class="color_block__value heading --tertiary">
            Enter your
            <editable
              :content="zipcode"
              @enter-input="getResults"
              @update="zipcode = $event"
              :classes="'pt-0 pb-1 px-3 mx-1 outline-none leading-none md:min-w-xs min-w-xxs inline-block font-bold border-b-2 border-rust text-rust bg-transparent '"
            ></editable>
            and we'll tell you the property increase value for an Abodu {{ model }}
          </p>
        </div>

        <!-- Results -->
        <div
          v-if="result"
          class="calculator__results | mt-12 md:flex md:justify-start items-center"
        >
          <p
            class="calculator__result-descr md:w-2/5 text-16"
          >Based on local rents and home prices, we'd expect an Abodu {{ model }} to increase your property value by:</p>
          <div
            class="calculator__result-value | text-24 md:text-42 font-semibold text-rust md:ml-8 md:mt-0 mt-4"
          >{{ result }}</div>
        </div>

        <!-- Error -->
        <div v-if="error" class="calculator__results">
          <p class="calculator__result-descr">Looks like we don't have any data for your area yet.</p>
          <button @click="getResults" class="btn --arrow | mt-12">
            Look up another area
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" class="h-3 w-2">
                <path d="M1.46 12L0 10.67 5.09 6 0 1.33 1.46 0 8 6l-6.54 6z"></path>
              </svg>
            </span>
          </button>
        </div>

        <!-- Cover (initial state) -->
        <div v-if="cover" class="calculator__actions mt-12">
          <button @click="getResults" class="btn --arrow">
            {{ btnText }}
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" class="h-3 w-2">
                <path d="M1.46 12L0 10.67 5.09 6 0 1.33 1.46 0 8 6l-6.54 6z"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import editable from "./EditableText";
import Papa from "papaparse";

export default {
  props: {
    value: {
      required: false
    },
    model: {
      required: true
    }
  },
  data() {
    return {
      active: false,
      cover: true,
      zipcode: "Zip Code",
      result: "",
      error: false,
      btnText: "Find Out Your Value",
      path: "/site/themes/abodu/js/data/",
      filePrefix: "property-values__"
    };
  },

  methods: {
    getResults: function() {
      var _this = this;
      _this.active = true;
      var zipcode = parseInt(this.zipcode),
        csv = this.path + this.filePrefix + "Abodu-" + _this.model + ".csv",
        config = {
          delimiter: ",",
          header: false,
          download: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          error: function(err) {
            _this.result =
              "Looks like we don't have any data for your area yet.";
            console.log(err);
          },
          step: function(results) {
            results.data.forEach(function(line) {
              if (line[0] == zipcode) {
                _this.result = line[11];
                _this.cover = false;
                _this.error = false;
                // _this.resultFullData = 'Your Zip Code of ' + line[0] + '  is in ' + line[1] + ', ' + line[2]  + '. Based on local rents and home prices, we\'d expect an Abodu 450 to increase your property value by <b>' + line[11] + '</b>';
              }
            });
          },
          complete: function() {
            _this.active = false;
            if (_this.result == "") {
              _this.error = true;
              _this.cover = false;
            }
          }
        };

      Papa.parse(csv, config);
    }
  },

  components: {
    editable
  }
};
</script>



<style>
.loading-strip {
  position: relative;
}
.calculator__content {
  transition: opacity 2;
}

.calculator__actions button {
  display: block;
  padding: 0.25rem;
}
.calculator__actions button:focus {
  color: #9b4c05;
  outline: none;
}

.-loading .calculator__content {
  opacity: 0.5;
  pointer-events: none;
}
.-loading.loading-strip:after,
.-loading.loading-strip:before {
  display: block;
}

@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
