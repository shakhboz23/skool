import axios from "axios";
export default defineNuxtPlugin(({ vueApp }) => {
    // const apiKey = 'AzzvXfhGI1umCCiEjCRJFR4BIfoxPf23';
  
    // const searchGifs = async (query) => {
    //   try {
    //     const response = await axios.get(`/search`, {
    //       params: {
    //         api_key: apiKey,
    //         q: query,
    //         limit: 10
    //       }
    //     });
    //     return response.data.data;
    //   } catch (error) {
    //     console.error('Error fetching GIFs:', error);
    //     return [];
    //   }
    // };
  
    // inject('giphy', { searchGifs });
    // vueApp.use(searchGifs);
  }
)