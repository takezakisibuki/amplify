<script setup>
import { ref } from 'vue'

const cards = ref([
  {
    title: 'アプリを爆速で開発 ! AWS Amplify Studio で出来ること。',
    src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
    flex: 4,
    link: 'https://aws.amazon.com/jp/builders-flash/202203/amplify-studio-flash-development/?awsf.filter-name=*all'
  },
  {
    title: 'AWS Amplify 公式ドキュメント',
    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
    flex: 4,
    link: 'https://docs.amplify.aws/'
  },
  {
    title: 'AWS Amplify のツール、チュートリアル、記事などのリンク集',
    src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
    flex: 4,
    link: 'https://github.com/aws-amplify-jp/awesome-aws-amplify-ja'
  }
])
</script>

<template>
  <v-img
    src="https://ws-assets-prod-iad-r-nrt-2cb4b4649d0e0f94.s3.ap-northeast-1.amazonaws.com/24243f60-ca19-4422-8a38-1b3463d34b4b/banner.png"
  />

  <v-card class="mx-auto">
    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card>
            <v-img
              :src="card.src"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
              <v-card-title class="text-white" v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                size="small"
                color="surface-variant"
                variant="text"
                icon="mdi-bookmark"
                :href="card.link"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
