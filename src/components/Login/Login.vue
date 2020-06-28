<template >
  <div class="Login--Container">
    <img class="Login--Logo" width="300" src="../../assets/logo.png" />
    <b-field class="Login--Input" label="Username">
      <b-input type="text" v-model="login_info['username']"></b-input>
    </b-field>
    <b-field class="Login--Input" label="Password">
      <b-input type="password" v-model="login_info['password']" password-reveal></b-input>
    </b-field>
    <b-button
      class="Login--Submit"
      rounded
      size="is-medium"
      type="is-success"
      v-on:click="postLogin"
    >Login</b-button>
  </div>
</template>

<script>
import { ACCESS_CONTROL } from "../../definitions.js";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      // Initalize login data to empty strings
      login_info: {
        username: "",
        password: ""
      },
      // Import global ACCESS_CONTROL to update based on permissions given from backend
      ACCESS_CONTROL
    };
  },
  methods: {
    postLogin() {
      // Send login input data to backend.
      //  On success, show success toast.
      //  On failure, show failure toast.
      axios
        .post(
          `https://pra-tracking-dev.herokuapp.com/api/login`,
          JSON.stringify(this.login_info),
          {
            headers: { "Content-type": "application/json" }
          }
        )
        .then(response => {
          if (response.status == 200) {
            ACCESS_CONTROL["access"] = response.data.access;
            this.alertLoginSuccess();
          } else {
            this.alertLoginFailure();
          }
        })
        .catch(() => {
          this.alertLoginFailure();
        });
    },
    alertLoginSuccess() {
      this.$buefy.toast.open({
        message: "Successfully logged in",
        type: "is-success",
        duration: 5000,
        position: "is-bottom"
      });
    },
    alertLoginFailure() {
      this.$buefy.toast.open({
        message: "Incorrect login information",
        type: "is-danger",
        duration: 5000,
        position: "is-bottom"
      });
    }
  }
};
</script>

<style>
.Login--Container {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  text-align: center;
  width: 100vw;
}

.Login--Logo {
  margin-top: -2rem;
  margin-bottom: -2rem;
}

.Login--Input {
  width: 450px;
}

.Login--Submit {
  margin-top: 2rem;
}
</style>