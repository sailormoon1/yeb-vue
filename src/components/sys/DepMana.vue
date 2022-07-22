<template>
  <div style="with: 500px">
    <el-input
        placeholder="输入部门名称进行搜索"
        v-model="filterText">
    </el-input>

    <el-tree
        :data="deps"
        :props="defaultPros"
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        ref="tree">

      <span class="custom-tree-node" slot-scope="{ node, data }" style="display: flex;justify-content: space-between;width: 100%">
        <span>{{ data.name }}</span>
        <span>
          <el-button
              type="primary"
              size="mini"
              @click="() => showAddDept(data)"
              class="depBtn">
            添加部门
          </el-button>
          <el-button
              type="danger"
              size="mini"
              @click="() => deleteDept(data)"
              class="depBtn">
            删除部门
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog
        title="添加部门"
        :visible.sync="dialogVisible"
        width="30%">
      <div>
        <table>
          <tr>
            <td>
              <el-tag>
                上级部门
              </el-tag>
            </td>
            <td>
              {{pname}}
            </td>
          </tr>
          <tr>
            <td>
              <el-tag>
                部门名称
              </el-tag>
            </td>
            <td>
              <el-input v-model="dep.name" placeholder="请输入部门名称。。。">

              </el-input>
            </td>

          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddDept" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DepMana",
  data(){
    return {
      filterText: '',
      deps: [],
      defaultPros: {
        children: 'children',
        label: 'name'
      },
      dialogVisible: false,
      dep: {
        name: '',
        parentId: -1
      },
      pname: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.initDeps();
  },
  methods:{
    initDept(){
      this.dep= {
        name: '',
            parentId: -1
      },
      this.pname = '';
    },
    addDept2Dep(deps,dep){
      for(let i =0;i<deps.length;i++){
        let d = deps[i];
        if(d.id == dep.parentId){
          if(d.children == null){
            d.children = dep;
          }else{
            d.children = d.children.concat(dep,d);
          }
        }else{
          this.addDept2Dep(d.children,dep);
        }
      }
    },
    doAddDept(){
      this.postRequest('/system/basic/department/',this.dep).then(resp=> {
        if(resp){
          this.dialogVisible = false;
          this.initDept();
          this.addDept2Dep(this.deps,resp.obj);
        }
      });
    },
    showAddDept(data){
      this.pname = data.name;
      this.dep.parentId = data.id;
      this.dialogVisible = true;
      console.log(data)
    },
    deleteDept(data){
      if(data.isParent){

      }else{
        this.$confirm('此操作将永久删除该['+data.name+']部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/system/basic/department/'+data.id).then(resp=>{
            if(resp){
              this.removeDepFromDeps(this.deps,data.id);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }

    },
    initDeps(){
      this.getRequest('/system/basic/department/').then(resp=>{
        if(resp){
          this.deps = resp;
        }
      })
    },
    filterNode(value,data){
      if(!value){
        return true;
      }
      return data.name.indexOf(value) !== -1;
    },
    removeDepFromDeps(deps, id) {
      for (let i = 0; i < deps.length; i++) {
        let d = deps[i];
        if(d.id == id){
          deps.splice(i,1);
          return;
        }else{
          this.removeDepFromDeps(d.children,id);
        }
      }
    }
  }
}
</script>

<style>
.depBtn{
  padding: 2px;
}
</style>