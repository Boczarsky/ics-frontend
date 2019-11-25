<template>
  <div class="view-shop">
    <basic-button
      translatePath="buttons.cancel"
      @buttonClick="() => $router.push('/shops')"
    ></basic-button>
    <basic-button
      v-if="checkIfCanFavorite()"
      :translatePath="isFavorite() ? 'buttons.unfavorite' : 'buttons.favorite'"
      @buttonClick="() => handleFavorite()"
    ></basic-button>
    <basic-button
      v-if="checkIfEmployee() || checkIfManager()"
      translatePath="buttons.edit"
      @buttonClick="() => $router.push(`/shops/edit/${icecreamShopData.icecream_shop_id}`)"
    ></basic-button>
    <div class="shop-info" v-if="icecreamShopData">
      <div class="icecream-shop-photo" v-if="photoUrl">
        <img :src="photoUrl"/>
      </div>
      <div class="icecream-shop-name read-only-input">
        {{icecreamShopData.name}}
      </div>
      <div class="icecream-shop-followers read-only-input">
        {{icecreamShopData.followers}} ❤
      </div>
      <div class="icecream-shop-street read-only-input">
        {{icecreamShopData.street}}
      </div>
      <div class="icecream-shop-postal-code read-only-input">
        {{icecreamShopData.postal_code}}
      </div>
      <div class="icecream-shop-city read-only-input">
        {{icecreamShopData.city}}
      </div>
      <div class="icecream-shop-city read-only-input">
        {{icecreamShopData.description}}
      </div>
    </div>
    <fieldset class="shop-opinions" v-if="shopOpinions">
      <legend>Opinie</legend>
      <div
        class="opinion"
        v-for="opinion in shopOpinions"
        :key="`o${opinion.opinion_comment_id}`"
      >
        <filedset class="opinion-content">
          <legend>{{opinion.grade}} / 10</legend>
          {{opinion.content}}
        </filedset>
        <fieldset class="opinion-comments" v-if="opinion.comments">
          <legend>Komentarze</legend>
          <div
            class="comment"
            v-for="opinionComment in opinion.comments"
            :key="`oc${opinionComment.opinion_comment_id}`"
          >
            {{opinionComment.content}}
          </div>
          <form
            v-if="(checkIfEmployee() || checkIfManager()) || opinion.user_id === userId"
            @submit.prevent="(event) => handleAddOpinionComment(
              event.target.elements.comment,
              opinion.opinion_id
            )"
          >
            <input
              name="comment"
              type="text"
              placeholder="dodaj komentarz"
            >
          </form>
        </fieldset>
      </div>
      <form
        v-if="userType === 1 && !shopOpinions.some(opinion => opinion.user_id === userId)"
        @submit.prevent="handleAddOpinion"
      >
        <input v-model="newOpinion" type="text">
        <input v-model="newOpinionGrade" type="number" max="10" min="0">
        <input type="submit" value="Dodaj opinie">
      </form>
    </fieldset>
    <fieldset class="shop-posts" v-if="shopPosts">
      <legend>Posty</legend>
      <div
        class="post"
        v-for="post in shopPosts"
        :key="`p${post.post_id}`"
      >
        <div class="post-content">
          {{post.content}}
        </div>
        <fieldset class="post-comments" v-if="post.comments">
          <legend>Komentarze</legend>
          <div
            class="comment"
            v-for="postComment in post.comments"
            :key="`pc${postComment.post_id}`"
          >
            {{postComment.content}}
          </div>
          <form
            @submit.prevent="(event) => handleAddPostComment(
              event.target.elements.comment,
              post.post_id
            )"
          >
            <input
              name="comment"
              type="text"
              placeholder="dodaj komentarz"
            >
          </form>
        </fieldset>
      </div>
      <form
        v-if="checkIfEmployee() || checkIfManager()"
        @submit.prevent="handleAddPost"
      >
            <input v-model="newPost" type="text">
            <input type="submit" value="Dodaj post">
      </form>
    </fieldset>
    <fieldset class="shop-flavours" v-if="shopFlavours">
      <legend>Smaki</legend>
      <table class="flavours-table">
        <thead>
          <th>Nazwa</th>
          <th>Skład</th>
          <th>Status</th>
          <th>Opinie</th>
          <th>Hashtagi</th>
        </thead>
        <tr
          class="flavour"
          v-for="flavour in shopFlavours"
          :key="`f${flavour.flavour_id}`"
        >
          <td>{{flavour.name}}</td>
          <td>{{flavour.composition}}</td>
          <td>{{flavour.status = 1 ? 'Dostępny' : 'Niedostępny'}}</td>
          <td class="flavour-reactions">
            <span
              v-for="reaction in parseReactions(flavour.reactions)"
              :key="`r${reaction.value}`"
              :class="reaction.selected ? 'reaction selected' : 'reaction'"
              @click="
                () => handleRateFlavour(
                    reaction.value, flavour.icecream_flavour_id, reaction.selected
                  )"
            >
              {{reaction.display}}
            </span>
          </td>
          <td>
            {{flavour.hashtags.map(obj => `#${obj.hashtag}`).join(', ')}}
          </td>
        </tr>
      </table>
      <div class="addNewFlavour" v-if="checkIfEmployee() || checkIfManager()">
        <form @submit.prevent="handleAddFlavour">
          <label>Nazwa:<input v-model="newFlavourName"></label>
          <label>Skład:<input v-model="newFlavourComposition"></label>
          <label>Status:
            <select v-model="newFlavourStatus">
              <option value="1">Dostępny</option>
              <option value="2">Niedostępny</option>
            </select>
          </label>
          <label>Hashtagi:<input v-model="newFlavourHashtags"></label>
          <input type="submit" value="Dodaj">
        </form>
      </div>
    </fieldset>
    <fieldset>
      <legend>Promocje</legend>
      <table class="coupons-table">
        <thead>
          <th>Numer promocji</th>
          <th>Limit</th>
          <th>Nagroda</th>
          <th>Info</th>
          <th>Od</th>
          <th>Do</th>
          <th v-if="userType === 1">Kupon</th>
        </thead>
        <tr v-for="promotion in promotions" :key="`promotion${promotion.promotion_id}`">
          <td>{{promotion.promotion_id}}</td>
          <td>{{promotion.limit}}</td>
          <td>{{promotion.prize}}</td>
          <td>{{promotion.info}}</td>
          <td>{{promotion.start_date}}</td>
          <td>{{promotion.end_date}}</td>
          <td v-if="userType === 1">
            <button @click="() => takeCoupon(promotion.promotion_id)">Weź kupon</button>
          </td>
        </tr>
      </table>
    </fieldset>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BasicButton from '../../common/button/BasicButton.vue';
