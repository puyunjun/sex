function change(obj) {
	var file = $(obj).get(0).files[0];
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e) {
		var str='';
		var obj=e.target.result;
		if(obj.indexOf('image')>-1){
			str='<div class="fl"><img style="width:100%;height:100%;" id="imgs[]" src="'+e.target.result+'" /></div>'
		}
		if(obj.indexOf('video')>-1){
			str='<div class="fl"><video width="100%" height="100%" style="object-fit:cover;" autoplay="autoplay" loop="loop" src="'+e.target.result+'"></video></div>'
		}
		$('.info-add').prepend(str);
		$.post("/index.php?m=hostinfo&c=index&a=add_image", { img: e.target.result},function(ret){
			if(ret.img!=''){
				//鑾峰彇
				var imgs=$("#imgs").val();
				if(imgs==''){
					$("#imgs").val(ret.img);
				}else{
					var new_img=imgs+","+ret.img;
					$("#imgs").val(new_img);
				}
			}else{
				alert('涓婁紶澶辫触');
			}
		},'json');
	}
}