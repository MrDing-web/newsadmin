<template>
    <el-row class="wrapper">
        <el-form class="loginForm" ref="form" :model="form" label-width="80px">
            <h2>登录</h2>
            <el-form-item label="账号">
                <el-input v-model="form.account" class="input" @keydown.native.enter="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input
                        v-model="form.password"
                        type="password"
                        class="input"
                        @keydown.native.enter="onSubmit"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-row>

</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    account: '',
                    password: ''
                }
            }
        },
        methods: {
            reset() {
                this.form.account = '';
                this.form.password = '';
            },
            onSubmit() {
                const account = this.form.account.trim();
                const password = this.form.password.trim();
                if (account === "" || password === "") {
                    this.$message.warning("用户名或密码不能为空");
                    return false;
                }
                this.$axios({
                    url: "/login",
                    method: "post",
                    data: {
                        username: account,
                        password: password
                    }
                }).then(res => {
                    const data = res.data;
                    // console.log(data);
                    if (data.message === "登录成功") {
                        // 成功之后
                        // 1. 弹出窗口提醒成功
                        this.$message.success('登录成功')
                        // 2. 将数据存放在本地储存
                        localStorage.setItem('token', res.data.data.token)
                        localStorage.setItem('user', JSON.stringify(res.data.data.user))
                        // 3. 跳转到首页
                        this.$router.push('/')

                    }
                })

            }
        }
    }
</script>

<style lang="less" scoped>
    .wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .loginForm {
        width: 595px;
        height: 266px;
        background-color: #eee;
        user-select: none;

        h2 {
            text-align: center;
        }

        .input {
            width: 469px;
            height: 53px;
        }
    }
</style>