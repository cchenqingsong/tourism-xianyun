<template>
  <div class="create">
      <el-row>
        <el-col :span="18" >
            <h3>发布新攻略</h3>
            <p style="font-size:12px;color:#999;padding:10px 0;">分享你的个人游记，让更多人看到哦！</p>
            <el-form>
                <!-- 标题部分 -->
                <el-form-item label="标题">
                    <el-input v-model="title"></el-input>
                </el-form-item>
                <!-- 文本编辑器部分 -->
                <el-form-item>
                    <client-only>
                        <vue-editor
                        v-model="inputText"
                        placeholder='请输入内容'
                        ></vue-editor>
                    </client-only>
                </el-form-item>
                <!-- 选择城市部分 -->
                <el-form-item label="选择城市">
                    <el-autocomplete
                    v-model="city"
                    :fetch-suggestions="querySearchAsync"
                    @select="handleSelect"
                    placeholder="请输入内容"
                    ></el-autocomplete>
                </el-form-item>
                <!-- 发布按钮 -->
                <el-form-item>
                    <el-button type="success" @click="handlePublish">发布</el-button>&nbsp;&nbsp;
                    <span>或者&nbsp;&nbsp;<span style="color:orange;cursor:pointer;" @click="setDate">保存到草稿箱</span></span>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="4" :offset="2">
            <el-badge :value="$store.state.post.draft.length" class="item" >
                <el-button disabled style="font-size:16px;color:#000;" size="small" type="success">草稿箱</el-button>
            </el-badge>
            <div style="width:150px;">
                <div style="padding:3px 0;" v-for="(item,index) in $store.state.post.draft" :key="index">
                    <i class="el-icon-delete" style="cursor:pointer;" @click="del(index)"></i>&nbsp;&nbsp;
                    <span>{{item.title}}</span>&nbsp;&nbsp;
                    <i class="el-icon-edit" style="cursor:pointer;" @click="reset(item)"></i>
                </div>
            </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    data () {
        return {
            // 文章标题
            title:'',
            // 文章内容
            inputText:'',
            // 城市名字
            city:'',
            // 城市id
            cityCode: '',
        }
    },
    methods: {
        // 服务端搜索
        querySearchAsync(queryString, callback){  // queryString是输入框的文本,callback是回调函数展示返回的数据
            // 如果输入框为空的时候，不会进行搜索城市
                if(!queryString){
                    callback([])
                    return;
                }
            // 调用封装的方法获取搜索城市的数据
            this.$store.dispatch('user/searchCity',queryString).then(res=>{
                callback(res)
                // 当如果返回的搜索内容只有一个的时候，为了避免用户不点击,默认给到第一个城市
                if(res.length === 1){
                    this.cityCode = res[0].id
                }
            })
        },
        // 下拉选择
        handleSelect(item){
            this.cityCode = item.id
        },
        // 为空的判断
        rules(){
            // 判断标题不能为空
            if(!this.title ){
                this.$message.error('请输入标题')
                return;
            }
            // 判断文本内容不能为空
            if(!this.inputText){
                this.$message.error('请输入内容')
                return;
            }
            // 判断城市不能为空
            if(!this.city){
                this.$message.error('请输入城市')
                return;
            }
        },
        // 提交发布
        handlePublish(){
            // 判断非空
            this.rules()
            // 调用接口，实现提交
            this.$axios({
                url: '/posts',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ` + this.$store.state.user.userInfo.token
                },
                data: {
                    content: this.inputText,
                    title: this.title,
                    city: this.cityCode
                }
            }).then(res=>{
                this.$message.success(res.data.message)
                // 完成之后清空三个框的内容
                this.title = '',
                this.inputText = '',
                this.city = '',
                this.cityCode = ''
            })
        },
        // 保存到草稿箱
        setDate(){
            // 判断非空
            this.rules()
            // 存储到store里面
            this.$store.commit('post/setDraft',
                {title:this.title,
                inputText:this.inputText,
                city:this.city,
                cityCode: this.cityCode,})
            // 储存完毕之后，将数据清空
            this.title = '',
            this.inputText = '',
            this.city = '',
            this.cityCode = ''
        },
        // 复位到输入框
        reset(item){
            this.title = item.title
            this.inputText = item.inputText
            this.city = item.city
            this.cityCode = item.cityCode
        },
        // 删除当前的草稿
        del(index){
            // 调用store方法实现删除
            this.$store.commit('post/delDraft',index)
        }
    }
}
</script>

<style lang='less' scoped>
    .create{
        margin: 0 auto;
        width: 1000px;
        padding: 20px 0;
    }
    .item {
        margin-top: 10px;
        margin-right: 40px;
        padding-bottom: 20px; 
    }
</style>