<template>
    <div class="container">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
        <el-table
                :data="postList"
                style="width: 100%">
            <!--            prop="xxx" <=> {{item.xxx}}  -->
            <el-table-column

                    prop="id"
                    label="文章ID"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="user.nickname"
                    label="文章作者"
                    width="120">
            </el-table-column>
            <el-table-column
                    width="240"
                    prop="title"
                    label="标题">
            </el-table-column>
            <el-table-column
                    prop="create_date"
                    label="发布日期"
                    width="160">
            </el-table-column>
            <el-table-column
                    label="封面"
                    width="234"
                    height="132"
            >
                <template slot-scope="scope">
                    <img :src="scope.row.cover[0].url" alt="" class="firstPic">
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="300"
                    >
                    <el-button
                            type="primary"
                            slot-scope="scope"
                            @click="$router.push({path:'/editpost',query:{id:scope.row.id}})"
                    >编辑</el-button>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "PostList",
        data() {
            return {
                postList: [],
                total:0,
                currentPage:0,
                pageSize:5,
                pageIndex:1
            }
        },
        created() {
            this.loadPage();
        },
        methods: {
            loadPage() {
                this.$axios({
                    url: "/post",
                    params: {
                        pageIndex:this.pageIndex,
                        pageSize:this.pageSize
                    }
                }).then(res => {
                    if (res.data.total > 0) {
                        res.data.data.forEach(item => {
                            item.create_date = item.create_date.split("T")[0];
                        })
                        this.postList = res.data.data;
                        this.total = res.data.total;
                        console.log(this.postList);
                    }
                })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.loadPage();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.loadPage();
            }
        }
    }
</script>

<style lang="less" scoped>
    .container {
        /*width: 10000px;*/
        .cell{
            text-align: center;
        }
    }
    .firstPic {
        width: 160px;
        height: 90px;
        object-fit: cover;
    }
</style>