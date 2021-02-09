odoo.define('pos_orders_list.SeePOSOrdersButton', function(require) {
	'use strict';

	const PosComponent = require('point_of_sale.PosComponent');
	const ProductScreen = require('point_of_sale.ProductScreen');
	const { useListener } = require('web.custom_hooks');
	const Registries = require('point_of_sale.Registries');

	class SeePOSOrdersButton extends PosComponent {
		constructor() {
			super(...arguments);
			useListener('click', this.onClick);
		}
		async onClick() {
			await this.showTempScreen('POSOrdersScreen', {
				'selected_partner_id': false 
			});
		}
	}
	SeePOSOrdersButton.template = 'SeePOSOrdersButton';

	ProductScreen.addControlButton({
		component: SeePOSOrdersButton,
		condition: function() {
			let res = false;
			if(this.env.pos.config.show_order ) {
				if(this.env.pos.config.can_pay_order){
					res = true;
				}
				if(!this.env.pos.config.can_pay_order && !this.env.pos.config.can_create_order){
					res = true;
				}
			}
			
			return res;
		},
	});

	Registries.Component.add(SeePOSOrdersButton);

	return SeePOSOrdersButton;
});
