
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      user: {
        username: '', // 詢問同學才知道v-model 可以雙向綁定(???)
        password: '',
      },
    }
  },
   methods:{
    login(){
      const url = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      const path = "Austyn_freegameXT";

      //console.log(user);
      // 這邊一定要用this.user 不然根本抓不到user
      axios.post(url, this.user)
      .then((res)=>{
        console.log(res);

        // 抓取token
        const {token, expired} = res.data;
        //console.log(token, expired); // 印出token結果

        // 存在cookie
        //document.cookie = `loginToken=${token};expires=${expired};`;
        // 怎麼解答寫法跟上課不一樣?
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
        // 登入成功時，存下token
        axios.defaults.headers.common["Authorization"] = token;


        //詢問同學才知道跳轉到頁面用法
        window.location = "products.html";

      })
      .catch((err)=>{
        console.log(err.message);
        // 錯誤跳出提示
        alert(err.message);
      });
    },
  },
}).mount('#app');
