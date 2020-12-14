import { Model } from '@team-decorate/alcjs'

const FILLABEL = [
  'id', 'name', 'color', 'sort'
]

export default class MakeContactForm extends Model {
  constructor (data = null) {
    super()
    this.fillable = FILLABEL

    this.mcfIdName =  'textBox',
    this.formType =  'text',
    this.label =  '',
    this.formId =  '',
    this.defaultValue =  '',
    this.placeholder =  '',
    this.required =  false,
    this.value =  ''

    this.data = data

  }


}
