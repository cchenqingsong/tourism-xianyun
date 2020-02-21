<template>
   <!-- 页面大布局 -->
  <div class="All">
      <el-row type="flex" justify="space-between" >
           <!-- 主体布局 -->
           <div class="main">
               <h2>发表新攻略</h2>
               <p>分享你的个人游记，让更多人看到！</p>
               <el-form ref="form" :model="form" >
                  <!-- 标题 -->
                  <el-form-item>
                      <el-input placeholder="请输入标题" v-model="form.title"></el-input>
                  </el-form-item>
                   <!-- vu2editor编辑器 -->
                   <el-form-item class=".quillWrapper">
                       <client-only>
                           <vue-editor v-model="form.content"></vue-editor>
                       </client-only>
                   </el-form-item>
                   <!-- 选择城市 -->
                   <el-form-item label="选择城市" class="checkCity" >
                      <el-autocomplete 
                      v-model="form.city"
                      placeholder="请搜索游玩城市"
                      :fetch-suggestions="searchVisitCity"
                      @select="handleSelect"
                      @blur="handleBlur">
                      </el-autocomplete>
                   </el-form-item>
                    <!-- 发布/保存到草稿 -->
                    <el-form-item>
                        <el-button type="primary">发布</el-button>
                        <span class="save">
                            或者&nbsp;
                            <a href="#">保存到草稿箱</a>
                        </span>
                    </el-form-item>
               </el-form>
           </div>
           <!-- 右边草稿箱 -->
           <div class="c-Email">
               <div class="c-Box">
                   <h4>草稿箱</h4>
                   <!-- 草稿内容 -->
                   <div>
                       <div class="content">
                           内容
                           <i class="iconfont el-icon-edit"></i>
                       </div>
                   </div>
               </div>
           </div>
      </el-row>
  </div>
</template>

<script>
export default {
    data(){
        return {
            form:{
                title:'',
                content:'',
                city:''
            },
            // 城市列表
            cityData:[]
        };
    },
    methods:{
        // 搜索游玩城市时触发
        searchVisitCity(value,callback){
            if(!value){
                //如果输入框，没有值就不执行 并且不显示下拉列表
                this.cityData = [];
                callback([]);
                return;
            }
            // 有value值才发请求 根据value值获取城市列表
            this.$axios({
                url:"/airs/city",
                methods:"GET",
                params:{
                    name:value
                }
            }).then(res =>{
                console.log(res);
                const { data } = res.data;
                // 下拉提示列表必须要有value字段 
                const newData = data.map(v =>{
                    v.value = v.name.replace("市","");
                    return v;
                });
                this.cityData = newData;
                callback(newData);
            });
        },
        //点击选择下拉列表城市时触发
        handleSelect(item){
            this.form.city = item.value;
        },
        // 失焦触发事件
        handleBlur(){
            // console.log("1122")
            if(this.cityData.length === 0){
                return;
            }
            //失焦后，如果用户不选下拉列表的城市 就默认获取数组中第一个城市
            console.log(this.cityData);
            this.form.city = this.cityData[0].value;
        }
    }
}
</script>

<style scoped lang="less">
.All{
    width: 1000px;
    margin: 0 auto;
    padding: 20px 0;
    .main{
        h2{
            font-weight: normal;
            font-size: 22px;
            margin: 0 0 10px 10px;
        }
        p{
            font-size: 12px;
            color:#999;
            margin: 0 0 10px 10px;
        }
        .quillWrapper{
            height: 400px;
            width: 700px;
        }
        .checkCity{
            margin-top: 110px;
            margin-left: 3px;
        }
        .save{
            font-size: 14px;
            margin-left: 10px;
            a{
                color: orange;
                &:hover{
                    text-decoration: underline;
                }
            }
            
        }
    }
}
.c-Email{
    margin-left: 50px;
    width: 300px;
    .c-Box{
        border: 1px solid #ddd;
        padding: 10px;
        h4{
            margin-bottom: 10px;
            font-weight: 400;
            color: #666;
        }
        .content{
            cursor: pointer;
            &:hover{
                color: orange;
            }
        }
    }
}

</style>