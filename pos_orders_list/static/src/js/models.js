// pos_orders_list js
odoo.define('pos_orders_list.models', function(require) {
	"use strict";

	var models = require('point_of_sale.models');
	var PosDB = require("point_of_sale.DB");

	models.load_models({
		model:  'crm.team',
		fields: ['id', 'name', 'user_id', 'member_ids'],
		domain: function(self) {return [['id', '=', self.config.crm_team_id && self.config.crm_team_id[0] || false]]},
		loaded: function(self, crm_team){
			self.crm_team = crm_team;
		},
	});

	var posorder_super = models.Order.prototype;
	models.Order = models.Order.extend({
		initialize: function(attr, options) {
			this.barcode = this.barcode || "";
			this.set_barcode();
			posorder_super.initialize.call(this,attr,options);
		},

		set_barcode: function(){
			var self = this;	
			var temp = Math.floor(100000000000+ Math.random() * 9000000000000)
			self.barcode =  temp.toString();
		},

		export_as_JSON: function() {
			var self = this;
			var loaded = posorder_super.export_as_JSON.call(this);
			loaded.barcode = self.barcode;
			return loaded;
		},

		init_from_JSON: function(json){
			posorder_super.init_from_JSON.apply(this,arguments);
			this.barcode = json.barcode;
		},

		can_pay_order: function () {
			let self = this;
			let res = false;
			let config = this.pos.config;
			if(config.show_order) {
				if(config.can_pay_order){
					res = true;
				}
				if(!config.can_pay_order && !config.can_create_order){
					res = true;
				}
			}
			return res;
		},

		is_both_same: function () {
			let config = this.pos.config;
			if(config.can_pay_order && config.can_create_order){
				return true;
			}
			else if(!config.can_pay_order && !config.can_create_order){
				return true;
			}
			else{
				return false;
			}
		},

	});

	PosDB.include({
		init: function(options){
			this.get_orders_by_id = {};
			this.get_orders_by_barcode = {};
			this.get_orderline_by_id = {};
			this._super(options);
		},
	});
});