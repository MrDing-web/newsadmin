<template>
    <div class="container">
        <el-table
                :data="postList"
                style="width: 10000px">
            <!--            prop="xxx" <=> {{item.xxx}}  -->
            <el-table-column

                    prop="id"
                    label="文章ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="user.nickname"
                    label="文章作者"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="create_date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    width="234"
                    label="日期">
                <template slot-scope="scope">
                    <img :src="scope.row.cover[0].url" alt="" class="firstPic">
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "PostList",
        data() {
            return {
                postList: []
            }
        },
        created() {
            this.loadPage();
        },
        methods: {
            loadPage() {
                this.$axios({
                    url: "/post",
                    data: {}
                }).then(res => {
                    if (res.data.total > 0) {
                        res.data.data.forEach(item => {
                            item.create_date = item.create_date.split("T")[0]
                        })
                        this.postList = res.data.data;
                        console.log(this.postList);
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .container {
        /*width: 10000px;*/
    }

    .firstPic {
        width: 100px;
        object-fit: cover;
    }
</style>