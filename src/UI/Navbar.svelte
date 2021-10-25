<script>
  export let title;
</script>

<!-- Simple navbar, unfortunately with the anchor tag, it renders the ENTIRE navbar as a link -->
<nav>
  <a href="/" class="inner">
    {title}
  </a>
</nav>
<div class="navbar-padding" />

<style>
  nav {
    background-color: rgb(0, 93, 58);
    font-family: "Anton", "Helvetica", "Arial", sans-serif;
    height: 3rem;
    font-size: 1.5rem;
  }

  .inner {
    justify-content: flex-end;
    padding-left: 20px;
    padding-right: 20px;
    margin: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 100%;
    color: white;
    text-decoration: none;
  }

  .navbar-padding {
    padding-bottom: 1rem;
  }
</style>
