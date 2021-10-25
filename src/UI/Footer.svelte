<script>
  export let footerInformation;
</script>

<footer>
  <p class="inner">{footerInformation}</p>
</footer>

<style>
  footer {
    background-color: rgb(0, 93, 58);
    font-family: "Anton", "Helvetica", "Arial", sans-serif;
    height: 1.2rem;
    font-size: 0.8rem;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
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
</style>
