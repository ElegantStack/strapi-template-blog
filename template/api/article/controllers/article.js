const { sanitizeEntity } = require('strapi-utils')

module.exports = {
	/**
	 * Retrieve records.
	 *
	 * @return {Object}
	 */

	async find(ctx) {
		let entities
		if (ctx.query._q) {
			entities = await strapi.services.article.search(ctx.query)
		} else {
			entities = await strapi.services.article.find(ctx.query)
		}
		return entities.map((entity) => {
			const article = sanitizeEntity(entity, {
				model: strapi.models.article,
			})

			if (article.tags) {
				article.tags = article.tags.map((tag) => tag.name)
			}

			return article
		})
	},
}
