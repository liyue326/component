jQuery(document).ready(function(){
	$('#fillForm').validate({
		debug:true,
		rules:{ //配置验证规则，key就是被验证的dom对象，value就是调用验证的方法(也是json格式)
			user:{
				required:true, //必填。如果验证方法不需要参数，则配置为true
				rangelength:[2,6]
			},
			tel:{
				required:true,
				tel:true

			},
			license:{
				required:true,
				isNumber:true
			},
			company:{
				required:true


			},
			register:{
				required:true,
				isNumber:true

			},
			upLoad:{
				required: true,
				filetype:["jpg","jpeg","png","ico","gif"],
				filesize:true
			},
			upLoad2:{
				required: true,
				filetype:["jpg","jpeg","png","ico","gif"],
				filesize:true
			},


		},
		messages:{
			user:{
				required:"请输入用户名",
				rangelength:$.validator.format("用户名长度须在{0}-{1}字符之间")
			},
			tel:{
				required:"请输入电话号码"

			},
			license:{
				required:"请输入正确组织机构代码"

			},
			company:{
				required:"请输入公司名称"

			},
			register:{
				required:"请输入正确工商注册号"

			},
			upLoad:{
				required:"请上传文件",
				filetype: "只能上传图片",
				filesize:"文件需小于5M"
			},
			upLoad2:{
				required:"请上传文件",
				filetype: "只能上传图片",
				filesize:"文件需小于5M"
			}

		},

	})
})
jQuery.validator.addMethod("tel", function(value, element) {
	var tel = /^(\d{3,4}-?)?\d{7,9}$/g; //电话号码格式010-12345678
	return this.optional(element) || (tel.test(value));
}, "请正确填写您的电话号码");
jQuery.validator.addMethod("chcharacter", function(value, element) {
	var chcharacter = /^[u4e00-u9fa5]+$/;
	return this.optional(element) || (tel.test(value));
}, "请输入汉字");
jQuery.validator.addMethod("isNumber", function(value, element) {
	return this.optional(element) || /^\d+$/.test(value);
}, "只能输入0-9数字");
jQuery.validator.addMethod("filetype",function(value,element,param){
	var fileType = value.substring(value.lastIndexOf(".") + 1).toLowerCase();
	return this.optional(element) || $.inArray(fileType, param) != -1;
}, $.validator.format("请输入正确格式图片"));
jQuery.validator.addMethod("filesize", function(value,element) {
	var fileSize=element.files[0].size;
	var maxSize = 5*1024*1024;
	if(fileSize > maxSize){
		return false;
	}else{
		return true;
	}
}, "请上传大小在5M一下的图片");