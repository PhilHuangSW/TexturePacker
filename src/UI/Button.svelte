<script>
  export let tooltip = null;
  export let style = "";
  export let mode = "";
</script>

<button on:click data-tooltip={tooltip} {style} class={mode}>
  <slot />
</button>

<style>
  button {
    font: inherit;
    border: 1px solid rgb(0, 93, 58);
    background: rgb(0, 93, 58);
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.26);
    cursor: pointer;
    text-decoration: none;
    width: 10rem;
  }

  button:focus {
    outline: none;
  }

  button:hover,
  button:active {
    background: rgb(0, 119, 73);
    border-color: rgb(0, 119, 73);
    box-shadow: 1px 1px 8px rgba(77, 51, 51, 0.26);
  }

  .outline {
    background: transparent;
    color: rgb(0, 93, 58);
    box-shadow: none;
  }

  .outline:hover,
  .outline:active {
    background: rgb(174, 235, 211);
    box-shadow: none;
  }

  .failure {
    border: 1px solid rgb(175, 1, 24);
    background: rgb(175, 1, 24);
  }

  .failure:hover,
  .failure:active {
    background: rgb(211, 3, 31);
    border-color: rgb(211, 3, 31);
    box-shadow: 1px 1px 8px rgba(77, 51, 51, 0.26);
  }
</style>
