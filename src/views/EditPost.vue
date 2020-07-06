<template>
    <div>
        <vue-editor
                v-model="content"
        ></vue-editor>
    </div>
</template>

<script>
    import { VueEditor } from "vue2-editor";
    export default {
        name: "EditPost",
        components:{
            VueEditor
        },
        data(){
            return{
                content:''
            }
        }
    }
</script>

<style lang="less" scoped>

</style>