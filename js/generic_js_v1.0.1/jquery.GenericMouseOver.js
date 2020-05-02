////
//
//	Generic Mouse Over with jQuery.
//
//	Copyright (C) 2013 Generic Library. All Rights Reserved.
//	
//	Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
//	and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
//
//	Built on top of the jQuery library
//	http://jquery.com
//
////



/*	Generic Mouse Over
==================================================*/

$.fn.GenericMouseOver = function( user_option ){
	
	
	
	/*	デフォルトオプション
	==================================================*/
	
	this.plugin_name = 'Generic Mouse Over';
	this.original_option = {
	}
	this.option_list = new Array(
			'disable_class',				//	例外クラス
			'image_hover_class',			//	イメージオーバー適応クラス
			'image_hover_suffix',			//	マウスオーバー画像接尾辞
			'hover_duration',				//	マウスオーバー動作時間
			'opacity',						//	マウスオーバー時透明度
			'debug'							//	デバッグ機能
		)
	
	
	
	/*	デバッグ用メソッド
	==================================================*/
	
	this.flg = function(s){if( this.option['debug'] === true ) console.log( this.plugin_name+ ' : ▼ start : '+ s );}
	this.msg = function(s){if( this.option['debug'] === true ) console.log( this.plugin_name+ " : \n\t"+ s );}
	
	
	
	/*	オプションの最適化
	==================================================*/
	
	this.optimizer = function(){
	this.flg('optimizer');
	}
	
	
	
	/*	オプションの初期化
	==================================================*/
	
	this.set_option = function(){
		
		if( !isset(this.option) ) {
			
			this.option = {};
			for( var name in this.option_list ) {
				this.option[this.option_list[name]] = gl_general_options[this.option_list[name]];
			}
			for( var name in this.original_option ) {
				this.option[name] = this.original_option[name];
			}
		}
		
		if( isset(user_option) ) {
			
			for( var name in user_option ) {
				this.option[name] = user_option[name];
			}
		}
		
		this.flg('set_option');
		this.optimizer();
	}
	
	
	
	/*	コンストラクタ
	==================================================*/	
	
	
	//	イベントリスナー内参照用オブジェクト
	var self = this;
	this.set_option();
	
	//	マウスオーバー実装
	this.hover(function(){
		self.flg('hover');
		
			if( $(this).attr("class") == self.option['disable_class'] )return false;
			
			if( $(this).attr('class') == self.option['image_hover_class'] ) {
				$(this).attr("src",get_hover_src($(this).attr("src")));
				
			} else {
				$(this).fadeTo(self.option['hover_duration'],self.option['opacity']);
								
			}		
		},function(){
		self.flg('out');
		
			if( $(this).attr("class") == self.option['disable_class'] )return false;
			
			if( $(this).attr('class') == self.option['image_hover_class'] ) {
				$(this).attr("src",get_out_src($(this).attr("src")));
				
			} else {
				$(this).fadeTo(self.option['hover_duration'],1);
				
			}
		});
}