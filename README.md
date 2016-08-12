# bookshelf-transient
[![Build Status](https://circleci.com/gh/estate/bookshelf-bcrypt.svg?style=shield)](https://circleci.com/gh/estate/bookshelf-bcrypt)
[![Code Climate](https://codeclimate.com/github/estate/bookshelf-bcrypt/badges/gpa.svg)](https://codeclimate.com/github/estate/bookshelf-bcrypt)
[![Test Coverage](https://codeclimate.com/github/estate/bookshelf-bcrypt/badges/coverage.svg)](https://codeclimate.com/github/estate/bookshelf-bcrypt/coverage)
[![Version](https://badge.fury.io/js/bookshelf-bcrypt.svg)](http://badge.fury.io/js/bookshelf-bcrypt)
[![Downloads](http://img.shields.io/npm/dm/bookshelf-bcrypt.svg)](https://www.npmjs.com/package/bookshelf-bcrypt)

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
