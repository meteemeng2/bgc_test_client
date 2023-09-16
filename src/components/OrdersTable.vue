<template>
  <div>
    <h1>Order Management</h1>

    <!-- Search Form -->
    <form @submit.prevent="searchOrders">
      <div class="container mt-4">
        <div class="row">
          <div class="col-md-2">
            <div class="form-group">
              <label for="dateSelection">Date Selection:</label>
              <div class="form-check">
                <input type="radio" class="form-check-input" id="specificDate" v-model="dateSelection" value="specific"
                  @change="clearDateFields" />
                <label class="form-check-label" for="specificDate">Specific Date</label>
              </div>
              <div class="form-check">
                <input type="radio" class="form-check-input" id="dateRange" v-model="dateSelection" value="range"
                  @change="clearDateFields" />
                <label class="form-check-label" for="dateRange">Date Range</label>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="dateSelection === 'range'">
          <div class="col-md-6">
            <div class="form-group">
              <label for="startDate" class="control-label">Start Date:</label>
              <input v-model="search.startDate" type="date" class="form-control" id="startDate">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="endDate">End Date:</label>
              <input v-model="search.endDate" type="date" class="form-control" id="endDate">
            </div>
          </div>
        </div>
        <div class="row" v-if="dateSelection === 'specific'">
          <div class="col-md-6">
            <div class="form-group">
              <label for="startDate">Order Date:</label>
              <input v-model="search.orderDate" type="date" class="form-control" id="startDate">
            </div>
          </div>
          <div class="col-md-6">
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="region">Region:</label>
              <input v-model="search.region" type="text" class="form-control" id="region" placeholder="Enter Region">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="city">City:</label>
              <input v-model="search.city" type="text" class="form-control" id="city" placeholder="Enter City">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="category">Category:</label>
              <input v-model="search.category" type="text" class="form-control" id="category"
                placeholder="Enter Category">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="product">Product:</label>
              <input v-model="search.product" type="text" class="form-control" id="product" placeholder="Enter Product">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="quantity">Quantity:</label>
              <input v-model="search.quantity" type="number" class="form-control" id="quantity"
                placeholder="Enter Quantity">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="unitPrice">Unit Price:</label>
              <input v-model="search.unitPrice" type="number" class="form-control" id="unitPrice"
                placeholder="Enter Unit Price">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="totalPrice">Total Price:</label>
              <input v-model="search.totalPrice" type="number" step="0.01" class="form-control" id="totalPrice"
                placeholder="Enter Total Price">
            </div>
          </div>
          <div class="col-md-6">
            <!-- You can add more input fields here if needed -->
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">
            <button type="button" class="btn btn-success" @click="openOrderModal(null)">Add</button>
            <button type="submit" class="btn btn-primary">Search</button>
          </div>
        </div>
      </div>
    </form>


    <!-- Table to Display Orders -->
    <table class="table table-bordered table-striped">
      <thead class="thead-dark">
        <tr>
          <th @click="sortBy('orderDate')" :class="{ sortable: true, sorted: sortByColumn === 'orderDate' }">
            Order Date
            <span v-if="sortByColumn === 'orderDate'" :class="sortDirection === 'asc' ? 'asc' : 'desc'"></span>
          </th>
          <th @click="sortBy('region')" :class="{ sortable: true, sorted: sortByColumn === 'region' }">
            Region
            <span v-if="sortByColumn === 'region'" :class="sortDirection === 'asc' ? 'asc' : 'desc'"></span>
          </th>
          <th @click="sortBy('city')" :class="{ sortable: true, sorted: sortByColumn === 'city' }">
            City
            <span v-if="sortByColumn === 'city'" :class="sortDirection === 'asc' ? 'asc' : 'desc'"></span>
          </th>
          <th @click="sortBy('category')" :class="{ sortable: true, sorted: sortByColumn === 'category' }">
            Category
            <span v-if="sortByColumn === 'category'" :class="sortDirection === 'asc' ? 'asc' : 'desc'"></span>
          </th>
          <th @click="sortBy('product')" :class="{ sortable: true, sorted: sortByColumn === 'product' }">
            Product
            <span v-if="sortByColumn === 'product'" :class="sortDirection === 'asc' ? 'asc' : 'desc'"></span>
          </th>
          <th @click="sortBy('quantity')" :class="{ sortable: true, sorted: sortByColumn === 'quantity' }">
            Quantity
            <span v-if="sortByColumn === 'quantity'" :class="sortDirection === 'asc' ? 'asc' : 'desc'"></span>
          </th>
          <th @click="sortBy('unitPrice')" :class="{ sortable: true, sorted: sortByColumn === 'unitPrice' }">
            Unit Price
            <span v-if="sortByColumn === 'unitPrice'" :class="sortDirection === 'asc' ? 'asc' : 'desc'"></span>
          </th>
          <th @click="sortBy('totalPrice')" :class="{ sortable: true, sorted: sortByColumn === 'totalPrice' }">
            Total Price
            <span v-if="sortByColumn === 'totalPrice'" :class="sortDirection === 'asc' ? 'asc' : 'desc'"></span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.orderDate }}</td>
          <td>{{ order.region }}</td>
          <td>{{ order.city }}</td>
          <td>{{ order.category }}</td>
          <td>{{ order.product }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.unitPrice }}</td>
          <td>{{ order.totalPrice }}</td>
          <td>
              <button class="btn btn-primary" @click="openOrderModal(order)">Edit</button>
              <button class="btn btn-danger" @click="deleteOrder(order.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal for adding a new order -->
    <b-modal v-model="isOrderModalOpen" :title="isEditingOrder ? 'Edit Order' : 'Add New Order'" @hide="resetOrder">
      <!-- Input fields for adding a new order -->
      <!-- Customize the input fields as needed -->
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="OrderDate">Order Date:</label>
            <input v-model="modalOrder.orderDate" type="date" class="form-control" id="OrderDate">
          </div>
        </div>
        <div class="col-md-6"></div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="region">Region:</label>
            <input v-model="modalOrder.region" type="text" class="form-control" id="region" placeholder="Enter Region">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="city">City:</label>
            <input v-model="modalOrder.city" type="text" class="form-control" id="city" placeholder="Enter City">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="category">Category:</label>
            <input v-model="modalOrder.category" type="text" class="form-control" id="category" placeholder="Enter Category">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="product">Product:</label>
            <input v-model="modalOrder.product" type="text" class="form-control" id="product" placeholder="Enter Product">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="quantity">Quantity:</label>
            <input v-model="modalOrder.quantity" type="number" class="form-control" id="quantity"
              placeholder="Enter Quantity">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="unitPrice">Unit Price:</label>
            <input v-model="modalOrder.unitPrice" type="number" class="form-control" id="unitPrice"
              placeholder="Enter Unit Price">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="totalPrice">Total Price:</label>
            <input v-model="modalOrder.totalPrice" type="number" step="0.01" class="form-control" id="totalPrice"
              placeholder="Enter Total Price">
          </div>
        </div>
        <div class="col-md-6">
          <!-- You can add more input fields here if needed -->
        </div>
      </div>
      <!-- Add more input fields for other order properties -->

      <!-- Modal footer -->
      <template #modal-footer>
        <button type="button" class="btn btn-secondary" @click="closeOrderModal">Cancel</button>
        <button type="button" class="btn btn-success" @click="isEditingOrder ? saveEditedOrder() : saveNewOrder()">
          {{ isEditingOrder ? 'Save' : 'Add' }}
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import apiService from '@/service/apiService'; // Update the path as needed
import moment from 'moment';
import { BModal } from 'bootstrap-vue';
export default {
  data() {
    return {
      orders: [],
      search: {
        startDate: null,
        endDate: null,
        orderDate: null,
        region: null,
        city: null,
        category: null,
        product: null,
        quantity: null,
        unitPrice: null,
        totalPrice: null,
        // Add more search fields here
      },
      dateSelection: 'specific', // Default selection
      editingOrder: null, // Track the currently editing ordertableData: [], // Your data array
      sortByColumn: '', // To store the currently sorted column
      sortDirection: 'asc',

      isOrderModalOpen: false, // Control the visibility of the "Add/Edit Order" modal
      isEditingOrder: false, // Track whether we are editing an existing order
      modalOrder: {
        orderDate: null,
        region: null,
        city: null,
        category: null,
        product: null,
        quantity: null,
        unitPrice: null,
        totalPrice: null,
        // Add more fields as needed
      },
    };
  },
  methods: {
    async searchOrders() {
      try {
        this.clearData();
        const response = await apiService.getOrders(this.search);
        this.orders = response.data;
        this.orders.forEach(item => {
          item.orderDate = moment(item.orderDate).format('YYYY-MM-DD'); // Customize the format as needed
        });
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    openOrderModal(order) {
      // Determine whether we are adding or editing an order
      if (order) {
        // Editing an existing order
        this.isEditingOrder = true;
        // Populate the input fields with the existing order's data
        this.modalOrder = { ...order };
      } else {
        // Adding a new order
        this.isEditingOrder = false;
        // Reset the input fields for a new order
        this.modalOrder = {
          orderDate: null,
          region: null,
          city: null,
          category: null,
          product: null,
          quantity: null,
          unitPrice: null,
          totalPrice: null,
          // Add more fields as needed
        };
      }
      // Open the "Add/Edit Order" modal
      this.isOrderModalOpen = true;
    },

    closeOrderModal() {
      // Close the "Add/Edit Order" modal
      this.isOrderModalOpen = false;
      // Reset the editing flag and orderToEdit
      this.isEditingOrder = false;
      this.orderToEdit = null;
      // Reset the input fields
      this.modalOrder = {
        orderDate: null,
        region: null,
        city: null,
        category: null,
        product: null,
        quantity: null,
        unitPrice: null,
        totalPrice: null,
      };
    },

    saveNewOrder() {
      // Call the createOrder method to save the new order
      apiService.createOrder(this.modalOrder)
        .then(() => {
          // After saving, close the modal and reset the input fields
          this.closeOrderModal();
          // Optionally, you can fetch updated data or update the orders in your local data array
          this.searchOrders();
        })
        .catch(error => {
          console.error('Error creating order:', error);
        });
    },

    saveEditedOrder() {
      // Call the updateOrder method to save the edited order
      apiService.updateOrder(this.modalOrder.id, this.modalOrder)
        .then(() => {
          // After saving, close the modal and reset the editing flag and orderToEdit
          this.closeOrderModal();
          // Optionally, you can fetch updated data or update the orders in your local data array
          this.searchOrders();
        })
        .catch(error => {
          console.error('Error updating order:', error);
        });
    },

    resetOrder() {
      // Reset the modal state and input fields when the modal is closed without saving
      this.isEditingOrder = false;
      this.modalOrder = {
        orderDate: null,
        region: null,
        city: null,
        category: null,
        product: null,
        quantity: null,
        unitPrice: null,
        totalPrice: null,
      };
    },
    deleteOrder(orderId) {
      try {
        apiService.deleteOrder(orderId)
        .then(() => {
          this.searchOrders();
        })
        .catch(error => {
          console.error('Error deleting order:', error);
        });
        // Handle success and update the orders array or display a message
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // Formats to "yyyy-mm-dd"
    },
    sortBy(column) {
      if (this.sortByColumn === column) {
        // If the same column is clicked again, toggle the sorting direction
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        // If a different column is clicked, reset sorting direction to 'asc'
        this.sortByColumn = column;
        this.sortDirection = 'asc';
      }

      this.orders.sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];

        // Check if the values are numeric
        const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

        // Convert values to numbers if they are numeric; otherwise, keep them as strings
        const numericA = isNumeric(aValue) ? parseFloat(aValue) : aValue;
        const numericB = isNumeric(bValue) ? parseFloat(bValue) : bValue;

        if (this.sortDirection === 'asc') {
          // Compare numbers and strings separately
          if (isNumeric(numericA) && isNumeric(numericB)) {
            return numericA - numericB;
          } else {
            // Compare as strings if one or both values are not numeric
            return String(numericA).localeCompare(String(numericB));
          }
        } else {
          // In descending order, reverse the comparison logic
          if (isNumeric(numericA) && isNumeric(numericB)) {
            return numericB - numericA;
          } else {
            return String(numericB).localeCompare(String(numericA));
          }
        }
      });
    },
    clearDateFields() {
      // Clear date fields when radio selection changes
      if (this.dateSelection === 'specific') {
        this.search.startDate = '';
        this.search.endDate = '';
      } else {
        this.search.orderDate = '';
      }
    },
    clearData() {
      this.editingOrder = null;
      this.sortByColumn = "";
    }
  },
  mounted() {
    this.searchOrders();
  },
};
</script>
<style>
th.sorted span.asc::before,
th.sorted span.desc::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
  /* Adjust the margin as needed */
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}

th.sorted span.asc::before {
  border-bottom: 4px solid #000;
  /* Arrow color for ascending */
}

th.sorted span.desc::before {
  border-top: 4px solid #000;
  /* Arrow color for descending */
}
</style>
