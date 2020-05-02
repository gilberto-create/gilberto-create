////
//
//	Generic List Manager with jQuery.
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



/*	Generic List Manager
==================================================*/

$.fn.GenericListManager = function( user_option ){
	
	
	
	/*	デフォルトオプション
	==================================================*/
	
	this.plugin_name = 'Generic List Manager';
	this.original_option = {
		
			//	クラス関連
			'numbering_class'	: 'numbering',
			'both_class'		: 'both',
			'toggle_class'		: 'toggle',
			'separate_class'	: 'separate',
		
			//	設定
			'numbering_auto'	: false,
			'both_auto'			: true,
			'toggle_auto'		: false,
			'separate_auto'		: false
		}
	this.option_list = new Array(
			'list_first',	//	始めの要素クラス
			'list_last',	//	最期の要素クラス
			'odd',			//	奇数要素クラス
			'even',			//	偶数要素クラス
			'list_item',	//	全アイテムクラス（ナンバリング時）
			'group',		//	グループクラス
			'group_first',	//	グループ先頭クラス
			'group_last',	//	グループ末尾クラス
			'debug'			//	デバッグ機能
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
	
	
	this.each(function(){
		
		
		//	対象となる子要素の切り替え
		switch(get_tag($(this))) {
			case 'dl':
				children_tag = 'dt';
				break;
			case 'table':
				children_tag = 'tr';
				break;
			case 'div':
				children_tag = 'div';
				break;
			case 'ol':
			case 'ul':
				children_tag = 'li';
				break;
			default:
				return false;
		}
		
		
		//	最初、最後
		if( $(this).hasClass(self.option['both_class']) || self.option['both_auto'] ) {
			
			$(this).find(children_tag+ ':first-child').addClass(self.option['list_first']);
			$(this).find(children_tag+ ':last-child').addClass(self.option['list_last']);
		}
		
		
		//	交互
		if( $(this).hasClass(self.option['toggle_class']) || self.option['toggle_auto'] ) {
			
			$(this).find(children_tag+ ':nth-child(odd)').addClass(self.option['odd']);
			$(this).find(children_tag+ ':nth-child(even)').addClass(self.option['even']);
		}
		
		//	指定個数区切り
		preg = new RegExp('^'+self.option['separate_class']);
		if( $(this).hasClassRegExp( preg ) || self.option['separate_auto'] ) {
			
			separate_num = 0
			
			$(this).attr('class').split(' ').forEach(function(i){
				if( preg.test(i) ) {
					separate_num = parseInt(i.replace( self.option['separate_class'], '' ));
				}
			});
			
			if( separate_num != 0 ) {
				
				group_target = ( children_tag != '' )? $(this).find(children_tag):$(this).children();
				group_target.each(function(i){
					
					group_num = parseInt(i/separate_num) + 1;
					$(this).addClass(self.option['group']+group_num);
					
					if( i/separate_num+1 == parseInt(i/separate_num+1) ) {
						$(this).addClass(self.option['group_first']);

					}
					
					if( (i+1)/separate_num == parseInt((i+1)/separate_num) ) {
						$(this).addClass(self.option['group_last']);
					}
				});
			}
		}
		
		
		//	要素番号
		if( $(this).hasClass(self.option['numbering_class']) || self.option['numbering_auto'] ) {
			
			numbering_target = ( children_tag != '' )? $(this).find(children_tag):$(this).children();
			numbering_target.each(function(i){
				$(this).addClass(self.option['list_item']+(i+1));	
			});
		}
	});
}