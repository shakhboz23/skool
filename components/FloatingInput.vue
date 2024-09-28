<template>
    <div class="relative">
      <input 
        :type="$props.type" 
        :id="id" 
        v-model="inputValue" 
        class="peer" 
        placeholder=" " 
        :required="requiredValue"
      />
      <label 
        :for="id" 
        class="absolute text-sm _ca1 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {{ $props.label }}
      </label>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FloatingInput',
    props: {
      modelValue: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: 'floating_outlined'
      },
      label: {
        type: String,
        default: 'Floating outlined'
      },
      type: {
        type: String,
        default: 'text'
      },
      required: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      inputValue: {
        get() {
          return this.modelValue;
        },
        set(value) {
          this.$emit('update:modelValue', value);
        }
      },
      requiredValue: {
        get() {
          return this.required;
        },
        set(value) {
          this.$emit('update:required', value);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styling if needed */
  </style>
  