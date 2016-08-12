'use strict'

let co = require('co')
let lab = exports.lab = require('lab').script()
let expect = require('code').expect
let bcrypt = require('bcrypt')

let db = require('../db')
let User = db.bookshelf.model('User')

lab.experiment('bookshelf-transient', () => {
  lab.beforeEach(co.wrap(function * () {
    yield db.reset()
  }))

  lab.test('should not save transient fields', co.wrap(function * () {
    let user = yield User
      .forge({
        name: 'John Joe',
        email: 'john@joe.com',
        password: 'password',
        password_confirmation: 'password',
        hashed_password: bcrypt.hashSync('password', 12)
      })
      .save()

    expect(user.get('name')).to.be.equal('John Joe')
    expect(user.get('email')).to.be.equal('john@joe.com')
    expect(user.get('hashed_password')).to.not.be.null()

    expect(user.get('password')).to.be.undefined()
    expect(user.get('password_confirmation')).to.be.undefined()
  }))

  lab.test('should not save object fields', co.wrap(function * () {
    let user = yield User
      .forge({
        name: 'John Joe',
        email: 'john@joe.com',
        profile: {
          photo: 'picture.png',
          plan_id: 1
        },
        created_at: new Date()
      })
      .save()

    expect(user.get('name')).to.be.equal('John Joe')
    expect(user.get('email')).to.be.equal('john@joe.com')
    expect(user.get('created_at')).to.not.be.null()

    expect(user.get('profile')).to.be.undefined()
    expect(user.get('password_confirmation')).to.be.undefined()
  }))

  lab.test('should bypass transient', co.wrap(function * () {
    let user = User
      .forge({
        name: 'John Joe',
        email: 'john@joe.com',
        password: 'password',
        password_confirmation: 'password',
        hashed_password: bcrypt.hashSync('password', 12)
      })

    let error = yield user.save(null, { transient: false }).catch(err => err)

    expect(error).to.not.be.undefined()
    expect(error).to.not.be.null()
    expect(error).to.be.instanceof(Error)
    expect(user.get('password')).to.equal('password')
    expect(user.get('password_confirmation')).to.equal('password')

  }))

  lab.test('should not override child\'s initialization', co.wrap(function * () {
    let initialized = false
    let bookshelf = require('bookshelf')(db.bookshelf.knex)
    bookshelf.plugin(require('../../'))

    let Model = bookshelf.Model.extend({
      tableName: 'users',
      transient: ['password'],
      initialize () {
        initialized = true
      }
    })

    let user = yield Model.forge({
      name: 'John Joe',
      email: 'john@joe.com',
      password: 'password'
    })
    .save()

    expect(initialized).to.be.true()
    expect(user.get('name')).to.be.equal('John Joe')
    expect(user.get('email')).to.be.equal('john@joe.com')
    expect(user.get('password')).to.be.undefined()
  }))

  lab.test('should not bootstrap on unconfigured models', co.wrap(function * () {
    let Model = db.bookshelf.Model.extend({ tableName: 'users' })

    let user = Model.forge({
      name: 'John Joe',
      email: 'john@joe.com',
      password: 'password'
    })

    let error = yield user.save().catch(err => err)

    expect(error).to.not.be.undefined()
    expect(error).to.not.be.null()
    expect(error).to.be.instanceof(Error)
    expect(user.get('password')).to.equal('password')
  }))
})
