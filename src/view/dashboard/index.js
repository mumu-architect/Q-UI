import { Qvm } from 'q-qvm/Qvm';


window.vm = new Qvm({
    el: "#app",
    data: {
      arr: [12, 5, 8],
      a: 12,
      b: 5,
      c: 3,
    },
    mounted() {
    },
  });