const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.author.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.author });
  },

  /**
   * Retrieve records.
   *
   * @return {Object}
   */

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.author.search(ctx.query);
    } else {
      entities = await strapi.services.author.find(ctx.query);
    }

    return entities.map((entity) => {
      const author = sanitizeEntity(entity, {
        model: strapi.models.author,
      });

      // Flatten social
      if (author.social) {
        author.social = author.social.map(({ value }) => value).filter(Boolean);
      }

      // Flatten skills
      if (author.skills) {
        author.skills = author.skills.map(({ value }) => value).filter(Boolean);
      }

      return author;
    });
  },
};
