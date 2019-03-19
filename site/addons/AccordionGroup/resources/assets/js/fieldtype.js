Vue.component("accordion_group-fieldtype", {
  mixins: [Fieldtype],

  props: ["data", "config", "name"],

  template: ` <div>
    <section class='accordion-field' v-bind:class="{ 'accordion-field--open': isOpen }">
      <div v-on:click="handleClick" class="accordion-field__header no-select clickable">
        <div v-if="config.child_fieldset">
          <div v-if="loading" class="loading loading-basic">
            <span class="icon icon-circular-graph animation-spin"></span> {{ translate('cp.loading') }}
          </div>
          <div v-else>
            <span class="accordion-field__title">{{ config.display }}</span>
            <small v-if="config.instructions" v-html="config.instructions | markdown" class="accordion-field__instruct"></small>
          </div>
        </div>
        <div v-else>
          <div class="loading loading-basic red">
            <span class="icon icon-block"></span> No fieldset has been set for this group.
          </div>
        </div>
      </div>
      <div class="accordion-field__body" v-bind:class="{ 'invisible': !isOpen }">
        <div v-if="child_fields.length" class="accordion-field__fieldset publish-fields">
            <div v-for="field in child_fields" :class="fieldClasses(field)">
              <div class="field-inner">
                  <div v-if="isReadOnly" class="read-only-overlay" :title="translate('cp.read_only')"></div>

                  <label class="block" :class="{'bold': field.bold}">
                      <template v-if="field.display">{{ field.display }}</template>
                      <template v-if="!field.display">{{ field.name | deslugify | titleize }}</template>
                      <i class="required" v-if="field.required">*</i>
                  </label>

                  <small class="help-block" v-if="field.instructions" v-html="field.instructions | markdown"></small>

                  <component
                    :is="componentName(field.type)"
                    :name="name + '.' + field.name"
                    :config="field"
                    :data.sync="data[field.name]"
                  ></component>

              </div>
            </div>
        </div>
      </div>
    </section>
  </div>
  `,

  created() {
    this.$http
      .get(cp_url(`fieldsets-json/${this.config.child_fieldset}`))
      .success(response => {
        const child_fieldset = new Fieldset(response);
        this.child_fields = child_fieldset.fields();

        this.loading = !true;

        this.bindChangeWatcher();
      });
  },

  data() {
    return {
      autoBindChangeWatcher: false,
      child_fields: [],
      isOpen: false,
      loading: true
    };
  },

  methods: {
    handleClick(e) {
      if (this.loading) return;
      this.isOpen = !this.isOpen;
    },

    componentName(fieldType) {
      return fieldType.replace(".", "-") + "-fieldtype";
    },

    fieldClasses(field) {
      return [
        "form-group",
        "px-3 py-2",
        field.type + "-fieldtype",
        tailwind_width_class(field.width),
        field.classes || ""
      ];
    }
  }
});

/** Fieldset parser present at "../../../../../../statamic/resources/js/components/publish/Fieldset.js" */
class Fieldset {
  constructor(fieldset) {
    this.fieldset = fieldset;
    this.name = fieldset.name;
    this.sections = this.parseSections(fieldset.sections);
    this.metaFields = [];
  }

  parseSections(sections) {
    return _.chain(sections)
      .mapObject((section, handle) => {
        section.handle = handle;
        section.fields = this.parseFields(section.fields);
        return section;
      })
      .values()
      .value();
  }

  parseFields(fields) {
    return _.chain(fields)
      .mapObject((config, handle) => {
        config.name = handle;
        return config;
      })
      .values()
      .value();
  }

  /**
   * Get all the fields from all the sections.
   */
  fields() {
    return _.chain(this.sections)
      .pluck("fields")
      .flatten()
      .value();
  }
}
