
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


createApp({
  data(){
    return{
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'Austyn_freegameXT',
      // 產品
      products: [],
      // 選擇查看細節
      temp:{},
    } 
  },
  methods:{
    // 確認權限
    checkPermession(){
      // Vue 會把資料弄在同一層 可以直接this
      const url =`${this.url}/api/user/check`;
      axios.post(url)
      .then((res)=>{
        console.log(res, "checkResult");
        // 成功 執行找產品資料
        this.getProducts();
      })
      .catch((err)=>{
        alert(err.response.data.message)
        // 失敗 返回登入
        window.location = "login.html";
      })
    },
    // 找產品資料
    getProducts(){
      const url = `${this.url}/api/${this.path}/admin/products`;
      axios.get(url)
      .then((res)=>{
        // 把資料塞到 products裡
        console.log(res, "products")
        this.products = res.products;
      })
      .catch((err)=>{
        alert(err.response.data.message)
      })
    },
    // 點擊按鈕查看產品細節
    checkDetail(item){
      this.temp = item;
    }
  },
  // 生命週期 進還會先執行一次
  mounted() {
    // 連進來先確認權限
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    // 登入成功時，存下token
    //axios.defaults.headers.common["Authorization"] = token;

    this.checkPermession();
  }
}).mount('#app');
