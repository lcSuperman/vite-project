import { DirectiveBinding } from 'vue';
 
const clickOutside = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    function documentClick(e: MouseEvent) {
      if (!el.contains(e.target as Node)) {
        binding.value(e);
      }
    }
    el.__clickOutside__ = documentClick;
    document.addEventListener('mousedown', documentClick);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('mousedown', el.__clickOutside__);
    delete el.__clickOutside__;
  },
};
 
export default clickOutside;