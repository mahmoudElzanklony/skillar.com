<template>
  <div class="chat current_page">
    <div class="container mt-4 mb-4" v-if="Object.keys($parent?.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <div class="outer">
         <div class="outer-heading">
            <h2 class="mb-0">{{ $parent.$attrs.words.chat.messager }}</h2>
            <div class="d-flex justify-content-between" v-if="false">
              <p class="mb-0">
                <nuxt-link to="/chat?type=all" class="gray">{{ $parent.$attrs.words.chat.total_messages }}</nuxt-link>
                <nuxt-link to="/chat?type=all">420</nuxt-link> ,
                <nuxt-link to="/chat?type=unseen" class="gray">{{ $parent.$attrs.words.chat.unseen_messages }}</nuxt-link>
                <nuxt-link to="/chat?type=unseen">10</nuxt-link>
              </p>
              <nuxt-link to="#">{{ $parent.$attrs.words.chat.contact_support }}</nuxt-link>
            </div>
         </div>
         <div class="outer-body">
            <div class="col-lg-4">
              <div class="friends">
                <div class="form-group input-icon">
                  <input class="form-control"
                         @keyup="searchUserAction"
                         :placeholder="$parent.$attrs.words.chat.search_friend">
                  <span><i class="bi bi-search"></i></span>
                </div>
                <ul>
                  <li class="d-flex flex-wrap align-items-center cursor-pointer p-1"
                      v-for="(i,index) in friends"
                      @click="get_messages(i?.hasOwnProperty('receiver') ? i : {receiver_id:i.id,conversation_id:null}); getImageName(i)"
                      :key="index">
                    <image-component v-if="i?.receiver" :src="'https://cvapi.skillar.com/images/users/'+current_image"></image-component>
                    <image-component v-else :src="'https://cvapi.skillar.com/images/users/'+i.image?.name"></image-component>
                    <div class="message_info">
                      <p class="mb-0 fw-bold" v-if="i?.hasOwnProperty('receiver')">{{ (i?.receiver?.id == $auth.state?.user?.id) ? i?.sender?.username : i?.receiver?.username }}</p>
                      <p class="mb-0 fw-bold" v-else>{{ i?.username }}</p>
                      <p class="gray" v-if="i?.hasOwnProperty('receiver')">{{ i?.message }}</p>
                      <p class="gray" :title="i?.bio" v-else>{{ i?.bio?.slice(0,15) }}</p>
                    </div>
                    <strong>{{ i?.published_at }}</strong>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-8">
               <div class="chat-info" v-if="messages?.receiver">
                 <div class="chat-header p-1 d-flex align-items-center" >
                   <image-component :src="'https://cvapi.skillar.com/images/users/'+current_image"></image-component>
                    <div>
                       <p class="fw-bold mb-0">{{ messages?.receiver?.username }}</p>
                       <p class="gray mb-0" :title="messages?.receiver?.bio">{{ (messages?.receiver?.bio?.slice(0,40) ?? '') + (messages?.receiver?.bio?.length > 40 ? '......':'') }}</p>
                    </div>
                 </div>
                 <div class="chat-body">
                    <div :class="'d-flex align-items-center '+(i?.sender_id === $auth?.state?.user?.id ? 'sender':'receiver')"
                         v-for="(i,index) in messages?.messages" :key="index"
                         v-if="messages?.messages">
                      <image-component
                        v-if="i?.sender_id !== $auth?.state?.user?.id"
                        :src="'https://cvapi.skillar.com/images/users/'+messages?.receiver?.image?.name"></image-component>
                       <p :class="'flex-auto '+(i?.sender_id !== $auth?.state?.user?.id ? 'mb-0':'mb-1')">
                         <span v-tooltip="i?.created_at">{{ i?.message }}</span>
                       </p>
                    </div>
                 </div>
                 <div class="chat-footer">
                   <form
                      @submit.prevent="send_message"
                     class="position-relative form-has-submit-absolute">
                     <input type="hidden" name="conversation_id"
                            :value="messages?.messages[0]?.conversation_id"
                            v-if="messages?.messages.length > 0">
                     <input type="hidden" name="receiver_id"
                            :value="messages?.receiver?.id"
                            v-if="messages?.receiver">
                     <input class="form-control"
                            style="padding: 10px"
                            name="message"
                            :placeholder="$parent.$attrs.words.chat.your_message">
                     <input type="submit" class="btn btn-primary absolute-submit" :value="$parent.$attrs.words.chat.send">
                   </form>
                 </div>
               </div>
              <div v-else class="text-center d-flex flex-wrap align-items-center justify-content-center">
                <img class="d-block m-auto mb-2 mt-2" style="height: 350px" src="/images/start_chat.gif">
                <h2 class="text-center">{{ $parent.$attrs.words.chat.start_send_receive_messages }}</h2>
              </div>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import WordsLang from "../mixins/WordsLang";
