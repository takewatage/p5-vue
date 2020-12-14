<template>
  <div>

    <b-container class="pt-5">
      <b-row>
        <b-col md="6">
          <b-textarea
            ref="mailForm"
            v-model="mailForm">
          </b-textarea>
          <div>
            {{mcForm}}
          </div>
        </b-col>
        <b-col md="6">
          <b-button variant="outline-primary">テキスト</b-button>
          <b-button variant="outline-primary">メールアドレス</b-button>
          <b-button variant="outline-primary">URL</b-button>
          <b-button variant="outline-primary">電話番号</b-button>


          <div style="margin-top: 50px;border: 1px solid;padding: 15px;">
            <b-form-group
              id="textBox-isRequired"
              label="項目タイプ"
            >
              <b-form-checkbox
                v-model="mcForm.required"
              >必須</b-form-checkbox>
            </b-form-group>
            <b-form-group label="項目名">
              <b-form-input
                v-model="mcForm.label"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="初期値">
              <b-form-input v-model="mcForm.value"/>
            </b-form-group>
            <b-form-group label="プレースホルダー">
              <b-form-input v-model="mcForm.value"/>
            </b-form-group>

            <b-button class="mt-3" variant="primary" @click="Insert('textBox')">Submit</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <template>
      <b-container class="mt-5">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            :label="form.label"
            v-for="(form) in formData"
            :key="form.formId"
            :label-for="form.formId">
            <b-form-input
              :id="form.formId"
              v-model="form.value"
              :required="form.required"
              :placeholder="form.placeholder"
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-container>
    </template>
  </div>
</template>

<script>

    import linq from 'linq'
    import makeContactFormService from "../../services/makeContactFormService"
    import MakeContactForm from "../../models/makeContactForm"

    export default {
        data () {
            return {
                mailForm: '',
                mcForm: new MakeContactForm(),
                formData: [
                    {
                        mcfIdName: 'textBox',
                        formType: 'text',
                        label: '名前',
                        formId: 'name',
                        defaultValue: '',
                        placeholder: '',
                        required: false,
                        value: ''
                    },
                    {
                        mcfIdName: 'textBox',
                        formType: 'mail',
                        label: 'メールアドレス',
                        formId: 'name',
                        defaultValue: '',
                        placeholder: '',
                        required: false,
                        value: ''
                    }
                ]
            }
        },

        methods: {
            Insert(model) {
                const service = new makeContactForm()
                const form = service.makeForm(model, this[model])

                const textarea = this.$refs.mailForm.$refs.input
                textarea.focus()
                document.execCommand('insertText', false, form)
                // this[model]=
            },
            onSubmit() {

            },

            onReset() {

            }

        }
    }
</script>
