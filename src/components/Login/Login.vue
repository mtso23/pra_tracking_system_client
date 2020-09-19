<template>
  <div class="Login--Container">
    <img class="Login--Logo" width="300" src="../../assets/logo.png" />
    <form>
      <b-field class="Login--Input" label="Username">
        <b-input type="text" v-model="login_info['username']"></b-input>
      </b-field>
      <b-field class="Login--Input" label="Password">
        <b-input
          type="password"
          v-model="login_info['password']"
          password-reveal
        ></b-input>
      </b-field>
      <b-button
        class="Login--Submit"
        roundedbuefy
        size="is-medium"
        type="is-success"
        v-on:click="postLogin"
        native-type="button"
        >Login</b-button
      >
    </form>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../config";

export default {
  name: "Login",
  data() {
    return {
      // Initalize login data to empty strings
      login_info: {
        username: "",
        password: "",
      },
      // Import global ACCESS_CONTROL to update based on permissions given from backend
      config,
    };
  },
  methods: {
    async postLogin() {
      // Send login input data to backend.
      //  On success, show success toast.
      //  On failure, show failure toast.
      try {
        const response = await axios.post(
          config.LOGIN_URL,
          JSON.stringify(this.login_info),
          {
            headers: { "Content-type": "application/json" },
          }
        );

        if (response.status === 200) {
          config.ACCESS_CONTROL = response.data.access;
          localStorage.setItem("access", response.data.access);
          // Expire in two weeks
          const expiryDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
          localStorage.setItem("expiry", expiryDate.toUTCString());
          this.alertLoginSuccess();
        } else {
          throw new Error("Received non-200 status code from server on login");
        }
      } catch (err) {
        this.alertLoginFailure();
      }
    },
    alertLoginSuccess() {
      this.$buefy.toast.open({
        message: "Successfully logged in",
        type: "is-success",
        duration: 5000,
        position: "is-bottom",
      });
    },
    alertLoginFailure() {
      this.$buefy.toast.open({
        message: "Incorrect login information",
        type: "is-danger",
        duration: 5000,
        position: "is-bottom",
      });
    },
  },
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
