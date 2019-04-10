<template>
    <span 
        @input="update" 
        @click="clearInput" 
        @keydown.enter.prevent="enterInput"
        contenteditable="true" 
        :class="classes">
    </span>
</template>
<script>
export default {
    
    props:['content', 'classes'],

    mounted:function(){
        this.$el.innerText = this.content;
    },

    methods:{
        update:function(e){
            this.$emit('update',e.target.innerText);
        },
        enterInput:function(e){
            this.$emit('enter-input');
        },
        clearInput() {
            this.$el.innerText = ''
        }
        
    }

}
</script>
