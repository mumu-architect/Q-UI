import { Qvm } from "q-qvm/Qvm";
import row from "@src/components/row/index.js";


Qvm.component(row.name, row);


window.vm = new Qvm({
      el: "#root",
      data: {
        arr: [12, 5, 8],
        a: 12,
        b: 5,
        c: 3,
      },
      mounted() {
      },
    });
    
    console.log(vm);