<script>
  export let tooltip = "";
  export let labelFor = "";
  export let value = 0;
  export let min = 1;
</script>

<div data-tooltip={tooltip}>
  <label for={labelFor}>
    <!-- <Input> 
      ((whatever you want here) <===> <slot />) 
    </Input> -->
    <slot />
  </label>
  <input {value} {min} type="number" on:input on:change />
</div>