import { listPromotions, couponCreate } from '../../promotions/requests';
import {
  fetchIcecreamShop,
  createPost,
  addPostComment,
  addOpinion,
  addOpinionComment,
  addFlavourReaction,
  removeFlavourReaction,
  addFlavour,
  removeFavorite,
  addFavorite,
} from '../requests';
import { composeSecureUrl } from '../../../utils/common';

export default {
  async mounted() {
    const result = await fetchIcecreamShop(this.$attrs.id);
    this.icecreamShopData = result;
    this.promotions = await listPromotions({ managerId: result.owner_id });
  },
  data() {
    return {
      icecreamShopData: null,
      promotions: [],
      newPost: '',
      newOpinion: '',
      newOpinionGrade: 10,
      newPostComment: '',
      newOpinionComment: '',
      newFlavourName: '',
      newFlavourComposition: '',
      newFlavourStatus: 0,
      newFlavourHashtags: '',
    };
  },
  computed: {
    ...mapGetters({
      userId: 'user/userId',
      userType: 'user/userType',
      userData: 'user/userData',
    }),
    photoUrl() {
      if (!this.icecreamShopData) {
        return null;
      }
      if (this.icecreamShopData.photo_file_name) {
        return composeSecureUrl(this.icecreamShopData.photo_file_name);
      }
      return null;
    },
    logoUrl() {
      if (!this.icecreamShopData) {
        return null;
      }
      if (this.icecreamShopData.logo_file_name) {
        return composeSecureUrl(this.icecreamShopData.logo_file_name);
      }
      return null;
    },
    shopOpinions() {
      if (!this.icecreamShopData) {
        return [];
      }
      if (this.icecreamShopData.opinions) {
        return this.icecreamShopData.opinions;
      }
      return [];
    },
    shopPosts() {
      if (!this.icecreamShopData) {
        return [];
      }
      if (this.icecreamShopData.posts) {
        return this.icecreamShopData.posts;
      }
      return [];
    },
    shopFlavours() {
      if (!this.icecreamShopData) {
        return [];
      }
      if (this.icecreamShopData.flavours) {
        return this.icecreamShopData.flavours;
      }
      return [];
    },
  },
  methods: {
    async takeCoupon(id) {
      console.log(id);
      const result = await couponCreate({ promotionId: id });
      if (result) {
        const notification = { message: 'Dodano kupon', type: 'info' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      } else {
        const notification = { message: 'Wystąpił błąd', type: 'error' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      }
    },
    isFavorite() {
      if (this.userData && this.userData.favorites && this.userData.favorites.length) {
        return this.userData.favorites.some(fav => fav === +this.$attrs.id);
      }
      return false;
    },
    checkIfCanFavorite() {
      return this.userType === 1;
    },
    async handleFavorite() {
      let response = null;
      if (this.isFavorite()) {
        response = await removeFavorite({ icecreamShopId: +this.$attrs.id });
      } else {
        response = await addFavorite({ icecreamShopId: +this.$attrs.id });
      }
      if (response) {
        this.icecreamShopData = await fetchIcecreamShop(this.$attrs.id);
        this.$store.dispatch('user/fetchUserData');
      } else {
        const notification = { message: 'Wystąpił błąd', type: 'error' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      }
    },
    checkIfEmployee() {
      if (this.userData && this.userData.workplaces && this.userData.workplaces.length) {
        return this.userData.workplaces.some(id => +this.$attrs.id === id);
      }
      return false;
    },
    checkIfManager() {
      if (this.icecreamShopData && this.icecreamShopData.owner_id) {
        return this.icecreamShopData.owner_id === this.userId;
      }
      return false;
    },
    async handleAddPost() {
      const data = {
        icecreamShopId: +this.$attrs.id,
        content: this.newPost,
      };
      const response = await createPost(data);
      if (response) {
        this.icecreamShopData = await fetchIcecreamShop(this.$attrs.id);
      } else {
        const notification = { message: 'Wystąpił błąd', type: 'error' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      }
    },
    async handleAddPostComment(target, postId) {
      const ref = target;
      const { value } = target;
      const data = {
        postId,
        content: value,
      };
      const result = await addPostComment(data);
      if (result) {
        ref.value = '';
        this.icecreamShopData = await fetchIcecreamShop(this.$attrs.id);
      } else {
        const notification = { message: 'Wystąpił błąd', type: 'error' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      }
    },
    async handleAddOpinion() {
      const data = {
        icecreamShopId: +this.$attrs.id,
        content: this.newOpinion,
        grade: +this.newOpinionGrade,
      };
      const response = await addOpinion(data);
      if (response) {
        this.icecreamShopData = await fetchIcecreamShop(this.$attrs.id);
      } else {
        const notification = { message: 'Wystąpił błąd', type: 'error' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      }
    },
    async handleAddOpinionComment(target, opinionId) {
      const ref = target;
      const { value } = target;
      const data = {
        opinionId,
        content: value,
      };
      const result = await addOpinionComment(data);
      if (result) {
        ref.value = '';
        this.icecreamShopData = await fetchIcecreamShop(this.$attrs.id);
      } else {
        const notification = { message: 'Wystąpił błąd', type: 'error' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      }
    },
    async handleRateFlavour(reaction, flavourId, selected) {
      if (this.userType === 1) {
        const data = {
          flavourId,
        };
        let result = null;
        if (selected) {
          result = await removeFlavourReaction(data);
        } else {
          data.reactionType = reaction;
          result = await addFlavourReaction(data);
        }
        if (result) {
          this.icecreamShopData = await fetchIcecreamShop(this.$attrs.id);
        } else {
          const notification = { message: 'Wystąpił błąd', type: 'error' };
          this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
        }
      }
    },
    async handleAddFlavour() {
      const data = {
        icecreamShopId: +this.$attrs.id,
        name: this.newFlavourName,
        composition: this.newFlavourComposition,
        status: +this.newFlavourStatus,
        hashtags: this.newFlavourHashtags.split(',').map(hashtag => hashtag.replace(/#/, '').trim()),
      };
      const result = await addFlavour(data);
      if (result) {
        this.icecreamShopData = await fetchIcecreamShop(this.$attrs.id);
      } else {
        const notification = { message: 'Wystąpił błąd', type: 'error' };
        this.$store.dispatch('notifications/pushNotification', { notification, timeout: 1000 });
      }
    },
    parseReactions(reactions) {
      const r = reactions
        .reduce((prev, curr) => {
          const newPrev = prev;
          if (curr.user_id === this.userId) {
            newPrev.selected = curr.reaction_type;
          }
          switch (curr.reaction_type) {
            case 1:
              newPrev.hateIt += 1;
              break;
            case 2:
              newPrev.mehIt += 1;
              break;
            case 3:
              newPrev.loveIt += 1;
              break;
            default:
          }
          return newPrev;
        }, {
          hateIt: 0,
          mehIt: 0,
          loveIt: 0,
          selected: 0,
        });
      return [
        { display: `${r.hateIt}🤢`, value: 1, selected: r.selected === 1 },
        { display: `${r.mehIt}🥱`, value: 2, selected: r.selected === 2 },
        { display: `${r.loveIt}😍`, value: 3, selected: r.selected === 3 },
      ];
    },
  },
  components: {
    BasicButton,
  },
};
</script>

<style lang="scss">
@import './view-shop-styles.scss';
</style>
