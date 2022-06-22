import { timer } from 'rxjs';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'timer',
  setup() {
    timer(1000, 1000).subscribe({
      next: (t) => {
        console.log(t);
      },
    });
  },
});
