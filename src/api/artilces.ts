import axios from "axios";

// axios.defaults.withCredentials = true;

export const fetchArticles = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
  return response.data;
};

export const fetchArticleById = async (id: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`);
  return response.data?.findArticle;
};

export const createArticle = async (title: string, content: string, tags: string[],description:string,thumbnail:string="new-link-here") => {
  const token = localStorage.getItem('token');
  console.log("token",token);
  console.log(title, content, tags,description,thumbnail);
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/createArticle`,
    { title, content, tags,description,thumbnail },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    
  );
  console.log("after db entry created", response.data);
  return response.data;
};

export const updateArticle = async (id: string, title: string, content: string, tags: string[]) => {
  await axios.put(`/api/articles/${id}`, { title, content, tags });
};

export const deleteArticle = async (id: string) => {
  await axios.delete(`/api/articles/${id}`);
};


export const articlesSuggestions = async (searchTitle: string) => {
  return  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/findArticles?searchTitle=${searchTitle}`);
  
  // return response.data.articles;
}

export const GetRelatedArticles = async (tags: string[],id:string) =>{
  console.log("form api",tags,id);
  const response= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/getSuggestedArticle`,
    {tags,id}
  );
  console.log("api response from getSuggestedArticle",response.data);
  return response.data;
}

//get all artilces

export const GetAllArticles= async (limit:number,skip:number) =>{
  const response= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/GetAllArticles`,
    {limit,skip},
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
}