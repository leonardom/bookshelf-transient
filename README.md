# bookshelf-transient
[![Build Status](https://circleci.com/gh/leonardom/bookshelf-transient.svg?style=shield)](https://circleci.com/gh/leonardom/bookshelf-transient)
[![Code Climate](https://codeclimate.com/github/leonardom/bookshelf-transient/badges/gpa.svg)](https://codeclimate.com/github/leonardom/bookshelf-transient)
[![Test Coverage](https://codeclimate.com/github/leonardom/bookshelf-transient/badges/coverage.svg)](https://codeclimate.com/github/leonardom/bookshelf-transient/coverage)
[![GitHub version](https://badge.fury.io/gh/leonardom%2Fbookshelf-transient.svg)](https://badge.fury.io/gh/leonardom%2Fbookshelf-transient)

Specifies that the field is not persistent. It is used to specify which field of your bookshelf models will not be saved on database.

### Installation

After installing `bookshelf-transient` with `npm i --save bookshelf-transient`,
all you need to do is add it as a bookshelf plugin and enable it on your models.

```javascript
let knex = require('knex')(require('./knexfile.js').development)
let bookshelf = require('bookshelf')(knex)

// Add the plugin
bookshelf.plugin(require('bookshelf-transient'))

// Enable it on your models
let User = bookshelf.Model.extend({ tableName: 'users', transient: [ 'password', 'confirm_password' ] })

```

### Usage

Nothing fancy here, just keep using bookshelf as usual.


### Testing

```bash
git clone git@github.com:leonardom/bookshelf-transient.git
cd bookshelf-transient && npm install && npm test
```
