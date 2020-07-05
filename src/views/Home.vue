<template>
    <el-container>
        <el-aside width="200px">
            <div class="title">
                黑马头条
            </div>

            <p>文章管理</p>
            <el-menu
                    class="el-menu-vertical-demo"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">文章列表</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">发布文章</span>
                </el-menu-item>
            </el-menu>


        </el-aside>
        <el-container>
            <el-header>
                <img v-if="this.user.head_img" :src="$axios.defaults.baseURL + this.user.head_img" alt="">
                <img v-else src="@/assets/logo.png" alt="">
                <div class="nickname">{{this.user.nickname}}</div>
            </el-header>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>

    export default {
        name: 'Home',
        data() {
            return {
                user: JSON.parse(localStorage.getItem("user"))
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        img {
            width: 50px;
            height: 50px;
            border-radius: 25px;
            object-fit: cover;
            margin-right: 30px;
        }

        .nickname {
            color: #333;
            margin-right: 100px;
        }
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        user-select: none;
        text-align: center;
        line-height: 200px;
        position: absolute;
        top: 0;
        bottom: 0;

        .title {
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 24px;
            font-weight: 700;
        }

        > p {
            color: red;
            height: 120px;
            width: 100%;
            margin-left: -24px;
        }

        .el-menu-vertical-demo {
            background-color: #D3DCE6;
        }

        .el-menu-item {
            height: 50px;
            line-height: 50px;
        }
    }

    .el-main {
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
