jQuery(function(a){a("#availablethemes").on("click",".theme-detail",function(b){a(this).parent().siblings(".themedetaildiv").toggle();b.preventDefault()})});jQuery(function(c){var e=c("#theme-installer"),d=e.find(".install-theme-info"),b=e.find(".wp-full-overlay-main"),a=c(document.body);e.on("click",".close-full-overlay",function(f){e.fadeOut(200,function(){b.empty();a.removeClass("theme-installer-active full-overlay-active")});f.preventDefault()});e.on("click",".collapse-sidebar",function(f){e.toggleClass("collapsed");f.preventDefault()});c("#availablethemes").on("click",".installable-theme",function(f){var g;d.html(c(this).find(".install-theme-info").html());g=d.find(".theme-preview-url").val();b.html('<iframe src="'+g+'" />');e.fadeIn(200,function(){a.addClass("theme-installer-active full-overlay-active")});f.preventDefault()})});var ThemeViewer;(function(a){ThemeViewer=function(b){function d(){a("#filter-click, #mini-filter-click").unbind("click").click(function(){a("#filter-click").toggleClass("current");a("#filter-box").slideToggle();a("#current-theme").slideToggle(300);return false});a("#filter-box :checkbox").unbind("click").click(function(){var e=a("#filter-box :checked").length,f=a("#filter-click").text();if(f.indexOf("(")!=-1){f=f.substr(0,f.indexOf("("))}if(e==0){a("#filter-click").text(f)}else{a("#filter-click").text(f+" ("+e+")")}})}var c={init:d};return c}})(jQuery);jQuery(document).ready(function(a){theme_viewer=new ThemeViewer();theme_viewer.init()});var ThemeScroller;(function(a){ThemeScroller={querying:false,scrollPollingDelay:500,failedRetryDelay:4000,outListBottomThreshold:300,init:function(){var b=this;if(typeof ajaxurl==="undefined"||typeof list_args==="undefined"||typeof theme_list_args==="undefined"){a(".pagination-links").show();return}this.nonce=a("#_ajax_fetch_list_nonce").val();this.nextPage=(theme_list_args.paged+1);this.$outList=a("#availablethemes");this.$spinner=a("div.tablenav.bottom").children("img.ajax-loading");this.$window=a(window);this.$document=a(document);if(theme_list_args.total_pages>=this.nextPage){this.pollInterval=setInterval(function(){return b.poll()},this.scrollPollingDelay)}},poll:function(){var b=this.$document.scrollTop()+this.$window.innerHeight();if(this.querying||(b<this.$outList.height()-this.outListBottomThreshold)){return}this.ajax()},process:function(b){if(b===undefined){clearInterval(this.pollInterval);return}if(this.nextPage>theme_list_args.total_pages){clearInterval(this.pollInterval)}if(this.nextPage<=(theme_list_args.total_pages+1)){this.$outList.append(b.rows)}},ajax:function(){var b=this;this.querying=true;var c={action:"fetch-list",paged:this.nextPage,s:theme_list_args.search,tab:theme_list_args.tab,type:theme_list_args.type,_ajax_fetch_list_nonce:this.nonce,"features[]":theme_list_args.features,list_args:list_args};this.$spinner.css("visibility","visible");a.getJSON(ajaxurl,c).done(function(d){b.nextPage++;b.process(d);b.$spinner.css("visibility","hidden");b.querying=false}).fail(function(){b.$spinner.css("visibility","hidden");b.querying=false;setTimeout(function(){b.ajax()},b.failedRetryDelay)})}};a(document).ready(function(b){ThemeScroller.init()})})(jQuery);