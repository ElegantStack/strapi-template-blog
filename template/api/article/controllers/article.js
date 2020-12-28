const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.article.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.article });
  },

  /**
   * Retrieve records.
   *
   * @return {Object}
   */

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.article.search(ctx.query);
    } else {
      entities = await strapi.services.article.find(ctx.query);
    }

    return entities.map((entity) => {
      const article = sanitizeEntity(entity, {
        model: strapi.models.article,
      });

      // Flatten tags
      if (article.tags) {
        article.tags = article.tags.map(({ value }) => value).filter(Boolean);
      }

      // Flatten keywords
      if (article.keywords) {
        article.keywords = article.keywords
          .map(({ value }) => value)
          .filter(Boolean);
      }

      // Replace body with rawBody for converting via mdx resolver
      if (article.body) {
        article.rawBody = article.body;
        delete article.body;
      }

      return article;
    });
  },
};
