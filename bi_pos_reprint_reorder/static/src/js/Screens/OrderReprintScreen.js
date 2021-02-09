odoo.define('bi_pos_reprint_reorder.OrderReprintScreen', function (require) {
	'use strict';

	const ReceiptScreen = require('point_of_sale.ReceiptScreen');
	const Registries = require('point_of_sale.Registries');

	const OrderReprintScreen = (ReceiptScreen) => {
		class OrderReprintScreen extends ReceiptScreen {
			constructor() {
				super(...arguments);
			}

			get is_only_pay(){
				let res = false;
				if(this.env.pos.config.can_pay_order && !this.env.pos.config.can_create_order){
					res = true;
				}
				return res;
			}

			back() {
				if(this.is_only_pay){
					this.showTempScreen('POSOrdersScreen');
				}else{
					this.trigger('close-temp-screen');
				}
			}
		}
		OrderReprintScreen.template = 'OrderReprintScreen';
		return OrderReprintScreen;
	};

	Registries.Component.addByExtending(OrderReprintScreen, ReceiptScreen);

	return OrderReprintScreen;
});
