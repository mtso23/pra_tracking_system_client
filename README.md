# pra_tracking_system_client

PRA tracking system for MDH

To run locally, navigate to the root of the project and run `npm run serve`. The site will then be available at `http://localhost:8080`.

## Component layout

The root Vue component is the App.vue App.

Each Vue component has three parts that declared within a single _Component_.vue file:

1. template - between the `<template> </template>` tags

- this has the html template for the component
- we rely heavily on Buefy elements in our templates as they are pre-styled
- **it can access data from the component that has been registered in the script's data property**
- sometimes within a `<component>` tag you will see `v-if` or `v-for`. These are called [directives.](https://vuejs.org/v2/guide/conditional.html) It will render the component 'if' a condition is met or 'for' as many times as specified.
- if a component has `:prop=dataValue`, we are binding the prop to a piece of data, so if one changes, so does the other

2. script - between the `<script> </script>` tags

- this holds any Javascript for the component
- import any neccessary components or files
- https://vuejs.org/v2/guide/components.html for more information
- declare and xport the component as shown below. The component is considered an object,
  with a few key propreties: name, components, **data**, methods, mounted, and other possible Vue component properties

```export default {
    name: *name of component*,
    components: {
        *any sub-components rendered within this component's template*
    }
    data() {
        *declare any data that will be used throughout the template of script*
        *in the form of an object where each key is the name of the data item, and the value is the item's initial value*
    },
    methods: {
        *declare any methods that are used within the component*
    },
    mounted () {
        *any actions that need to be run when the component mounts*
        *for example, in Table.vue we fetch the table data when the component mounts*
    }
    *other possibly lifecycle methods*
}
```

3. css styling - between the `<style> </style>` tags

- this holds the css for the template described above
- works the same as any normal .css file

### Our component tree is:

- App
  - Login
  - RouterView
    - Home
      - Header
      - Table
    - Form

## Files and components

### main.js

- entrypoint for the website
- registers the Vue components that/libraries are needed within the app (Buefy, JsonCSV, VueRouter)
  - Buefy: component/design library used throughout the app with great documentation
    - https://buefy.org/documentation/table
  - JsonCSV: npm package used to handle exporting data as a csv
    - https://www.npmjs.com/package/vue-json-csv
  - VueRouter: router to handle page routing based on url
    - https://router.vuejs.org/guide/#html
- loads the app from App.vue
- registers the routes (Home, Form) based on url to the VueRouter

### App

- this is the container for the Vue app
- it has Login and RouterView as subcomponents, conditionally rendering based on if the user has logged in as tracked in the `ACCESS_CONTROL` object
- declares custom styling for Buefy

### Login

- this renders if the user is not authenticated

### RouterView

- this renders the proper component based on current url path, if the user is authenticated

### Home

- simple component that has the Header on top, and the Table underneath

### Header

- header is composed of the logo and a b-navbar (buefy navbar)
- b-navbar links to Home, Create (new form), and Logout (simply refreshes page to clear ACCESS_CONTROL)

```

```
