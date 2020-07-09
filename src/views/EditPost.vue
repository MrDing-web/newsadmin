<template>
    <div>
        <ul>
            <li class="li title">
                <span>标题</span>
                <el-input v-model="input"  placeholder="请输入内容"></el-input>
            </li>
            <li class="li">
                <span>内容</span>
                <vue-editor
                        v-model="content"
                        :useCustomImageHandler="true"
                        @image-added="handleImageAdded"
                ></vue-editor>
            </li>
            <li class="li">
                <span>栏目</span>
                <el-checkbox-group v-model="checkList">
                    <el-checkbox :label="item.name" v-for="(item,index) in categoriesList" :key="item.id"></el-checkbox>
                </el-checkbox-group>
            </li>
            <li class="li">
                <span>封面</span>
                <div>
                    <el-upload
                            :action="$axios.defaults.baseURL + '/upload'"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :file-list="fileList"
                            :headers="{
                              Authorization: 'Bearer ' + token
                            }"
                            :on-success = "uploadSuccess"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" >
                        <img width="100%" :src="dialogImageUrl" >
                    </el-dialog>
                </div>
            </li>
            <li class="li">
                <span>类型</span>
                <div>
                    <el-radio v-model="radio" label="1">文章</el-radio>
                    <el-radio v-model="radio" label="2">视频</el-radio>
                </div>
            </li>
            <li class="li">
                <span></span>
                <el-row>
                    <el-button type="primary" @click="submitChange">确认修改</el-button>
                </el-row>
            </li>
        </ul>


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
                content:'',
                input:'',
                categoriesList:[],
                checkList: [],
                dialogImageUrl: '',
                dialogVisible: false,
                radio:"2",
                fileList:[],
                changedcategoriesList:[],
                changedPicList:[],
                token:localStorage.getItem("token")
            }
        },
        watch:{
            checkList(){
                const arr = this.categoriesList.filter(item=>{
                    return this.checkList.indexOf(item.name) !== -1
                })
                this.changedcategoriesList = arr.map(item=>{return {id:item.id}});
                // console.log(this.changedcategoriesList);
            }
        },
        created() {
            this.getCategories();
            this.loadPage();


        },
        methods: {
            loadPage() {
                this.$axios({
                    url: "/post/" + this.$route.query.id
                }).then(res => {
                    const data = res.data.data;
                    if (data) {
                        //标题
                        this.input = data.title;
                        //内容
                        this.content = data.content.replace(/div/g, "p");
                        //栏目
                        this.checkList = data.categories.map(item => item.name);
                        // console.log(data.categories);
                        //封面
                        const newCover = data.cover.map(item => {
                            if (item.url && item.url.indexOf("http") === -1) {
                                item.url = this.$axios.defaults.baseURL + item.url;
                            }
                            return {id: item.id, url: item.url}
                        })
                        this.changedPicList = newCover.map(item => {
                            return {id: item.id}
                        })
                        if (newCover.length >= 3) {
                            newCover.length = 3;
                        }
                        this.fileList = newCover;
                        // console.log(this.fileList);

                        //类型
                        this.radio = data.type + '';
                    }


                })
            },
            getCategories() {
                this.$axios({
                    url: '/category'
                }).then(res => {
                    this.categoriesList = res.data.data.filter(item => item.id !== 1 && item.id !== 999);
                })
            },
            handleImageAdded(file, Editor, cursorLocation, resetUploader){
                // 这里是富文本框选择完图片会触发的函数
                // 带有四个参数 file, Editor, cursorLocation, resetUploader
                // file 选中的图片
                // Editor 是当前编辑器实例对象
                // cursorLocation 当前光标所在位置
                // resetUploader 这是上传完图片用来重新初始化上传功能的函数

                // 1. 上传图片
                // ajax 配合 FormData
                console.log(111)
                let formData = new FormData();
                formData.append('file', file);
                this.$axios({
                    url: '/upload',
                    method: 'post',
                    data: formData
                }).then(res=>{
                    console.log(res.data.data.url);
                    // 2. 拿到图片地址
                    // 要放入富文本框当中
                    // Editor.insertEmbed() 这是编辑器自带函数, 可以往编辑框内放入内容
                    // 三个参数 位置 / 类型 / 内容
                    Editor.insertEmbed(cursorLocation, 'image', this.$axios.defaults.baseURL + res.data.data.url);
                    // 将图片插入到富文本框之后还要重置上传功能
                    resetUploader();
                })
            },
            handleRemove(file, fileList) {
            },
            handlePictureCardPreview(file) {
                console.log(file);
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            uploadSuccess(res, file, fileList) {
                this.changedPicList.push({id: res.data.id});
                // console.log(this.changedPicList);
                // console.log(file);
                // console.log(fileList);
            },
            submitChange() {
                if (this.$route.query.id) {
                    this.$axios({
                        url: "/post_update/" + this.$route.query.id,
                        method: "post",
                        data: {
                            title: this.input,
                            content: this.content,
                            categories: this.changedcategoriesList,
                            cover: this.changedPicList,
                            type: Number(this.radio)
                        }
                    }).then(res => {
                        // console.log(res);
                    })
                } else {
                    this.$axios({
                        url: '/post',
                        method: "post",
                        data: {
                            title: this.input,
                            content: this.content,
                            categories: this.changedcategoriesList,
                            cover: this.changedPicList,
                            type: Number(this.radio)
                        }
                    }).then(res => {
                        console.log(res);
                    })

                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .li{
        display: flex;
        align-items: flex-start;
        margin-bottom: 30px;
        span{
            width: 64px;
            height: 24px;
            line-height: 24px;
        }
    }
</style>