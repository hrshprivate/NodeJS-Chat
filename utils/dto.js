module.exports = class Dto {
  email
  id
  isActivated

  constructor(model) {
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivated
  }
}
