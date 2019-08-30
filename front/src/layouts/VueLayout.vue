<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">BiasUncovered</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
            <b-nav-item>
              <router-link to="/">New Analysis</router-link>
            </b-nav-item>
             <b-nav-item>
              <router-link to="/analysis">All Analysis</router-link>
            </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <div>
     <br/>
  </div>
  <b-container> 
    <router-view></router-view>
   </b-container>
</div>
</template>

<script>
export default {
}
</script>