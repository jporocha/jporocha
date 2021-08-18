<template>
  <div class="mt-2">
    <v-row class="d-flex justify-center">
      <image-view
        imgName="logo.png"
        imgcols="col-md-12 d-flex justify-center"
      />
    </v-row>

    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-row>
          <text-view :componentText="sampleText" />
          <image-view imgName="2.jpg" />
          <text-view :componentText="sampleText" />
          <image-view imgName="3.jpg" />
          <text-view :componentText="sampleText" />
          <image-view imgName="1.jpg" />
        </v-row>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
    <v-row class="black d-flex justify-center mt-2">
      <BottomBar />
    </v-row>
  </div>
</template>

<script>
import ImageView from "@/components/ImageView";
import TextView from "@/components/TextView";
import BottomBar from "@/components/Bottombar";

export default {
  components: {
    ImageView,
    TextView,
    BottomBar,
  },
  data() {
    return {
      sampleText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum in est sed hendrerit. Fusce convallis mollis nisi in placerat. Nullam efficitur nisi sit amet turpis eleifend, id ullamcorper ligula faucibus. Fusce convallis odio ac est suscipit rutrum. Curabitur pharetra erat rutrum, eleifend odio a, malesuada ex. Curabitur dignissim elementum tortor tincidunt facilisis. Aliquam non laoreet diam, vehicula aliquam diam. Vestibulum purus sapien, congue at malesuada sed, ornare molestie tortor. Mauris euismod ligula a nisi pretium, vitae auctor ante convallis. Quisque ultricies nisi nunc, id bibendum dolor tristique at. Donec iaculis, lacus tristique venenatis rhoncus, augue dui vestibulum nulla, quis facilisis erat eros nec neque.",
    };
  },
};
</script>
