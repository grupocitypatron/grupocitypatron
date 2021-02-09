odoo.define('pos_orders_list.chrome', function (require) {
	'use strict';

	const Chrome = require('point_of_sale.Chrome');
	const Registries = require('point_of_sale.Registries');

	const BiChrome = (Chrome) =>
		class extends Chrome {
			async start() {
				await super.start();
				let res = false;
				if(this.env.pos.config.can_pay_order && !this.env.pos.config.can_create_order){
					res = true;
				}
				if (res) this.showTempScreen('POSOrdersScreen');
			}
		};

	Registries.Component.extend(Chrome, BiChrome);

	return Chrome;
});
