<script>
  export let tooltip = "";
  export let labelFor = "";
  export let value = 0;
  export let min = 1;
  export let disabled = null;
</script>

<div data-tooltip={tooltip}>
  <label for={labelFor}>
    <!-- <Input> 
      ((whatever you want here) <===> <slot />) 
    </Input> -->
    <slot />
  </label>
  <input {value} {min} {disabled} type="number" on:input on:change />
</div>

<style>
  :disabled {
    color: black;
  }
</style>
