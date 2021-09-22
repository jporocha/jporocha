<template>
  <div>
    <v-data-table
      :headers="messageHeader"
      :items="messages"
      :expanded.sync="expanded"
      show-expand
      dense
      single-expand
      item-key="_id"
      class="elevation-1"
      :loading="loading"
      loading-text="Carregando mensagens..."
      no-data-text="Não há mensagens a exibir..."
      :items-per-page="5"
      :footer-props="{
        'items-per-page-all-text': 'Todas',
        'items-per-page-text': 'Mensagens por página:',
        'items-per-page-options': [5, 10, 15, -1],
      }"
      :header-props="{
        'sort-by-text': 'Organizar por',
      }"
    >
      <template v-slot:[`item._id`]="{ item }">
        {{ convertToDate(item._id) }}
      </template>
      <template v-slot:[`item.read`]="{ item }">
        <v-btn icon @click="markAnswered(item._id)"
          ><v-icon small :color="iconColor(item.read)"
            >mdi-email-check</v-icon
          ></v-btn
        >
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="my-2" v-html="adjustText(item)"></div>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    messageHeader() {
      let headers = [
        { text: "Recebida em", value: "_id", sortable: true },
        {
          text: "Lida?",
          value: "read",
          sortable: true,
        },
        { text: "Visualizar", value: "data-table-expand", sortable: false },
      ];
      if (window.innerWidth > 600)
        headers.splice(1, 0, {
          text: "Enviada por",
          value: "sentBy",
          sortable: false,
        });
      if (window.innerWidth > 960)
        headers.splice(2, 0, {
          text: "E-mail",
          value: "email",
          sortable: false,
        });
      return headers;
    },
  },
  data() {
    return {
      messages: [],
      expanded: [],
      loading: true,
    };
  },
  methods: {
    FetchMessages() {
      axios
        .get("/message")
        .then((res) => {
          this.messages = res.data.msg;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err.data);
          this.loading = false;
        });
    },
    markAnswered(item) {
      let index = this.messages.findIndex((el) => el._id === item);
      this.messages[index].read = !this.messages[index].read;
      axios
        .put(`/message/${item}`, { read: this.messages[index].read })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertToDate(id) {
      return new Date(
        parseInt(id.toString().substring(0, 8), 16) * 1000
      ).toLocaleString("pt-br");
    },
    iconColor(status) {
      return status ? "color2" : "grey";
    },
    adjustText(item) {
      return `<strong>Mensagem: </strong><br/>${item.content.replace(
        "\n",
        "<br />"
      )}<br />${item.sentBy}<br /><br /><strong>Telefone:</strong> ${
        item.phone
      }<br /><strong>Email:</strong> ${item.email}<br />`;
    },
  },
  mounted() {
    this.FetchMessages();
  },
};
</script>

<style scoped>
</style>