<template>
    <div>111</div>
</template>

<script>
    export default {
        name: "PostList",
        created() {
            this.loadPage();
        },
        methods:{
            loadPage(){
                this.$axios({
                    url:"/post",
                    data:{}
                }).then(res=>{
                    console.log(res.data);
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>