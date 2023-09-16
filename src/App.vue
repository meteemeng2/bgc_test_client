<template>
  <div id="app">
    <div class="container">
      <OrdersTable />
    </div>
  </div>
</template>

<script>
import OrdersTable from './components/OrdersTable.vue'

export default {
  name: 'App',
  components: {
    OrdersTable
  }
}
</script>
