<template>
  <div class="create-shop">
    <div class="form-wrapper">
      <form @submit.prevent class="create-form">
        <basic-input
          translatePath="inputs.shopName"
          v-model="name"
        ></basic-input>
        <basic-input
          translatePath="inputs.street"
          v-model="street"
        ></basic-input>
        <basic-input
          translatePath="inputs.city"
          v-model="city"
        ></basic-input>
        <basic-input
          translatePath="inputs.postalCode"
          v-model="postal_code"
        ></basic-input>
        <basic-input
          translatePath="inputs.description"
          v-model="description"
        ></basic-input>
        <div class="upload-wrapper">
          <img
            class="uploaded-image"
            v-if="uploadedLogo"
            :src="logoUrl"
          />
          <basic-button
            v-if="uploadedLogo"
            translatePath="buttons.cancelFile"
            @buttonClick="() => this.uploadedLogo = ''"
          ></basic-button>
          <input
            v-if="!uploadedLogo"
            accept="image/*"
            class="input-file"
            name="logo" id="logo"
            type="file"
            @input="handleUploadLogo"
          />
          <label
            v-if="!uploadedLogo"
            for="logo"
            class="file-upload"
          >
            {{$t('inputs.logo')}}
          </label>
        </div>
        <div class="upload-wrapper">
          <img
            class="uploaded-image"
            v-if="uploadedPhoto"
            :src="photoUrl"
          />
          <basic-button
            v-if="uploadedPhoto"
            translatePath="buttons.cancelFile"
            @buttonClick="() => this.uploadedPhoto = ''"
          ></basic-button>
          <input
            v-if="!uploadedPhoto"
            accept="image/*"
            class="input-file"
            name="photo" id="photo"
            type="file"
            @input="handleUploadPhoto"
          />
          <label
            v-if="!uploadedPhoto"
            for="photo"
            class="file-upload"
          >
            {{$t('inputs.photo')}}
          </label>
        </div>
      </form>
      <div class="buttons-wrapper">
        <div class="button-wrapper">
          <basic-button
            v-if="!id"
            translatePath="buttons.create"
            @buttonClick="handleCreate"
          ></basic-button>
          <basic-button
            v-if="id"
            translatePath="buttons.save"
            @buttonClick="handleSave"
          ></basic-button>
        </div>
        <div class="button-wrapper">
          <basic-button
            translatePath="buttons.cancel"
            @buttonClick="handleCancel"
          ></basic-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicInput from '../../common/input/BasicInput.vue';
import BasicButton from '../../common/button/BasicButton.vue';
import {
  uploadFile,
  createNewShop,
  fetchIcecreamShop,
  editShop,
} from '../requests';
import { composeSecureUrl } from '../../../utils/common';

export default {
  mounted() {
    if (this.$attrs && this.$attrs.id) {
      fetchIcecreamShop(this.$attrs.id).then(
        (response) => {
          if (response) {
            this.id = response.icecream_shop_id;
            this.name = response.name;
            this.street = response.street;
            this.city = response.city;
            this.postal_code = response.postal_code;
            this.description = response.description;
            this.uploadedLogo = response.logo_file_name;
            this.uploadedPhoto = response.photo_file_name;
          }
        },
      );
    }
  },
  data() {
    return {
      id: '',
      name: '',
      street: '',
      city: '',
      postal_code: '',
      description: '',
      uploadedLogo: '',
      uploadedPhoto: '',
    };
  },
  components: {
    BasicInput,
    BasicButton,
  },
  computed: {
    logoUrl() {
      return composeSecureUrl(this.uploadedLogo);
    },
    photoUrl() {
      return composeSecureUrl(this.uploadedPhoto);
    },
  },
  methods: {
    async handleCreate() {
      const data = {
        name: this.name,
        street: this.street,
        city: this.city,
        postal_code: this.postal_code,
        description: this.description,
      };
      if (this.uploadedLogo) {
        data.logo_file_name = this.uploadedLogo;
      }
      if (this.uploadedPhoto) {
        data.photo_file_name = this.uploadedPhoto;
      }
      const result = await createNewShop(data);
      if (!result) {
        const notification = { message: this.$t('notifications.error'), type: 'error' };
        this.$store.dispatch(
          'notifications/pushNotification',
          { notification, timeout: 1000 },
        );
      } else {
        const notification = { message: this.$t('notifications.created'), type: 'info' };
        this.$store.dispatch(
          'notifications/pushNotification',
          { notification, timeout: 1000 },
        );
        this.$router.push('/shops');
      }
    },
    async handleSave() {
      const data = {
        icecreamShopId: this.id,
        name: this.name,
        street: this.street,
        city: this.city,
        postal_code: this.postal_code,
        description: this.description,
        logo_file_name: this.uploadedLogo,
        photo_file_name: this.uploadedPhoto,
      };
      const result = await editShop(data);
      if (!result) {
        const notification = { message: this.$t('notifications.error'), type: 'error' };
        this.$store.dispatch(
          'notifications/pushNotification',
          { notification, timeout: 1000 },
        );
      } else {
        const notification = { message: this.$t('notifications.created'), type: 'info' };
        this.$store.dispatch(
          'notifications/pushNotification',
          { notification, timeout: 1000 },
        );
        this.$router.push(`/shops/view/${this.id}`);
      }
    },
    handleCancel() {
      if (this.id) {
        this.$router.push(`/shops/view/${this.id}`);
      } else {
        this.$router.push('/shops');
      }
    },
    async fileUpload(file) {
      const formData = new FormData();
      formData.append('file', file);
      return uploadFile(formData);
    },
    async handleUploadLogo(event) {
      const result = await this.fileUpload(event.target.files[0]);
      const { target } = event;
      if (!result) {
        target.value = null;
      }
      this.uploadedLogo = result.fileName;
    },
    async handleUploadPhoto(event) {
      const result = await this.fileUpload(event.target.files[0]);
      const { target } = event;
      if (!result) {
        target.value = null;
      }
      this.uploadedPhoto = result.fileName;
    },
  },
};
</script>

<style lang="scss">
@import './create-shop-styles.scss';
</style>
