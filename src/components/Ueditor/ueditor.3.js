import React from 'react';
 
var Ueditor = React.createClass({ 
    componentDidMount(){
        var editor = UE.getEditor(this.props.id, {
             //工具栏
                toolbars: [[
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch',  
                    '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|', 
                    'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                    'simpleupload',  
                    'horizontal', 'date', 'time',  
                ]]
                ,lang:"zh-cn"
                //字体
                ,'fontfamily':[
                   { label:'',name:'songti',val:'宋体,SimSun'},
                   { label:'',name:'kaiti',val:'楷体,楷体_GB2312, SimKai'},
                   { label:'',name:'yahei',val:'微软雅黑,Microsoft YaHei'},
                   { label:'',name:'heiti',val:'黑体, SimHei'},
                   { label:'',name:'lishu',val:'隶书, SimLi'},
                   { label:'',name:'andaleMono',val:'andale mono'},
                   { label:'',name:'arial',val:'arial, helvetica,sans-serif'},
                   { label:'',name:'arialBlack',val:'arial black,avant garde'},
                   { label:'',name:'comicSansMs',val:'comic sans ms'},
                   { label:'',name:'impact',val:'impact,chicago'},
                   { label:'',name:'timesNewRoman',val:'times new roman'}
                ],
                // 字号
                'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36],
                // 为编辑器实例添加一个路径，必需项
                // 'UEDITOR_HOME_URL': '../../node_modules/ueditor/',
                'UEDITOR_HOME_URL': 'http://114.55.249.108:9011/admin/node_modules/ueditor/',
                
                // 上传图片时后端提供的接口
                // serverUrl: window.api_host + '/innerMessage/uploadImage',
                // serverUrl: 'http://www.basung.com:9011/admin/file/uploadWithThumb',
                serverUrl: 'http://114.55.249.108:9011/admin/ueditor/jsp/controller.jsp',                    
                enableAutoSave: false,
                autoHeightEnabled: false,
                initialFrameHeight: this.props.height,
                initialFrameWidth: '100%',
                // 是否允许编辑
                readonly: this.props.disabled
        });
        var me = this;
        editor.ready( function( ueditor ) {
            if (!ueditor) {
                // 如果初始化后ueditor不存在删除后重新调用
                UE.delEditor(me.props.id);
                // self.initEditor();
            }else{
                //如果出事后成功ueditor,则根据情况会显示类容
                var value = me.props.value?me.props.value:'<p></p>';
                editor.setContent(value); 
            }
           
        }); 
    },
    render : function(){
        return (
             <script id={this.props.id} name="content" type="text/plain">
                  
             </script>
        )
    }
})
export default Ueditor;