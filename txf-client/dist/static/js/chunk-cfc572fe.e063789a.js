(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cfc572fe"],{"16ef":function(e,t,a){},2355:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{class:e.icon}),e._v(" "+e._s(e.title)+"\n            ")])],1)],1),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"角色名"},model:{value:e.query.role_name,callback:function(t){e.$set(e.query,"role_name",t)},expression:"query.role_name"}}),a("el-select",{staticClass:"handle-select mr10",attrs:{placeholder:"状态"},model:{value:e.query.status,callback:function(t){e.$set(e.query,"status",t)},expression:"query.status"}},[a("el-option",{key:"-1",attrs:{label:"全部",value:"-1"}}),a("el-option",{key:"1",attrs:{label:"启用",value:"1"}}),a("el-option",{key:"0",attrs:{label:"禁用",value:"0"}})],1),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v("搜索")])],1),a("div",{staticClass:"handle-box"},[a("el-button",{staticClass:"handle-del",attrs:{type:"primary",icon:"el-icon-ix-delete"},on:{click:e.delAllSelection}},[e._v("批量删除")]),a("el-button",{staticClass:"handle-add mr10",attrs:{type:"primary",icon:"el-icon-lx-add"},on:{click:e.handleAdd}},[e._v("新增")])],1),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,border:"","header-cell-class-name":"table-header"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),a("el-table-column",{attrs:{prop:"id",label:"ID",width:"55",align:"center"}}),a("el-table-column",{attrs:{prop:"role_name",label:"角色名",align:"center"}}),a("el-table-column",{attrs:{prop:"description",label:"角色描述",align:"center"}}),a("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:1==t.row.status?"success":"danger"}},[e._v(e._s(1==t.row.status?"启用":"禁用"))])]}}])}),a("el-table-column",{attrs:{prop:"created_at",label:"创建时间"}}),a("el-table-column",{attrs:{label:"操作",width:"220",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),a("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")]),a("el-button",{attrs:{type:"text",icon:"el-icon-lx-settings"},on:{click:function(a){return e.handleSetting(t.$index,t.row.id)}}},[e._v("绑定权限")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next","current-page":e.query.page,"page-size":e.query.size,total:e.total},on:{"current-change":e.handlePageChange}})],1)],1),a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:"新增",visible:e.addVisible,width:"30%","close-on-click-modal":!1},on:{"update:visible":function(t){e.addVisible=t}}},[a("el-form",{ref:"addForm",attrs:{model:e.addForm,"label-width":"70px"}},[a("el-form-item",{attrs:{label:"角色名"}},[a("el-input",{model:{value:e.addForm.role_name,callback:function(t){e.$set(e.addForm,"role_name",t)},expression:"addForm.role_name"}})],1),a("el-form-item",{attrs:{label:"角色描述"}},[a("el-input",{model:{value:e.addForm.description,callback:function(t){e.$set(e.addForm,"description",t)},expression:"addForm.description"}})],1),a("el-form-item",{attrs:{label:"状态"}},[a("el-radio-group",{model:{value:e.addForm.status,callback:function(t){e.$set(e.addForm,"status",t)},expression:"addForm.status"}},[a("el-radio",{attrs:{label:1}},[e._v("启用")]),a("el-radio",{attrs:{label:0}},[e._v("禁用")])],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.addVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.saveAdd}},[e._v("确 定")])],1)],1),a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:"编辑",visible:e.editVisible,width:"30%","close-on-click-modal":!1},on:{"update:visible":function(t){e.editVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"70px"}},[a("el-form-item",{attrs:{label:"角色名"}},[a("el-input",{model:{value:e.form.role_name,callback:function(t){e.$set(e.form,"role_name",t)},expression:"form.role_name"}})],1),a("el-form-item",{attrs:{label:"角色描述"}},[a("el-input",{model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1),a("el-form-item",{attrs:{label:"状态"}},[a("el-radio-group",{model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[a("el-radio",{attrs:{label:1}},[e._v("启用")]),a("el-radio",{attrs:{label:0}},[e._v("禁用")])],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.saveEdit}},[e._v("确 定")])],1)],1),a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:"绑定权限",visible:e.permissionVisible,width:"30%","close-on-click-modal":!1},on:{"update:visible":function(t){e.permissionVisible=t}}},[a("el-input",{staticClass:"mb10",attrs:{placeholder:"输入关键字进行过滤",clearable:""},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),a("el-tree",{ref:"tree",staticClass:"filter-tree",attrs:{data:e.permissionData,"show-checkbox":"","filter-node-method":e.filterNode,"node-key":"id","default-expand-all":"","default-checked-keys":e.defaultCheckedKeys,props:e.defaultProps}}),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.permissionVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.savePermisssion}},[e._v("确 定")])],1)],1)],1)},l=[],n=a("365c"),s=a("3de1"),o={data:function(){return{query:{role_name:"",status:"",page:1,size:20},tableData:[],multipleSelection:[],editVisible:!1,addVisible:!1,permissionVisible:!1,addForm:{status:1},total:0,form:{},idx:-1,id:-1,title:"",icon:"",permissionData:[],defaultCheckedKeys:[],defaultProps:{children:"subs",label:"title"},filterText:""}},created:function(){this.title=this.$route.meta.title,this.icon=this.$route.meta.icon,this.getData()},watch:{filterText:function(e){this.$refs.tree.filter(e)}},methods:{filterNode:function(e,t){return!e||-1!==t.title.indexOf(e)},savePermisssion:function(){var e=this,t=this.$refs.tree.getCheckedNodes(!1,!0).map((function(e){return e.id}));Object(n["b"])("saveRolePermissions",{id:this.id,permissions:t}).then((function(t){e.$message.success("保存成功"),e.permissionVisible=!1})).catch((function(t){Object(s["a"])(e,t)}))},handleSetting:function(e,t){var a=this;this.idx=e,this.id=t,this.permissionVisible=!0,Object(n["b"])("permissionWithRole",{role_id:t}).then((function(e){var t=e.data||[];a.permissionData=t.data,a.defaultCheckedKeys=t.default_checked_keys})).catch((function(e){Object(s["a"])(a,e)}))},resetAddForm:function(){this.addForm={status:1}},getData:function(){var e=this;Object(n["b"])("role",this.query).then((function(t){var a=t.data;e.tableData=a.data,e.total=a.total||0})).catch((function(t){Object(s["a"])(e,t)}))},handleSearch:function(){this.$set(this.query,"page",1),this.getData()},handleDelete:function(e,t){var a=this;this.$confirm("确定要删除 ["+t.role_name+"] 吗？","提示",{type:"warning"}).then((function(){Object(n["b"])("rolebatchDelete",{ids:[t.id]}).then((function(t){a.$message.success("删除成功"),a.tableData.splice(e,1)})).catch((function(e){Object(s["a"])(a,e)}))})).catch((function(){}))},handleSelectionChange:function(e){this.multipleSelection=e},delAllSelection:function(){var e=this;this.$confirm("确定要批量删除吗？","提示",{type:"warning"}).then((function(){var t=e.multipleSelection.length;if(!t)return!1;for(var a="",i=[],l=0;l<t;l++)a+=e.multipleSelection[l].role_name+" ",i.push(e.multipleSelection[l].id);Object(n["b"])("rolebatchDelete",{ids:i}).then((function(t){e.$message.success("删除了".concat(a)),e.multipleSelection=[],e.getData()})).catch((function(t){Object(s["a"])(e,t)}))})).catch((function(){}))},handleEdit:function(e,t){this.idx=e,this.form=Object.assign({},t),this.editVisible=!0},handleAdd:function(){this.addVisible=!0},saveAdd:function(){var e=this;Object(n["b"])("roleInsert",this.addForm).then((function(t){e.$message.success("新增成功"),e.resetAddForm(),e.getData(),e.addVisible=!1})).catch((function(t){Object(s["a"])(e,t)}))},saveEdit:function(){var e=this;Object(n["b"])("roleUpdate",this.form).then((function(t){e.$message.success("修改成功"),e.$set(e.tableData,e.idx,e.form),e.editVisible=!1})).catch((function(t){Object(s["a"])(e,t)}))},handlePageChange:function(e){this.$set(this.query,"page",e),this.getData()}}},r=o,c=(a("4c6f"),a("5d22")),d=Object(c["a"])(r,i,l,!1,null,"5a23ca08",null);t["default"]=d.exports},"3de1":function(e,t,a){"use strict";function i(e,t){e.$message.error(t),1015==t.code&&e.$router.push("/login",(function(e){}),(function(e){}))}a.d(t,"a",(function(){return i}))},"4c6f":function(e,t,a){"use strict";a("16ef")}}]);