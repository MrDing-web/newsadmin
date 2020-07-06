<template>
    <el-container class="pageWrapper">
        <el-aside width="200px">
            <div class="title">
                黑马头条
            </div>

            <p>文章管理</p>
            <el-menu
                    class="el-menu-vertical-demo"
                    text-color="#fff"
                    :default-active="$route.path"
                    active-text-color="#ffd04b">
                <el-menu-item index="/postlist" @click="jumpPage('/postlist')">
                    <i class="el-icon-menu"></i>
                    <span slot="title">文章列表</span>
                </el-menu-item>
                <el-menu-item index="/editpost" @click="jumpPage('/editpost')">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">编辑文章</span>
                </el-menu-item>
            </el-menu>


        </el-aside>
        <el-container>
            <el-header>
                <img v-if="this.user.head_img" :src="$axios.defaults.baseURL + this.user.head_img" alt="">
                <img v-else src="@/assets/logo.png" alt="">
                <div class="nickname">{{this.user.nickname}}</div>
            </el-header>
            <el-main>
                <Breadcrumb/>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Breadcrumb from "../components/Breadcrumb";
    export default {
        name: 'Home',
        components:{
            Breadcrumb
        },
        data() {
            return {
                user: JSON.parse(localStorage.getItem("user"))
            }
        },
        methods: {
            jumpPage(path) {
                // 跳转之前判断是否已经在当前页,避免路由冗余发生报错
                if (this.$route.path !== path) {
                    this.$router.push(path);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .pageWrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
    }
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

        /*height: 100%;*/

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
