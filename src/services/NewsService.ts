import axios from 'axios';

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  publishDate: string;
  snippet: string;
}

interface NewsApiArticle {
  title: string;
  url: string;
  source: {
    name: string;
  };
  publishedAt: string;
  description: string | null;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
}

class NewsService {
  private static readonly NEWS_API_KEY = '44f777cb7e1d4d26b7a4550b67c9f6b2';
  private static readonly NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

  public async fetchStockNews(stockName: string): Promise<NewsItem[]> {
    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const response = await axios.get<NewsApiResponse>(NewsService.NEWS_API_URL, {
        params: {
          q: stockName,
          // from: oneMonthAgo.toISOString().split('T')[0],
          // to: new Date().toISOString().split('T')[0],
          // sortBy: 'publishedAt',
          // country: 'tw',
          // language: 'zh',
          // pageSize: 100,
          apiKey: NewsService.NEWS_API_KEY,
        },
      });

      return response.data.articles.map((article: NewsApiArticle) => ({
        title: article.title,
        link: article.url,
        source: article.source.name,
        publishDate: new Date(article.publishedAt).toLocaleDateString('zh-TW'),
        snippet: article.description || '無摘要',
      }));
    } catch (error) {
      console.error('抓取新聞時發生錯誤:', error);
      return [];
    }
  }
}

export default new NewsService();
