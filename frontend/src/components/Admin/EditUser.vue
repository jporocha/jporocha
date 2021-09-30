<template>
  <div>
    <v-card>
      <v-card-title>Cliente</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="client.name"
            outlined
            dense
            label="Nome do usuário"
          ></v-text-field>
          <v-text-field
            v-model="client.email"
            outlined
            dense
            label="E-mail de login"
          ></v-text-field>
          <v-divider class="mb-6"></v-divider>
          <v-text-field
            outlined
            dense
            label="CNPJ"
            v-model="client.cnpj"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="Inscrição estadual"
            v-model="client.inscricao"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="Razão social"
            v-model="client.razaoSocial"
          ></v-text-field>
          <v-divider class="mb-6"></v-divider>
          <v-select
            v-model="selectedAddr"
            :items="client.addr"
            item-text="nome"
            item-value="index"
            label="Endereço"
            no-data-text="Não há endereço cadastrado."
            dense
            outlined
            filled
            append-outer-icon="mdi-plus"
            @click:append-outer="insertAddr"
            @change="loadAddr"
          ></v-select>
          <section v-if="selectedAddr">
            <v-row>
              <v-col class="mb-n4 pb-0 col-8"
                ><v-text-field
                  outlined
                  dense
                  label="Nome"
                  v-model="selectedAddr.nome"
                ></v-text-field
              ></v-col>
              <v-col class="mb-n4 pb-0 col-2">
                <v-btn icon @click="mainAddress">
                  <v-icon
                    :color="addrIndex === client.mainAddress ? 'red' : 'blue'"
                    >mdi-star-outline</v-icon
                  >
                </v-btn>
              </v-col>
              <v-col class="mb-n4 pb-0 col-2">
                <v-btn icon @click="removeAddress">
                  <v-icon color="orange">mdi-trash-can</v-icon>
                </v-btn>
              </v-col>
              <v-col class="mb-n4 pb-0 col-12"
                ><v-text-field
                  outlined
                  dense
                  label="Rua"
                  v-model="selectedAddr.rua"
                ></v-text-field
              ></v-col>
              <v-col class="mb-n4 pb-0 col-4"
                ><v-text-field
                  outlined
                  dense
                  label="Número"
                  v-model="selectedAddr.numero"
                ></v-text-field
              ></v-col>
              <v-col class="mb-n4 pb-0 col-8"
                ><v-text-field
                  outlined
                  dense
                  label="Complemento"
                  v-model="selectedAddr.complemento"
                ></v-text-field
              ></v-col>
              <v-col class="mb-n4 pb-0 col-6"
                ><v-text-field
                  outlined
                  dense
                  label="Bairro"
                  v-model="selectedAddr.bairro"
                ></v-text-field
              ></v-col>
              <v-col class="mb-n4 pb-0 col-6"
                ><v-text-field
                  outlined
                  dense
                  label="CEP"
                  v-model="selectedAddr.cep"
                ></v-text-field
              ></v-col>
              <v-col class="mb-n4 pb-0 col-9"
                ><v-text-field
                  outlined
                  dense
                  label="Cidade"
                  v-model="selectedAddr.cidade"
                ></v-text-field
              ></v-col>
              <v-col class="mb-n4 pb-0 col-3"
                ><v-text-field
                  outlined
                  dense
                  label="Estado"
                  v-model="selectedAddr.estado"
                ></v-text-field
              ></v-col>
            </v-row>
          </section>
          <v-divider class="my-6"></v-divider>
          <v-select
            v-model="selectedContact"
            :items="client.contatos"
            item-text="nome"
            item-value="index"
            label="Contatos"
            no-data-text="Não há contato cadastrado."
            dense
            outlined
            filled
            append-outer-icon="mdi-plus"
            @click:append-outer="insertContact"
            @change="loadContact"
          ></v-select>
          <section v-if="selectedContact">
            <v-row>
              <v-col class="mb-n4 pb-0 col-8"
                ><v-text-field
                  outlined
                  dense
                  label="Nome"
                  v-model="selectedContact.nome"
                ></v-text-field
              ></v-col>
              <v-col class="mb-n4 pb-0 col-2">
                <v-btn icon @click="mainContact">
                  <v-icon
                    :color="
                      contactIndex === client.mainContact ? 'red' : 'blue'
                    "
                    >mdi-star-outline</v-icon
                  >
                </v-btn>
              </v-col>
              <v-col class="mb-n4 pb-0 col-2">
                <v-btn icon @click="removeContact">
                  <v-icon color="orange">mdi-trash-can</v-icon>
                </v-btn>
              </v-col>
              <v-col class="mb-n4 pb-0 col-12"
                ><v-text-field
                  outlined
                  dense
                  label="Cargo"
                  v-model="selectedContact.position"
                ></v-text-field
              ></v-col>
              <v-col class="mb-n4 pb-0 col-12 col-md-4"
                ><v-text-field
                  outlined
                  dense
                  label="Telefone"
                  v-model="selectedContact.phone"
                ></v-text-field
              ></v-col>
              <v-col class="mb-n4 pb-0 col-12 col-md-8"
                ><v-text-field
                  outlined
                  dense
                  label="E-mail"
                  v-model="selectedContact.email"
                ></v-text-field
              ></v-col>
            </v-row>
          </section>
          <v-divider class="mt-6 mb-4"></v-divider>
          <v-card-actions class="d-flex">
            <v-btn small color="red" @click="closeUser">Fechar</v-btn>
            <v-spacer></v-spacer>
            <v-btn small color="green" @click="saveUser">Salvar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
    <v-dialog max-width="500" v-model="dialog">
      <v-card>
        <v-card-title>{{ cardTitle }}</v-card-title>
        <v-card-text class="text-justify">{{ cardText }}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          ><v-btn small color="red" @click="dialog = false">Cancelar</v-btn
          ><v-spacer></v-spacer
          ><v-btn small color="green" @click="execAction"
            >Confirmar</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["user"],
  data() {
    return {
      selectedAddr: null,
      addrIndex: -1,
      selectedContact: null,
      contactIndex: -1,
      client: {
        cnpj: "",
        inscricao: "",
        razaoSocial: "",
        mainAddress: -1,
        mainContact: -1,
        addr: [],
        contatos: [],
      },
      dialog: false,
      cardTitle: "",
      cardText: "",
      action: "",
    };
  },
  methods: {
    insertAddr() {
      this.client.addr.push({
        nome: "Novo endereço",
        index: this.client.addr.length,
      });
      this.selectedAddr = this.client.addr[this.client.addr.length - 1];
    },
    loadAddr(ev) {
      this.addrIndex = ev;
      this.selectedAddr = this.client.addr[ev];
    },
    insertContact() {
      this.client.contatos.push({
        nome: "Novo contato",
        index: this.client.contatos.length,
      });
      this.selectedContact =
        this.client.contatos[this.client.contatos.length - 1];
    },
    loadContact(ev) {
      this.contactIndex = ev;
      this.selectedContact = this.client.contatos[ev];
    },
    mainContact() {
      this.client.mainContact = this.contactIndex;
    },
    mainAddress() {
      this.client.mainAddress = this.addrIndex;
    },
    removeAddress() {
      this.cardTitle = "Remover endereço?";
      this.cardText =
        "Tem certeza que deseja remover o endereço atual do cadastro?";
      this.action = "removeAddr";
      this.dialog = true;
    },
    removeContact(ev) {
      this.cardTitle = "Remover contato?";
      this.cardText =
        "Tem certeza que deseja remover o contato atual do cadastro?";
      this.action = "removeContact";
      this.dialog = true;
    },
    execAction() {
      if (this.action === "removeContact") {
        this.client.contatos.splice(this.contactIndex, 1);
        if (this.client.contatos.length)
          this.selectedContact = this.client.contatos[0];
      } else {
        this.client.addr.splice(this.addrIndex, 1);
        if (this.client.addr.length) this.selectedAddr = this.client.addr[0];
      }
      this.dialog = false;
    },
    saveUser() {
      let method = this.client._id ? "put" : "post";
      let address = this.client._id ? this.client._id : "adminUser";
      axios[method](`/users/${address}`, this.client)
        .then((res) => {
          this.$root.vtoast.show({
            color: "green",
            message: res.data,
          });
          this.$emit("close", true);
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
          });
        });
    },
    closeUser() {
      this.$emit("close", false);
    },
  },
  mounted() {
    if (this.user) {
      this.client = this.user;
      if (this.client.mainAddress >= 0) {
        this.selectedAddr = this.client.addr[this.client.mainAddress];
        this.addrIndex = this.client.mainAddress;
      } else {
        if (this.client.addr.length) this.selectedAddr = this.client.addr[0];
      }
      if (this.client.mainContact >= 0) {
        this.selectedContact = this.client.contatos[this.client.mainContact];
        this.contactIndex = this.client.mainContact;
      } else {
        if (this.client.contatos.length)
          this.selectedContact = this.client.contatos[0];
      }
    }
  },
};
</script>

<style scoped>
</style>