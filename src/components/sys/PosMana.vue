<template>
  <div>
    <div>
      <el-input
          size="small"
          class="addPosInput"
          placeholder="添加职位" suffix-icon="el-icon-plus" v-model="pos.name"
          @keydown.enter.native="addPosition"
      >
      </el-input>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addPosition">添加</el-button>
    </div>
    <div class="posManaMain">
      <el-table
          stripe
          border
          size="small"
          :data="positions"
          style="width: 70%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="编号"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职位"
            width="120">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间"
            width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="showEditView(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button type="danger" size="small" style="margin-top: 8px" :disabled="this.multipleSelection==0" @click="deleteMany">批量删除</el-button>
    <el-dialog
        title="编辑职位"
        :visible.sync="dialogVisible"
        width="30%">
<!--        :before-close="handleClose"-->

      <div>
        <el-tag>
          职位名称
        </el-tag>
        <el-input v-model="updatePos.name" class="updatePostInput" size="small"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdate">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PosMana",
  data() {
    return {
      pos: {
        name: ''
      },
      positions: [],
      dialogVisible: false,
      updatePos: {
        name:''
      },
      multipleSelection: []
    }
  },
  mounted() {
    this.initPositions();
  },
  methods: {
    addPosition(){
      if(this.pos.name){
        this.postRequest('/system/basic/pos/',this.pos).then(resp=>{
          if(resp){
            this.initPositions()
            this.pos.name=''
          }
        })
      }else{
        this.$message.error('职位名称不能为空')
      }
    },
    doUpdate(){
      this.putRequest('/system/basic/pos/',this.updatePos).then(resp=>{
        if(resp){
          this.initPositions()
          this.dialogVisible = false
        }
      })
    },
    showEditView(index ,data){
      this.dialogVisible = true
      Object.assign(this.updatePos,data)
      this.updatePos.createDate = ''
    },
    handleDelete(index ,data){
      this.$confirm('此操作将永久删除该【'+data.name+'】职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/pos/'+data.id).then(resp=>{
          if(resp){
            this.initPositions()
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    initPositions() {
      this.getRequest('/system/basic/pos/').then(resp=>{
        if(resp){
          this.positions = resp;
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log('multipleSelection--：'+JSON.stringify(this.multipleSelection))
    },
    deleteMany() {
      this.$confirm('此操作将永久删除【'+this.multipleSelection.length+'】条职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?';
        this.multipleSelection.forEach(item=>{
          ids += 'ids=' + item.id +'&'
        })

        let ids1 =''
        this.multipleSelection.forEach(item=>{
          ids1 += item.id + ','
        })
        // this.deleteRequest('/system/basic/pos/'+ids).then(resp=>{
        console.log(ids1)
        this.deleteRequest('/system/basic/pos/'+ids1).then(resp=>{
          if(resp){
            this.initPositions()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  }
}
</script>

<style scoped>
  .addPosInput{
    width: 300px;
    margin-right: 8px;
  }
  .posManaMain{
    margin-top: 10px;
  }
  .updatePostInput{
    width: 150px;
    margin-left: 10px;
  }
</style>