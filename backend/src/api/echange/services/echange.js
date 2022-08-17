'use strict';

/**
 * echange service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::echange.echange');