import {mapActions , mapGetters} from "vuex";

export default {
  name: 'chat',
  mixins:[WordsLang],
  data:function (){
    return {
       current_image:null
    }
  },
  computed:{
    ...mapGetters({
      'friends':'chat/get_data',
      'messages':'chat/get_messages'
    })
  },
  methods:{
    ...mapActions({
      'get_friends':'chat/getFriendsAction',
      'get_messages':'chat/getMessagesAction',
      'send_message':'chat/sendMessageAction',
      'searchUserAction':'chat/searchUserAction'
    }),
    getImageName(i){
      if(i.hasOwnProperty('image')){
        this.current_image = i?.image?.name;
      }else {
        this.current_image = i[i?.receiver?.id === this.$auth.state?.user?.id ? 'sender' : 'receiver']?.image?.name;
      }
      return this.current_image
    }
  },
  mounted() {
    this.get_friends()
  },
}
</script>

<style lang="scss">
@import "~style/variables";

.chat{
  .outer{
    border: 1px solid #dddddd;
    border-radius: 8px;
    .outer-heading{
      padding: 10px;
      border-bottom: 1px solid #dddddd;
      background-color: $main_color_more_white_bk;
    }
    .outer-body{
      display: flex;
      flex-wrap: wrap;
      .friends{
        padding: 5px;
        max-height: 500px;
        overflow: auto;
        height: 100%;
        ul{
          li{
            position: relative;
            &:not(:last-of-type){
              border-bottom: 1px solid #dddddd;
              >span{
                display: none;
              }
            }
            img{
              height: 60px;
              max-width: 60px;
              border-radius: 4px;
            }
            div{
              width:calc(100% - 111px);
              p{
                margin-bottom: 0px;
              }
            }
            >span{
              background-color: $main_color;
              color:white;
              padding: 3px 10px;
              border-radius: 4px;
            }
            >strong{
              font-weight: normal;
              position: absolute;
              color:$gray;
              font-size: $small;
              bottom: 4px;
            }
          }
        }
      }
      .chat-info{
        position: relative;
        height: 100%;
        .chat-header{
          img{
            width: 60px;
          }
          border-bottom: 1px solid #dddddd;
        }
        .chat-body{
          padding: 10px;
          max-height: 400px;
          overflow: auto;
          margin-bottom: 46px;
          >div {
            margin-bottom: 10px;
            p{
              position: relative;
              span{
                position: relative;
                padding: 3px 6px;
                border-radius: 4px;
                background-color: white;
                display: inline-block;
                border: 1px solid $main_color_white_bk;
              }
            }
            img {
              height: 40px;
              border-radius: 4px;
            }
          }
          .sender{
            span{
              background-color: $main_color_more_white_bk;
            }
          }
          .receiver{
            span::before{
              content: '';
              border: 1px solid transparent;
              border-right: 1px solid $main_color_white_bk;
              border-bottom: 1px solid $main_color_white_bk;
              width: 10px;
              height: 10px;
              background-color: white;
              position: absolute;
              top: 9px;
            }
          }
        }
        .chat-footer{
          position: absolute;
          bottom: 0;
          width: 100%;
          form{
            input:first-of-type{
              border-radius: 0px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .outer-body{
    >div{
      width: 100%;
    }
    >div:last-of-type{
      >div:first-of-type{
        border-top:1px solid #dddddd;
      }
    }
  }
}
</style>
