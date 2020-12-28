const _ = require('lodash')

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
	lifecycles: {
		async beforeCreate(data) {
			if (_.isNil(data.category)) {
				throw strapi.errors.badRequest('Error: Category is required!')
			}
		},
	},
}
