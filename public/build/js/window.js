/*! tresor - v0.0.3 - 2013-10-10 */$(function(){var a=$(".masonry"),b=!1,c={},d=!1,e=function(a){return d=!0,b?void 0:$.ajax({url:"/allProduct",type:"GET",contentType:"application/json",data:a,dataType:"json",success:function(c){a.page=c.meta.next,g(c),null==a.page&&(b=!0,$(".end").fadeIn("slow"))}})},f=doT.template('<div class="item"><a href="#inline_content" data-id="{{=it.id}}" class="ajax-href"><img src="{{=it.image[0].w236.relative_path}}" style="height: {{=it.image[0].w236.height}}px" class="imgFade"></a><div class="info"></a><div class="title"><a href="#">{{=it.title}}</a></div><div class="seller"><a href="#">{{=it.seller.facebook_name}}</a></div><div class="price">${{=it.sold_price}}</div></div></div>'),g=function(b){b.objects.forEach(function(b){try{a.append(f(b))}catch(c){console.log("no img")}}),a.masonry("reload"),d=!1,$(".ajax-href").click(function(){$("#inline_content").empty();var a=$(this).attr("data-id"),b="/product/"+a,c=$("#inline_content"),d=b;history.pushState(b,"",b),$.ajax({url:d,type:"GET",data:{light:!0},dataType:"html",success:function(a){c.empty(),c.append(a)},error:function(){}})}),$(".ajax-href").colorbox({inline:!0,fixed:!0,width:"1050",height:"98%",onCleanup:function(){history.pushState("/","","/")}})};$(window).load(function(){a.masonry({itemSelector:".item",columnWidth:250,isFitWidth:!0}),$(window).scroll(function(){$(window).scrollTop()>=$(document).height()-$(window).height()-300&&(d||e(c,g))}),$(window).trigger("scroll")}),$(window).resize(function(){a.masonry("reload")}),$("#filter .dropdown-menu li").click(function(){$(".masonry").empty();var a=$(this).find("a"),d=a.attr("data-type");c.type=d,b=!1,e(c,g)}),$(".feedback").colorbox({inline:!0,fixed:!0,width:"350",height:"50%",onCleanup:function(){history.pushState("/","","/")}}),$("#feedbackFrom .submit").click(function(){function a(){var a,b=navigator.appName,c=navigator.userAgent,d=c.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);d&&null!=(a=c.match(/version\/([\.\d]+)/i))&&(d[2]=a[1]);var e="Unknown OS";return-1!=navigator.appVersion.indexOf("Win")&&(e="Windows"),-1!=navigator.appVersion.indexOf("Mac")&&(e="MacOS"),-1!=navigator.appVersion.indexOf("X11")&&(e="UNIX"),-1!=navigator.appVersion.indexOf("Linux")&&(e="Linux"),d=d?[e,d[1],d[2]]:[b,navigator.appVersion,"-?"]}var b=$("#fbTitle").val(),c=$("#fbContent").val(),d=a(),e={title:b,content:c,info:d};alert(e),$.ajax({type:"post",url:"/feedback",data:e,success:function(a){console.log(a),"ok"===a.msg&&alert("感謝您的寶貴意見\n這讓tresor能夠持續進步:D")},error:function(){alert("fail")}})})});