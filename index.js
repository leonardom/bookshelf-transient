'use strict'

let _ = require('lodash')
let get = require('lodash.get')

module.exports = (bookshelf, settings) => {
  let BookshelfModel = bookshelf.Model

  // Extends the default model class
  bookshelf.Model = bookshelf.Model.extend({}, {
    extended (child) {
      // Check if the extended model has the transient option
      let transient = get(child.prototype, 'transient')

      let initialize = child.prototype.initialize

      child.prototype.initialize = function () {
        // Do not override child's initialization
        if (initialize) initialize.call(this)

        // Hash the password when saving
        this.on('saving', (model, attrs, options) => {

          if (options.transient === false) {
            return
          }

          for (let field in this.attributes) {

            //ignore field if it is an object
            if (_.isObject(this.attributes[field]) &&
                !(this.attributes[field] instanceof Date)) {
              delete this.attributes[field]
            }
          }

          //ignore transient fields
          if (transient) {
            for (let field of transient) {
              if (this.attributes[field]){
                delete this.attributes[field];
              }
            }
          }
        })
      }
    }
  })
}
